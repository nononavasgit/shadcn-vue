#!/usr/bin/env node

import { init, update } from '../scripts/cli.mjs'

const args = process.argv.slice(2)
const command = args.shift()

function option(name) {
  const index = args.indexOf(name)
  if (index === -1) return undefined
  const value = args[index + 1]
  if (!value || value.startsWith('--')) throw new Error(`Falta el valor de ${name}.`)
  return value
}

function help() {
  console.log(`Uso:
  shadcn-vue init [opciones]
  shadcn-vue update [opciones]

Opciones:
  --cwd <directorio>       Proyecto consumidor
  --package <nombre>       Paquete real (por defecto: @nononavas/shadcn-vue)
  --alias <nombre>         Prefijo usado en imports
  --app-dir <directorio>   Destino (por defecto: src/components/ui)
  --skip-install           No instala paquete ni Tailwind
  --force                  Reemplaza archivos aunque estén modificados`)
}

try {
  if (!command || command === '--help' || command === '-h') {
    help()
    process.exit(0)
  }

  if (!['init', 'update'].includes(command)) {
    throw new Error(`Comando desconocido: ${command}`)
  }

  const options = {
    cwd: option('--cwd'),
    packageName: option('--package'),
    importAlias: option('--alias'),
    appDirectory: option('--app-dir'),
    skipInstall: args.includes('--skip-install'),
    force: args.includes('--force'),
  }

  if (command === 'init') await init(options)
  else await update(options)
} catch (error) {
  console.error(`\nError: ${error.message}`)
  process.exit(1)
}
