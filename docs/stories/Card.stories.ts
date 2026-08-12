import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '@/components/ui/Button'
import { Card, type CardContext } from '@/components/ui/Card'

const meta = {
  title: 'Componentes/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Agrupa contenido relacionado en una superficie con cabecera, acción, contenido y pie opcionales.',
      },
    },
  },
  decorators: [() => ({ template: '<div class="w-96"><story /></div>' })],
  argTypes: {
    CardContext: {
      control: false,
      description: 'Contexto entregado a las funciones de `ui` y a todos los slots.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ label; description }',
          detail:
            "interface CardContext {\n  label: CardProps['label']\n  description: CardProps['description']\n}",
        },
      },
    },
    CardUI: {
      control: false,
      description: 'Funciones que personalizan cada parte interna y reciben `CardContext`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ root; header; label; description; action; content; footer }',
          detail:
            'interface CardUI {\n  root?: (context: CardContext) => HTMLAttributes\n  header?: (context: CardContext) => HTMLAttributes\n  label?: (context: CardContext) => HTMLAttributes\n  description?: (context: CardContext) => HTMLAttributes\n  action?: (context: CardContext) => HTMLAttributes\n  content?: (context: CardContext) => HTMLAttributes\n  footer?: (context: CardContext) => HTMLAttributes\n}',
        },
      },
    },
    default: {
      name: 'default',
      control: false,
      description: 'Contenido principal de la tarjeta.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: CardContext' } },
    },
    header: {
      name: 'header',
      control: false,
      description: 'Sustituye la cabecera completa, incluidos título y descripción.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: CardContext' } },
    },
    labelSlot: {
      name: 'label',
      control: false,
      description: 'Sustituye el contenido de la prop `label`.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: CardContext' } },
    },
    descriptionSlot: {
      name: 'description',
      control: false,
      description: 'Sustituye el contenido de la prop `description`.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: CardContext' } },
    },
    action: {
      name: 'action',
      control: false,
      description: 'Acción alineada al extremo de la cabecera.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: CardContext' } },
    },
    footer: {
      name: 'footer',
      control: false,
      description: 'Contenido mostrado al pie de la tarjeta.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: CardContext' } },
    },
    label: {
      control: 'text',
      description: 'Título de la tarjeta.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    description: {
      control: 'text',
      description: 'Texto secundario de la cabecera.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    ui: {
      control: 'object',
      description: 'Personaliza las partes internas mediante funciones que reciben `CardContext`.',
      table: {
        category: 'Props',
        type: { summary: 'CardUI' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    label: 'Resumen de cuenta',
    description: 'Consulta los datos principales de tu cuenta.',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    ui: {
      root: () => ({}),
      header: () => ({}),
      label: () => ({}),
      description: () => ({}),
      action: () => ({}),
      content: () => ({}),
      footer: () => ({}),
    },
  },
  render: (args) => ({
    components: { Button, Card },
    setup: () => ({ args }),
    template: `
      <Card v-bind="args">
        <template #action><Button label="Editar" variant="plain" size="sm" /></template>
        <dl class="grid grid-cols-2 gap-3 text-sm">
          <dt class="text-muted-foreground">Plan</dt><dd class="text-right font-medium">Pro</dd>
          <dt class="text-muted-foreground">Estado</dt><dd class="text-right font-medium">Activo</dd>
        </dl>
        <template #footer><Button label="Ver detalles" class="w-full" /></template>
      </Card>
    `,
  }),
}

export const CustomHeader: Story = {
  name: 'Cabecera personalizada',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Card },
    template: `
      <Card>
        <template #header="{ label }">
          <div class="px-6 text-lg font-semibold">{{ label || 'Informe mensual' }}</div>
        </template>
        <p class="text-sm text-muted-foreground">Contenido de la tarjeta.</p>
      </Card>
    `,
  }),
}

export const UiAsFunction: Story = {
  name: 'UI como función',
  args: {
    ui: {
      root: (context: CardContext) => ({
        class: 'border-primary/40',
        'aria-label': context.label,
      }),
      label: () => ({ class: 'text-primary' }),
      footer: () => ({ class: 'border-t' }),
    },
  },
  parameters: {
    controls: { exclude: ['ui'] },
    docs: { description: { story: 'Cada función de `ui` recibe el mismo `CardContext`.' } },
  },
}
