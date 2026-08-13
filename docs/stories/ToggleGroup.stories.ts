import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref, watch } from 'vue'
import { ToggleGroup, type ToggleGroupModelValue } from '@/components/ui/ToggleGroup'

const items = [
  { value: 'left', label: 'Izquierda', icon: 'chevronLeft' as const },
  { value: 'center', label: 'Centro' },
  { value: 'right', label: 'Derecha', trailingIcon: 'chevronRight' as const },
]

const meta = {
  title: 'Componentes/ToggleGroup',
  component: ToggleGroup,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Agrupa botones de selección única o múltiple con navegación por teclado. La raíz siempre es un `div` y cada item un `button` nativo.',
      },
    },
  },
  argTypes: {
    ToggleGroupValue: {
      control: false,
      description: 'Identificador de un item y valor usado para determinar su selección.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: 'string | number' },
      },
    },
    ToggleGroupModelValue: {
      control: false,
      description:
        'Representa la selección actual: un valor en modo `single` o una lista en modo `multiple`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: 'ToggleGroupValue | ToggleGroupValue[] | undefined' },
      },
    },
    ToggleGroupItem: {
      control: false,
      description:
        'Describe una opción del grupo: su identidad, contenido visual y disponibilidad.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ value; disabled; label; icon; trailingIcon }',
          detail:
            'interface ToggleGroupItem {\n  value: ToggleGroupValue\n  disabled?: boolean\n  label?: string\n  icon?: NormalizeIconProps\n  trailingIcon?: NormalizeIconProps\n}',
        },
      },
    },
    ToggleGroupContext: {
      control: false,
      description: 'Representa el estado efectivo del grupo y su disposición.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ value; orientation; disabled }',
          detail:
            "interface ToggleGroupContext {\n  value: ToggleGroupModelValue\n  orientation: 'horizontal' | 'vertical'\n  disabled: boolean\n}",
        },
      },
    },
    ToggleGroupItemContext: {
      control: false,
      description: 'Representa el estado de un item durante su renderizado.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ item; index; selected; disabled }',
          detail:
            'interface ToggleGroupItemContext {\n  item: ToggleGroupItem\n  index: number\n  selected: boolean\n  disabled: boolean\n}',
        },
      },
    },
    ToggleGroupUI: {
      control: false,
      description: 'Define los atributos HTML de las partes personalizables del componente.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ root; item; label }',
          detail:
            'interface ToggleGroupUI {\n  root?: (context: ToggleGroupContext) => HTMLAttributes\n  item?: (context: ToggleGroupItemContext) => HTMLAttributes\n  label?: (context: ToggleGroupItemContext) => HTMLAttributes\n}',
        },
      },
    },
    ToggleGroupOrientation: {
      control: false,
      description: 'Dirección en la que se organizan y recorren los items.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    ToggleGroupType: {
      control: false,
      description: 'Define si el grupo admite una o varias selecciones simultáneas.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'single' | 'multiple'" },
      },
    },
    ToggleGroupVariant: {
      control: false,
      description: 'Define el tratamiento visual de los items.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'plain' | 'outline'" },
      },
    },
    ToggleGroupSeverity: {
      control: false,
      description: 'Define la intención semántica de color de los items.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'default' | 'primary' | 'secondary' | 'warning' | 'success' | 'error'" },
      },
    },
    ToggleGroupSize: {
      control: false,
      description: 'Define el tamaño visual de los items.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
      },
    },
    item: {
      control: false,
      description: 'Personaliza el contenido completo de todos los items.',
      table: { category: 'slots', readonly: true, type: { summary: 'ToggleGroupItemContext' } },
    },
    leading: {
      control: false,
      description: 'Personaliza el contenido inicial de todos los items.',
      table: { category: 'slots', readonly: true, type: { summary: 'ToggleGroupItemContext' } },
    },
    label: {
      control: false,
      description: 'Personaliza la etiqueta de todos los items.',
      table: { category: 'slots', readonly: true, type: { summary: 'ToggleGroupItemContext' } },
    },
    trailing: {
      control: false,
      description: 'Personaliza el contenido final de todos los items.',
      table: { category: 'slots', readonly: true, type: { summary: 'ToggleGroupItemContext' } },
    },
    specificItem: {
      name: 'item-{item.value}',
      control: false,
      description: 'Personaliza el contenido completo de un item concreto.',
      table: { category: 'slots', readonly: true, type: { summary: 'ToggleGroupItemContext' } },
    },
    specificLeading: {
      name: 'leading-{item.value}',
      control: false,
      description: 'Personaliza el contenido inicial de un item concreto.',
      table: { category: 'slots', readonly: true, type: { summary: 'ToggleGroupItemContext' } },
    },
    specificLabel: {
      name: 'label-{item.value}',
      control: false,
      description: 'Personaliza la etiqueta de un item concreto.',
      table: { category: 'slots', readonly: true, type: { summary: 'ToggleGroupItemContext' } },
    },
    specificTrailing: {
      name: 'trailing-{item.value}',
      control: false,
      description: 'Personaliza el contenido final de un item concreto.',
      table: { category: 'slots', readonly: true, type: { summary: 'ToggleGroupItemContext' } },
    },
    'getSlotNames(itemContext).item': { table: { disable: true } },
    'getSlotNames(itemContext).leading': { table: { disable: true } },
    'getSlotNames(itemContext).label': { table: { disable: true } },
    'getSlotNames(itemContext).trailing': { table: { disable: true } },
    updateValue: {
      name: 'update:value',
      control: false,
      description: 'Emitido para actualizar `v-model:value`.',
      table: {
        category: 'Events',
        type: { summary: '(value: ToggleGroupModelValue) => void' },
      },
    },
    valueChange: {
      name: 'valueChange',
      control: false,
      description: 'Emitido cuando cambia el valor efectivo.',
      table: {
        category: 'Events',
        type: { summary: '(value: ToggleGroupModelValue) => void' },
      },
    },
    value: {
      control: false,
      description: 'Selección controlada mediante `v-model:value`.',
      table: { category: 'Props', type: { summary: 'ToggleGroupModelValue' } },
    },
    type: {
      control: 'inline-radio',
      options: ['single', 'multiple'],
      description: 'Permite seleccionar uno o varios items.',
      table: {
        category: 'Props',
        type: { summary: 'ToggleGroupType' },
        defaultValue: { summary: 'single' },
      },
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientación visual y de navegación por teclado.',
      table: {
        category: 'Props',
        type: { summary: 'ToggleGroupOrientation' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    dir: {
      control: 'inline-radio',
      options: ['ltr', 'rtl'],
      description: 'Dirección de lectura usada por la navegación.',
      table: { category: 'Props', type: { summary: "'ltr' | 'rtl'" } },
    },
    loop: {
      control: 'boolean',
      description: 'Permite continuar la navegación desde el último item al primero.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    rovingFocus: {
      control: 'boolean',
      description: 'Activa la navegación entre items mediante flechas.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita todos los items.',
      table: { category: 'Props', defaultValue: { summary: 'false' } },
    },
    variant: {
      control: 'inline-radio',
      options: ['plain', 'outline'],
      description: 'Variante visual compartida por los items.',
      table: {
        category: 'Props',
        type: { summary: 'ToggleGroupVariant' },
        defaultValue: { summary: 'plain' },
      },
    },
    severity: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'warning', 'success', 'error'],
      description: 'Severidad visual compartida por los items.',
      table: {
        category: 'Props',
        type: { summary: 'ToggleGroupSeverity' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Tamaño compartido por los items.',
      table: {
        category: 'Props',
        type: { summary: 'ToggleGroupSize' },
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'color',
      description: 'Color CSS personalizado para los items.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    spacing: {
      control: { type: 'number', min: 0, step: 1 },
      description: 'Separación entre items según la escala de Tailwind.',
      table: {
        category: 'Props',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    mandatory: {
      control: 'boolean',
      description: 'Impide dejar el grupo sin selección.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    items: {
      control: 'object',
      description: 'Items renderizados por el grupo.',
      table: { category: 'Props', type: { summary: 'ToggleGroupItem[]' } },
    },
    ui: {
      control: 'object',
      description: 'Personaliza raíz, items y etiquetas mediante funciones.',
      table: { category: 'Props', type: { summary: 'ToggleGroupUI' } },
    },
  },
  args: {
    value: 'left',
    type: 'single',
    orientation: 'horizontal',
    loop: true,
    rovingFocus: true,
    disabled: false,
    variant: 'outline',
    severity: 'default',
    size: 'md',
    color: undefined,
    spacing: 0,
    mandatory: false,
    items,
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { ToggleGroup },
    setup() {
      const value = ref<ToggleGroupModelValue>(args.value)

      watch(
        () => args.type,
        (type) => {
          value.value = type === 'multiple' ? [] : undefined
        },
      )

      return { args, value }
    },
    template: '<ToggleGroup v-bind="args" v-model:value="value" />',
  }),
}
