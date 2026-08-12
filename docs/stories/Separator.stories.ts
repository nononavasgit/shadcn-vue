import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Separator } from '@/components/ui/Separator'

const meta = {
  title: 'Componentes/Separator',
  component: Separator,
  parameters: {
    layout: 'padded',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Separa visual o semánticamente grupos de contenido en orientación horizontal o vertical.',
      },
    },
  },
  argTypes: {
    SeparatorOrientation: {
      control: false,
      description: 'Orientaciones admitidas por el separador.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    SeparatorContext: {
      control: false,
      description: 'Contexto entregado a `ui.root` y al slot `default`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ orientation: SeparatorOrientation; decorative: boolean }',
          detail:
            'interface SeparatorContext {\n  orientation: SeparatorOrientation | undefined\n  decorative: boolean | undefined\n}',
        },
      },
    },
    SeparatorUI: {
      control: false,
      description: '`root` es una función que recibe `SeparatorContext` y devuelve atributos HTML.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ root?: (context: SeparatorContext) => HTMLAttributes }',
          detail:
            'interface SeparatorUI {\n  root?: (context: SeparatorContext) => HTMLAttributes\n}',
        },
      },
    },
    default: {
      name: 'default',
      control: false,
      description: 'Contenido opcional renderizado dentro del separador.',
      table: {
        category: 'Slots',
        readonly: true,
        type: { summary: 'slotProps: SeparatorContext' },
      },
    },
    as: {
      control: 'text',
      description: 'Elemento o componente usado como raíz.',
      table: { category: 'Props', defaultValue: { summary: 'div' } },
    },
    asChild: {
      control: 'boolean',
      description: 'Fusiona el separador con el elemento hijo mediante Reka UI.',
      table: { category: 'Props', defaultValue: { summary: 'false' } },
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Dirección del separador.',
      table: {
        category: 'Props',
        type: { summary: 'SeparatorOrientation' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    decorative: {
      control: 'boolean',
      description:
        'Si es `true`, el separador es únicamente visual. Si es `false`, expone semántica de separación a las tecnologías de asistencia.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    ui: {
      control: false,
      description:
        'Personaliza la raíz mediante `root: (context: SeparatorContext) => HTMLAttributes`.',
      table: {
        category: 'Props',
        type: { summary: 'SeparatorUI' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    as: 'div',
    asChild: false,
    orientation: 'horizontal',
    decorative: true,
  },
  render: (args) => ({
    components: { Separator },
    setup: () => ({ args }),
    template: `
      <div :class="args.orientation === 'vertical' ? 'flex h-24 items-center gap-4' : 'grid w-full gap-4'">
        <span>Contenido anterior</span>
        <Separator v-bind="args" />
        <span>Contenido posterior</span>
      </div>
    `,
  }),
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
