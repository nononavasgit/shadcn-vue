import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'

const meta = {
  title: 'Componentes/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Agrupa acciones o controles relacionados en una sola unidad visual. La orientación y el tamaño se comparten con todos sus hijos.',
      },
    },
  },
  argTypes: {
    ButtonGroupOrientation: {
      control: false,
      description: 'Orientaciones admitidas por el grupo.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    ButtonGroupSize: {
      control: false,
      description: 'Tamaños admitidos por el grupo.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
      },
    },
    ButtonGroupContext: {
      control: false,
      description: 'Contexto entregado al slot `default`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ orientation: ButtonGroupOrientation; size: ButtonGroupSize }',
          detail:
            'interface ButtonGroupContext {\n  orientation: ButtonGroupOrientation\n  size: ButtonGroupSize\n}',
        },
      },
    },
    ButtonGroupUI: {
      control: false,
      description:
        '`root` es una función que recibe `ButtonGroupContext` y devuelve atributos HTML.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ root?: (context: ButtonGroupContext) => HTMLAttributes }',
          detail:
            'interface ButtonGroupUI {\n  root?: (context: ButtonGroupContext) => HTMLAttributes\n}\n\n// HTMLAttributes admite class, style, id, role, aria-*, data-* y listeners HTML.',
        },
      },
    },
    default: {
      name: 'default',
      control: false,
      description: 'Contenido del grupo. Recibe el contexto efectivo mediante sus slot props.',
      table: {
        category: 'Slots',
        readonly: true,
        type: {
          summary: 'slotProps: ButtonGroupContext',
          detail:
            'default?(slotProps: ButtonGroupContext): unknown\n\nUso: <ButtonGroup v-slot="{ orientation, size }">…</ButtonGroup>',
        },
      },
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Dirección en la que se distribuyen los controles.',
      table: {
        category: 'Props',
        type: { summary: 'ButtonGroupOrientation' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño común aplicado a los hijos.',
      table: {
        category: 'Props',
        type: { summary: 'ButtonGroupSize' },
        defaultValue: { summary: 'md' },
      },
    },
    as: {
      control: 'text',
      description: 'Elemento o componente usado como raíz.',
      table: { category: 'Props', defaultValue: { summary: 'div' } },
    },
    ui: {
      control: false,
      description:
        'Personaliza las partes internas mediante funciones. Admite `root: (context) => HTMLAttributes`.',
      table: {
        category: 'Props',
        type: {
          summary: 'ButtonGroupUI',
          detail: '{ root?: (context: ButtonGroupContext) => HTMLAttributes }',
        },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    as: 'div',
    orientation: 'horizontal',
    size: 'md',
  },
  render: (args) => ({
    components: { Button, ButtonGroup },
    setup: () => ({ args }),
    template: `
      <ButtonGroup v-bind="args">
        <Button label="Anterior" variant="outline" />
        <Button label="Hoy" variant="outline" />
        <Button label="Siguiente" variant="outline" />
      </ButtonGroup>
    `,
  }),
} satisfies Meta<typeof ButtonGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    ui: {
      root: () => {
        return {}
      },
    },
  },
}
