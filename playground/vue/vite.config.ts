import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: /^@$/,
        replacement: path.resolve(__dirname, '../..'),
      },
    ],
  },
})
