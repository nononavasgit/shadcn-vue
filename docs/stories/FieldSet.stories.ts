import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { FieldSet } from '@/components/ui/FieldSet'
import { Input } from '@/components/ui/Input'

const legendVariants = ['legend', 'label'] as const
const contextType = { summary: 'FieldSetContext' }

const meta = {
  title: 'Componentes/FieldSet',
  component: FieldSet,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Agrupa controles relacionados dentro de un `fieldset` con leyenda y descripción opcionales.',
      },
    },
  },
  decorators: [() => ({ template: '<div class="w-96"><story /></div>' })],
  argTypes: {
    FieldSetLegend: {
      control: false,
      description: 'Texto utilizado como leyenda del grupo.',
      table: { category: 'Interfaces', readonly: true, type: { summary: 'string' } },
    },
    FieldSetDescription: {
      control: false,
      description: 'Texto descriptivo mostrado debajo de la leyenda.',
      table: { category: 'Interfaces', readonly: true, type: { summary: 'string' } },
    },
    FieldSetLegendVariant: {
      control: false,
      description: 'Tratamientos visuales disponibles para la leyenda.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'legend' | 'label'" },
      },
    },
    FieldSetContext: {
      control: false,
      description: 'Representa la configuración efectiva del grupo.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ legend; description; legendVariant }',
          detail:
            'interface FieldSetContext {\n  legend: FieldSetLegend | undefined\n  description: FieldSetDescription | undefined\n  legendVariant: FieldSetLegendVariant\n}',
        },
      },
    },
    FieldSetUI: {
      control: false,
      description: 'Define los atributos HTML personalizables de las partes internas.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ legend; description; group }',
          detail:
            'interface FieldSetUI {\n  legend?: (context: FieldSetContext) => HTMLAttributes\n  description?: (context: FieldSetContext) => HTMLAttributes\n  group?: (context: FieldSetContext) => HTMLAttributes\n}',
        },
      },
    },
    default: {
      control: false,
      description: 'Controles agrupados por el `fieldset`.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    legendSlot: {
      name: 'legend',
      control: false,
      description: 'Sustituye el contenido de la prop `legend`.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    descriptionSlot: {
      name: 'description',
      control: false,
      description: 'Sustituye el contenido de la prop `description`.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    legend: {
      control: 'text',
      description: 'Leyenda del grupo de controles.',
      table: { category: 'Props', type: { summary: 'FieldSetLegend' } },
    },
    description: {
      control: 'text',
      description: 'Texto secundario del grupo.',
      table: { category: 'Props', type: { summary: 'FieldSetDescription' } },
    },
    legendVariant: {
      control: 'inline-radio',
      options: legendVariants,
      description: 'Tratamiento visual de la leyenda.',
      table: {
        category: 'Props',
        type: { summary: 'FieldSetLegendVariant' },
        defaultValue: { summary: 'legend' },
      },
    },
    ui: {
      control: 'object',
      description: 'Personaliza `legend`, `description` y `group` mediante funciones.',
      table: { category: 'Props', type: { summary: 'FieldSetUI' } },
    },
  },
  args: {
    legend: 'Datos personales',
    description: 'Completa la información de contacto.',
    legendVariant: 'legend',
  },
} satisfies Meta<typeof FieldSet>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { FieldSet, Input },
    setup: () => ({ args }),
    template: `
      <FieldSet v-bind="args">
        <Input label="Nombre" placeholder="Nombre completo" />
        <Input label="Correo" type="email" placeholder="correo@ejemplo.com" />
      </FieldSet>
    `,
  }),
}
