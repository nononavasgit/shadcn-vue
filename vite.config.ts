import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      tsconfigPath: './tsconfig.app.json',
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/App.vue', 'src/main.ts'],
      rollupTypes: true,
    }),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
      cssFileName: 'style',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) =>
          assetInfo.name === 'style.css' ? 'style.css' : 'assets/[name][extname]',
      },
    },
  },
})
