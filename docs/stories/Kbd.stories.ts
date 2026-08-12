import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Kbd, KbdGroup } from '@/components/ui/Kbd'

const meta = {
  title: 'Componentes/Kbd',
  component: Kbd,
  subcomponents: { KbdGroup },
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Representa una tecla o entrada de teclado. `KbdGroup` combina varias teclas en un atajo.',
      },
    },
  },
  argTypes: {
    KbdContext: {
      control: false,
      description: 'Contexto entregado a `ui.root` y al slot `default` de `Kbd`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: '{ label: string | undefined }' },
      },
    },
    KbdUI: {
      control: false,
      description: '`root` recibe `KbdContext` y devuelve atributos HTML.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: '{ root?: (context: KbdContext) => HTMLAttributes }' },
      },
    },
    KbdGroupContext: {
      control: false,
      description: 'Contexto vacío entregado por `KbdGroup`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: 'Record<string, never>' },
      },
    },
    KbdGroupUI: {
      control: false,
      description: '`root` recibe `KbdGroupContext` y devuelve atributos HTML.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: '{ root?: (context: KbdGroupContext) => HTMLAttributes }' },
      },
    },
    default: {
      name: 'default',
      control: false,
      description: 'Contenido de la tecla. Sustituye a `label`.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: KbdContext' } },
    },
    label: {
      control: 'text',
      description: 'Texto de la tecla cuando no se proporciona el slot `default`.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    ui: {
      control: false,
      description: 'Personaliza la tecla mediante `root: (context: KbdContext) => HTMLAttributes`.',
      table: {
        category: 'Props',
        type: { summary: 'KbdUI' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: { label: 'Ctrl' },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
