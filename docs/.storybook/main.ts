import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import type { StorybookConfig } from '@storybook/vue3-vite'
import vue from '@vitejs/plugin-vue'

const docsRoot = path.dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), vue(), tailwindcss()]
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@': path.resolve(docsRoot, '../../src'),
      },
    }

    return config
  },
}

export default config
