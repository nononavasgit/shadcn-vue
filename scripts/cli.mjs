import { spawn } from 'node:child_process'
import { createHash } from 'node:crypto'
import { constants } from 'node:fs'
import { access, cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const templateRoot = path.join(packageRoot, 'src', 'components', 'app')
const ownPackage = JSON.parse(await readFile(path.join(packageRoot, 'package.json'), 'utf8'))
const textExtensions = new Set(['.js', '.ts', '.vue'])

async function exists(target) {
  try {
    await access(target, constants.F_OK)
    return true
  } catch {
    return false
  }
}

function hash(content) {
  return createHash('sha256').update(content).digest('hex')
}

function run(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      shell: process.platform === 'win32',
      stdio: 'inherit',
    })
    child.on('error', reject)
    child.on('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} terminó con código ${code}`)),
    )
  })
}

async function packageManager(cwd) {
  if (process.env.npm_config_user_agent?.startsWith('pnpm')) return 'pnpm'
  if (process.env.npm_config_user_agent?.startsWith('yarn')) return 'yarn'
  if (process.env.npm_config_user_agent?.startsWith('bun')) return 'bun'
  if (await exists(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm'
  if (await exists(path.join(cwd, 'yarn.lock'))) return 'yarn'
  if (await exists(path.join(cwd, 'bun.lock'))) return 'bun'
  if (await exists(path.join(cwd, 'bun.lockb'))) return 'bun'
  return 'npm'
}

async function installDependencies(cwd, packageName, importAlias) {
  const manager = await packageManager(cwd)
  const add = manager === 'npm' ? 'install' : 'add'
  const spec = packageName === importAlias ? packageName : `${importAlias}@npm:${packageName}`
  await run(manager, [add, spec], cwd)
  await run(manager, [add, '-D', 'tailwindcss', '@tailwindcss/vite'], cwd)
}

function importPath(value) {
  const normalized = value.replaceAll('\\', '/')
  return normalized.startsWith('.') ? normalized : `./${normalized}`
}

function transform(content, importAlias, destination, appRoot) {
  const relativeRoot = importPath(path.relative(path.dirname(destination), appRoot))
  return content
    .replaceAll('@/components/ui/', `${importAlias}/components/ui/`)
    .replaceAll('@/components/app', relativeRoot)
    .replaceAll('@/composables', `${importAlias}/composables`)
    .replaceAll('@/lib/', `${importAlias}/lib/`)
    .replaceAll('@/assets/icons', `${importAlias}/assets/icons`)
}

async function generatedFile(source, destination, context) {
  if (textExtensions.has(path.extname(source))) {
    const content = await readFile(source, 'utf8')
    return Buffer.from(transform(content, context.importAlias, destination, context.appRoot))
  }
  return readFile(source)
}

async function sourceFiles(root, current = root) {
  const result = []
  for (const entry of await readdir(current, { withFileTypes: true })) {
    const target = path.join(current, entry.name)
    if (entry.isDirectory()) result.push(...(await sourceFiles(root, target)))
    else result.push({ source: target, relative: path.relative(root, target) })
  }
  return result
}

async function target(cwd) {
  const packageJsonPath = path.join(cwd, 'package.json')
  if (!(await exists(packageJsonPath))) throw new Error(`No existe package.json en ${cwd}`)
  const value = JSON.parse(await readFile(packageJsonPath, 'utf8'))
  if (!value.dependencies?.vue && !value.devDependencies?.vue) {
    throw new Error('El proyecto consumidor no tiene Vue instalado.')
  }
}

async function context(options, requireConfig = false) {
  const cwd = path.resolve(options.cwd ?? process.cwd())
  await target(cwd)
  const configPath = path.join(cwd, 'nononavas-ui.json')
  const previous = (await exists(configPath))
    ? JSON.parse(await readFile(configPath, 'utf8'))
    : null
  if (requireConfig && !previous) {
    throw new Error('No existe nononavas-ui.json. Ejecuta init primero.')
  }
  const packageName = options.packageName ?? previous?.package ?? ownPackage.name
  const importAlias = options.importAlias ?? previous?.alias ?? packageName
  const appDirectory = options.appDirectory ?? previous?.appDirectory ?? 'src/components/ui'
  const appRoot = path.resolve(cwd, appDirectory)
  return { cwd, configPath, previous, packageName, importAlias, appDirectory, appRoot }
}

async function saveConfig(ctx, files) {
  const config = {
    package: ctx.packageName,
    alias: ctx.importAlias,
    appDirectory: ctx.appDirectory,
    version: ownPackage.version,
    files,
  }
  await writeFile(ctx.configPath, `${JSON.stringify(config, null, 2)}\n`)
}

export async function init(options = {}) {
  const ctx = await context(options)
  const tracked = { ...(ctx.previous?.files ?? {}) }
  console.log(`\nInicializando ${ctx.packageName} en ${ctx.cwd}\n`)

  for (const file of await sourceFiles(templateRoot)) {
    const destination = path.join(ctx.appRoot, file.relative)
    const content = await generatedFile(file.source, destination, ctx)
    if ((await exists(destination)) && !options.force) {
      console.log(`  omitido ${file.relative}`)
      continue
    }
    await mkdir(path.dirname(destination), { recursive: true })
    await writeFile(destination, content)
    tracked[file.relative.replaceAll('\\', '/')] = hash(content)
    console.log(`  creado  ${file.relative}`)
  }

  await saveConfig(ctx, tracked)
  if (!options.skipInstall) await installDependencies(ctx.cwd, ctx.packageName, ctx.importAlias)
  console.log(`\nAñade el estilo global:
import '${ctx.importAlias}/style.css'
`)
}

export async function update(options = {}) {
  const ctx = await context(options, true)
  const tracked = { ...(ctx.previous.files ?? {}) }
  let updated = 0
  let conflicts = 0

  console.log(`\nActualizando componentes app desde ${ctx.packageName}\n`)
  for (const file of await sourceFiles(templateRoot)) {
    const key = file.relative.replaceAll('\\', '/')
    const destination = path.join(ctx.appRoot, file.relative)
    const next = await generatedFile(file.source, destination, ctx)
    const nextHash = hash(next)

    if (!(await exists(destination))) {
      await mkdir(path.dirname(destination), { recursive: true })
      await writeFile(destination, next)
      tracked[key] = nextHash
      updated++
      console.log(`  nuevo      ${key}`)
      continue
    }

    const current = await readFile(destination)
    const currentHash = hash(current)
    const safe = options.force || currentHash === tracked[key] || currentHash === nextHash
    if (safe) {
      await writeFile(destination, next)
      tracked[key] = nextHash
      updated++
      console.log(`  actualizado ${key}`)
    } else {
      await writeFile(`${destination}.new`, next)
      conflicts++
      console.log(`  conflicto   ${key} -> ${key}.new`)
    }
  }

  await saveConfig(ctx, tracked)
  if (!options.skipInstall) await installDependencies(ctx.cwd, ctx.packageName, ctx.importAlias)
  console.log(`\nResultado: ${updated} actualizados, ${conflicts} conflictos.\n`)
}
