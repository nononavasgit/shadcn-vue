import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sourceRoot = path.resolve(__dirname, 'src')
const entries = {
  index: path.join(sourceRoot, 'index.js'),
  ...Object.fromEntries(
    readdirSync(path.join(sourceRoot, 'components/ui'), { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => [
        `components/ui/${entry.name}/index`,
        path.join(sourceRoot, 'components/ui', entry.name, 'index.ts'),
      ]),
  ),
  ...Object.fromEntries(
    readdirSync(path.join(sourceRoot, 'composables'))
      .filter((file) => file.endsWith('.ts'))
      .map((file) => [
        `composables/${path.basename(file, '.ts')}`,
        path.join(sourceRoot, 'composables', file),
      ]),
  ),
  'lib/utils': path.join(sourceRoot, 'lib/utils.ts'),
  'assets/icons/index': path.join(sourceRoot, 'assets/icons/index.ts'),
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      include: [
        'src/components/ui/**/*',
        'src/composables/**/*.ts',
        'src/lib/**/*.ts',
        'src/assets/icons/**/*.ts',
        'src/index.js',
      ],
      exclude: ['src/components/app/**', 'src/App.vue', 'src/main.ts'],
      rollupTypes: false,
      entryRoot: 'src',
    }),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  publicDir: false,
  build: {
    lib: {
      entry: entries,
      formats: ['es'],
      cssFileName: 'style',
    },
    rollupOptions: {
      external: [
        'vue',
        'reka-ui',
        '@lucide/vue',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'style.css' ? 'style.css' : 'assets/[name][extname]',
      },
    },
  },
})
