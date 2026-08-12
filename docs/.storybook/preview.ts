import type { Preview } from '@storybook/vue3-vite'
import '../styles.css'

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
