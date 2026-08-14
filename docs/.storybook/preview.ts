import { setup, type Preview } from '@storybook/vue3-vite'
import { ConfigProvider } from '@/components/provider'
import { i18n, setLocale } from '@/i18n'
import '../styles.css'

setup((app) => {
  app.use(i18n)
})

const preview: Preview = {
  decorators: [
    (_story, context) => {
      setLocale(context.globals.locale)

      return {
        components: { ConfigProvider },
        template: '<ConfigProvider><story /></ConfigProvider>',
      }
    },
  ],
  globalTypes: {
    locale: {
      description: 'Idioma global de los componentes',
      defaultValue: 'es',
      toolbar: {
        icon: 'globe',
        dynamicTitle: true,
        items: [
          { value: 'en', title: 'English' },
          { value: 'es', title: 'Español' },
          { value: 'pt-BR', title: 'Português (Brasil)' },
          { value: 'pt-PT', title: 'Português (Portugal)' },
        ],
      },
    },
  },
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
