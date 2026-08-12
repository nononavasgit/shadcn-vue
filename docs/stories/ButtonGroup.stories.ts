import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '@/components/ui/Button'
import { ButtonGroup, type ButtonGroupContext } from '@/components/ui/ButtonGroup'
import { Input } from '@/components/ui/Input'

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

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => ({
    components: { Button, ButtonGroup },
    setup: () => ({ args }),
    template: `
      <ButtonGroup v-bind="args">
        <Button label="Editar" variant="outline" />
        <Button label="Duplicar" variant="outline" />
        <Button label="Eliminar" severity="error" variant="outline" />
      </ButtonGroup>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button, ButtonGroup },
    template: `
      <div class="flex flex-col items-start gap-4">
        <ButtonGroup v-for="size in ['xs', 'sm', 'md', 'lg']" :key="size" :size="size">
          <Button label="Uno" variant="outline" />
          <Button label="Dos" variant="outline" />
        </ButtonGroup>
      </div>
    `,
  }),
}

export const WithInput: Story = {
  name: 'Con input',
  render: (args) => ({
    components: { Button, ButtonGroup, Input },
    setup: () => ({ args }),
    template: `
      <ButtonGroup v-bind="args" class="w-full sm:w-auto">
        <Input class="min-w-0 sm:w-64" placeholder="Introduce un dominio" />
        <Button label="Buscar" />
      </ButtonGroup>
    `,
  }),
}

export const CustomUi: Story = {
  name: 'UI personalizada',
  args: {
    ui: { root: () => ({ class: 'rounded-lg bg-muted p-1 [&>*]:border-0' }) },
  },
  render: (args) => ({
    components: { Button, ButtonGroup },
    setup: () => ({ args }),
    template: `
      <ButtonGroup v-bind="args">
        <Button label="Día" variant="plain" />
        <Button label="Semana" variant="plain" />
        <Button label="Mes" variant="plain" />
      </ButtonGroup>
    `,
  }),
}

export const UiAsFunction: Story = {
  name: 'UI como función',
  args: {
    orientation: 'horizontal',
    ui: {
      root: (context: ButtonGroupContext) => ({
        class:
          context.orientation === 'vertical'
            ? 'rounded-lg bg-muted p-2'
            : 'rounded-lg bg-muted p-1',
        'aria-label': `Grupo ${context.orientation}`,
        'data-size': context.size,
      }),
    },
  },
  parameters: {
    controls: { exclude: ['ui'] },
    docs: {
      description: {
        story: '`ui.root` recibe `ButtonGroupContext` y devuelve atributos HTML para la raíz.',
      },
    },
  },
  render: (args) => ({
    components: { Button, ButtonGroup },
    setup: () => ({ args }),
    template: `
      <ButtonGroup v-bind="args">
        <Button label="Día" variant="plain" />
        <Button label="Semana" variant="plain" />
        <Button label="Mes" variant="plain" />
      </ButtonGroup>
    `,
  }),
}
