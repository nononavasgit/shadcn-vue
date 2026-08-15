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
        setup: () => ({ theme: context.globals.theme }),
        template: `
          <div :class="theme === 'dark' && 'dark'" class="min-h-screen bg-background p-4 text-foreground">
            <ConfigProvider><story /></ConfigProvider>
          </div>
        `,
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
          { value: 'ar', title: 'العربية' },
          { value: 'en', title: 'English' },
          { value: 'es', title: 'Español' },
          { value: 'pt-BR', title: 'Português (Brasil)' },
          { value: 'pt-PT', title: 'Português (Portugal)' },
        ],
      },
    },
    theme: {
      description: 'Tema global de los componentes',
      defaultValue: 'light',
      toolbar: {
        icon: 'contrast',
        dynamicTitle: true,
        items: [
          { value: 'light', title: 'Claro', icon: 'sun' },
          { value: 'dark', title: 'Oscuro', icon: 'moon' },
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
    backgrounds: { disable: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default preview
