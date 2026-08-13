import { setup, type Preview } from '@storybook/vue3-vite'
import { i18n } from '@/i18n'
import '../styles.css'

setup((app) => {
  app.use(i18n)
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      codePanel: true,
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default preview
