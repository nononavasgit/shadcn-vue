import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '@/components/ui/Button'
import { ButtonGroup } from '@/components/ui/ButtonGroup'

const orientations = ['horizontal', 'vertical'] as const
const sizes = ['xs', 'sm', 'md', 'lg'] as const
const contextType = { summary: 'ButtonGroupContext' }

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
    default: {
      control: false,
      description: 'Contenido del grupo. Recibe el contexto efectivo mediante sus slot props.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    orientation: {
      control: 'inline-radio',
      options: orientations,
      description: 'Dirección en la que se distribuyen los controles.',
      table: {
        category: 'Props',
        type: { summary: 'ButtonGroupOrientation' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'Tamaño común aplicado a los hijos.',
      table: {
        category: 'Props',
        type: { summary: 'ButtonGroupSize' },
        defaultValue: { summary: 'md' },
      },
    },
  },
  args: {
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

export const Playground: Story = {}
