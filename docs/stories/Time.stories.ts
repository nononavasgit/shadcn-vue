import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Time } from '@/components/ui/Time'

const datetime = '2024-01-15T13:45:00.000Z'

const meta = {
  title: 'Componentes/Time',
  component: Time,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Renderiza una fecha localizada dentro del elemento semántico `time` y conserva un atributo `datetime` normalizado.',
      },
    },
  },
  argTypes: {
    DateValue: {
      control: false,
      description: 'Valores de fecha admitidos.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: 'string | number | Date' },
      },
    },
    TimeContext: {
      control: false,
      description: 'Contexto entregado a `ui.root` y al slot `default`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ datetime: DateValue; locale; format; date: string }',
          detail:
            'interface TimeContext {\n  datetime: DateValue\n  locale: string | string[] | undefined\n  format: Intl.DateTimeFormatOptions | undefined\n  date: string\n}',
        },
      },
    },
    TimeUI: {
      control: false,
      description: '`root` recibe `TimeContext` y devuelve atributos HTML para el elemento `time`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: '{ root?: (context: TimeContext) => HTMLAttributes }' },
      },
    },
    default: {
      name: 'default',
      control: false,
      description: 'Contenido mostrado. Sustituye a la fecha formateada y recibe también `date`.',
      table: {
        category: 'Slots',
        readonly: true,
        type: { summary: 'slotProps: TimeContext' },
      },
    },
    datetime: {
      control: 'text',
      description: 'Fecha que se formatea. Admite texto, timestamp o `Date`.',
      table: { category: 'Props', type: { summary: 'DateValue' } },
    },
    locale: {
      control: 'text',
      description: 'Locale o lista de locales usada por `Intl.DateTimeFormat`.',
      table: { category: 'Props', type: { summary: 'string | string[]' } },
    },
    format: {
      control: 'object',
      description: 'Opciones transmitidas a `Intl.DateTimeFormat`.',
      table: { category: 'Props', type: { summary: 'Intl.DateTimeFormatOptions' } },
    },
    ui: {
      control: false,
      description: 'Personaliza la raíz mediante `root: (context: TimeContext) => HTMLAttributes`.',
      table: {
        category: 'Props',
        type: { summary: 'TimeUI' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    datetime,
    locale: 'es-ES',
    format: { day: '2-digit', month: 'long', year: 'numeric' },
  },
} satisfies Meta<typeof Time>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
