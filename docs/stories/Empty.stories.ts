import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '@/components/ui/Button'
import { Empty, type EmptyContext } from '@/components/ui/Empty'
import { Icon } from '@/components/ui/Icon'

const mediaVariants = ['default', 'icon'] as const

const meta = {
  title: 'Componentes/Empty',
  component: Empty,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Comunica que una vista no contiene información y permite añadir contenido explicativo y acciones.',
      },
    },
  },
  decorators: [() => ({ template: '<div class="w-[36rem]"><story /></div>' })],
  argTypes: {
    EmptyMediaVariant: {
      control: false,
      description: 'Variantes admitidas para el contenido visual.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'default' | 'icon'" },
      },
    },
    EmptyContext: {
      control: false,
      description: 'Contexto entregado a las funciones de `ui` y a todos los slots.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ label; description; mediaVariant }',
          detail:
            "interface EmptyContext {\n  label: EmptyProps['label']\n  description: EmptyProps['description']\n  mediaVariant: EmptyProps['mediaVariant']\n}",
        },
      },
    },
    EmptyUI: {
      control: false,
      description: 'Funciones que personalizan cada parte interna y reciben `EmptyContext`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ root; header; media; label; description; content }',
          detail:
            'interface EmptyUI {\n  root?: (context: EmptyContext) => HTMLAttributes\n  header?: (context: EmptyContext) => HTMLAttributes\n  media?: (context: EmptyContext) => HTMLAttributes\n  label?: (context: EmptyContext) => HTMLAttributes\n  description?: (context: EmptyContext) => HTMLAttributes\n  content?: (context: EmptyContext) => HTMLAttributes\n}',
        },
      },
    },
    default: {
      name: 'default',
      control: false,
      description: 'Contenido principal, normalmente acciones o ayuda adicional.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: EmptyContext' } },
    },
    media: {
      name: 'media',
      control: false,
      description: 'Contenido visual mostrado sobre el título.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: EmptyContext' } },
    },
    labelSlot: {
      name: 'label',
      control: false,
      description: 'Sustituye el contenido de la prop `label`.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: EmptyContext' } },
    },
    descriptionSlot: {
      name: 'description',
      control: false,
      description: 'Sustituye el contenido de la prop `description`.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: EmptyContext' } },
    },
    label: {
      control: 'text',
      description: 'Título del estado vacío.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    description: {
      control: 'text',
      description: 'Explicación o sugerencia para el consumidor.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    mediaVariant: {
      control: 'inline-radio',
      options: mediaVariants,
      description: 'Tratamiento visual aplicado al slot `media`.',
      table: {
        category: 'Props',
        type: { summary: 'EmptyMediaVariant' },
        defaultValue: { summary: 'default' },
      },
    },
    ui: {
      control: 'object',
      description: 'Personaliza las partes internas mediante funciones que reciben `EmptyContext`.',
      table: {
        category: 'Props',
        type: { summary: 'EmptyUI' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    label: 'Sin resultados',
    description: 'No encontramos elementos que coincidan con tu búsqueda.',
    mediaVariant: 'icon',
  },
} satisfies Meta<typeof Empty>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    ui: {
      root: () => ({}),
      header: () => ({}),
      media: () => ({}),
      label: () => ({}),
      description: () => ({}),
      content: () => ({}),
    },
  },
  render: (args) => ({
    components: { Button, Empty, Icon },
    setup: () => ({ args }),
    template: `
      <Empty v-bind="args">
        <template #media><Icon name="search" /></template>
        <Button label="Limpiar filtros" variant="outline" size="sm" />
      </Empty>
    `,
  }),
}

export const CustomSlots: Story = {
  name: 'Slots personalizados',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button, Empty, Icon },
    template: `
      <Empty media-variant="icon">
        <template #media><Icon name="file" /></template>
        <template #label>Bandeja vacía</template>
        <template #description>No tienes mensajes pendientes.</template>
        <Button label="Actualizar" size="sm" />
      </Empty>
    `,
  }),
}

export const UiAsFunction: Story = {
  name: 'UI como función',
  args: {
    ui: {
      root: (context: EmptyContext) => ({
        class: 'border bg-muted/30',
        'data-media-variant': context.mediaVariant,
      }),
      label: (context: EmptyContext) => ({ title: context.label }),
    },
  },
  parameters: {
    controls: { exclude: ['ui'] },
    docs: { description: { story: 'Cada función de `ui` recibe el mismo `EmptyContext`.' } },
  },
}
