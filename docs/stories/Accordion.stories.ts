import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, watch } from 'vue'
import { Accordion, type AccordionValue } from '@/components/ui/Accordion'
import { ICONS } from '@/components/ui/Icon/icons'

const iconNames = Object.keys(ICONS)
const itemContextType = { summary: 'AccordionItemContext' }

const items = [
  {
    value: 'accessibility',
    label: '¿Es accesible?',
    icon: 'info' as const,
    description:
      'Sí. El componente utiliza los patrones de navegación y teclado proporcionados por Reka UI.',
  },
  {
    value: 'styling',
    label: '¿Se puede personalizar?',
    description: 'Sí. Cada parte admite atributos mediante la prop ui y contenido mediante slots.',
  },
  {
    value: 'disabled',
    label: 'Opción deshabilitada',
    description: 'Este contenido no puede abrirse.',
    disabled: true,
  },
]

const meta = {
  title: 'Componentes/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Organiza contenido en secciones que pueden expandirse individualmente o en grupo.',
      },
    },
  },
  argTypes: {
    AccordionItemValue: {
      control: false,
      description: 'Identificador único de un item del Accordion.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: 'string' },
      },
    },
    AccordionValue: {
      control: false,
      description: 'Valor de la selección actual según el tipo del accordion.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: 'AccordionItemValue | AccordionItemValue[] | undefined' },
      },
    },
    AccordionType: {
      control: false,
      description: 'Define si puede abrirse uno o varios items simultáneamente.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'single' | 'multiple'" },
      },
    },
    AccordionItem: {
      control: false,
      description:
        'Describe una sección y su contenido. `unmountOnHide` sobrescribe el valor global; si se omite, lo hereda de la raíz.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ value; disabled; unmountOnHide; label; description; icon }',
          detail:
            'interface AccordionItem {\n  value: AccordionItemValue\n  disabled?: boolean\n  unmountOnHide?: boolean\n  label?: string\n  description?: string\n  icon?: NormalizeIconProps\n}',
        },
      },
    },
    AccordionContext: {
      control: false,
      description: 'Representa el estado y la configuración efectiva del Accordion.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ value; type; collapsible; disabled; unmountOnHide }',
          detail:
            'interface AccordionContext {\n  value: AccordionValue\n  type: AccordionType\n  collapsible: boolean\n  disabled: boolean\n  unmountOnHide: boolean\n}',
        },
      },
    },
    AccordionItemContext: {
      control: false,
      description: 'Representa el estado de un item durante su renderizado.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ item; index; open; first; last }',
          detail:
            'interface AccordionItemContext {\n  item: AccordionItem\n  index: number\n  open: boolean\n  first: boolean\n  last: boolean\n}',
        },
      },
    },
    AccordionUI: {
      control: false,
      description: 'Define los atributos HTML de las partes personalizables del Accordion.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ root; item; trigger; content }',
          detail:
            'interface AccordionUI {\n  root?: (context: AccordionContext) => HTMLAttributes\n  item?: (context: AccordionItemContext) => HTMLAttributes\n  trigger?: (context: AccordionItemContext) => HTMLAttributes\n  content?: (context: AccordionItemContext) => HTMLAttributes\n}',
        },
      },
    },
    trigger: {
      control: false,
      description: 'Personaliza el trigger de todos los items.',
      table: { category: 'slots', readonly: true, type: itemContextType },
    },
    icon: {
      control: false,
      description: 'Personaliza el icono inicial de todos los items.',
      table: { category: 'slots', readonly: true, type: itemContextType },
    },
    label: {
      control: false,
      description: 'Personaliza la etiqueta de todos los items.',
      table: { category: 'slots', readonly: true, type: itemContextType },
    },
    iconDropdown: {
      control: false,
      description: 'Personaliza el icono de estado de todos los items.',
      table: { category: 'slots', readonly: true, type: itemContextType },
    },
    content: {
      control: false,
      description: 'Personaliza el contenido de todos los items.',
      table: { category: 'slots', readonly: true, type: itemContextType },
    },
    specificTrigger: {
      name: 'trigger-{item.value}',
      control: false,
      description: 'Personaliza el trigger completo de un item concreto.',
      table: { category: 'slots', readonly: true, type: itemContextType },
    },
    specificIcon: {
      name: 'icon-{item.value}',
      control: false,
      description: 'Personaliza el icono inicial de un item concreto.',
      table: { category: 'slots', readonly: true, type: itemContextType },
    },
    specificLabel: {
      name: 'label-{item.value}',
      control: false,
      description: 'Personaliza la etiqueta de un item concreto.',
      table: { category: 'slots', readonly: true, type: itemContextType },
    },
    specificIconDropdown: {
      name: 'iconDropdown-{item.value}',
      control: false,
      description: 'Personaliza el icono de estado de un item concreto.',
      table: { category: 'slots', readonly: true, type: itemContextType },
    },
    specificContent: {
      name: 'content-{item.value}',
      control: false,
      description: 'Personaliza el contenido de un item concreto.',
      table: { category: 'slots', readonly: true, type: itemContextType },
    },
    'getSlots(context).trigger': { table: { disable: true } },
    'getSlots(context).icon': { table: { disable: true } },
    'getSlots(context).label': { table: { disable: true } },
    'getSlots(context).iconDropdown': { table: { disable: true } },
    'getSlots(context).content': { table: { disable: true } },
    updateValue: {
      name: 'update:value',
      control: false,
      description: 'Emitido para actualizar `v-model:value`.',
      table: { category: 'Events', type: { summary: '(value: AccordionValue) => void' } },
    },
    valueChange: {
      control: false,
      description: 'Emitido cuando cambia el valor efectivo.',
      table: { category: 'Events', type: { summary: '(value: AccordionValue) => void' } },
    },
    value: {
      control: false,
      description: 'Selección controlada mediante `v-model:value`.',
      table: { category: 'Props', type: { summary: 'AccordionValue' } },
    },
    type: {
      control: 'inline-radio',
      options: ['single', 'multiple'],
      description: 'Permite abrir uno o varios items.',
      table: {
        category: 'Props',
        type: { summary: 'AccordionType' },
        defaultValue: { summary: 'single' },
      },
    },
    collapsible: {
      control: 'boolean',
      description: 'Permite cerrar el item activo en modo single.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita todos los items.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    unmountOnHide: {
      control: 'boolean',
      description: 'Desmonta del DOM el contenido de los items cerrados.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    items: {
      control: 'object',
      description: 'Items renderizados por el Accordion.',
      table: { category: 'Props', type: { summary: 'AccordionItem[]' } },
    },
    iconDropDownOpen: {
      control: 'select',
      options: [undefined, ...iconNames],
      description: 'Icono mostrado cuando un item está abierto.',
      table: {
        category: 'Props',
        type: { summary: 'NormalizeIconProps' },
        defaultValue: { summary: 'chevronUp' },
      },
    },
    iconDropDownClose: {
      control: 'select',
      options: [undefined, ...iconNames],
      description: 'Icono mostrado cuando un item está cerrado.',
      table: {
        category: 'Props',
        type: { summary: 'NormalizeIconProps' },
        defaultValue: { summary: 'chevronDown' },
      },
    },
    ui: {
      control: 'object',
      description: 'Personaliza la raíz, los items, los triggers y el contenido.',
      table: { category: 'Props', type: { summary: 'AccordionUI' } },
    },
  },
  args: {
    value: 'accessibility',
    type: 'single',
    collapsible: true,
    disabled: false,
    unmountOnHide: true,
    items,
    iconDropDownOpen: 'chevronUp',
    iconDropDownClose: 'chevronDown',
    ui: undefined,
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      const value = ref<AccordionValue>(args.value)

      watch(
        () => args.type,
        (type) => {
          value.value = type === 'multiple' ? [] : undefined
        },
      )

      return { args, value }
    },
    template: '<Accordion v-bind="args" v-model:value="value" class="w-96" />',
  }),
}
