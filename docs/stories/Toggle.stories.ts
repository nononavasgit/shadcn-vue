import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Toggle } from '@/components/ui/Toggle'
import { ICONS } from '@/components/ui/Icon/icons'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
const variants = ['plain', 'outline'] as const
const severities = ['default', 'primary', 'secondary', 'warning', 'success', 'error'] as const
const iconNames = Object.keys(ICONS)

const meta = {
  title: 'Componentes/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Activa o desactiva una opción y comunica su estado mediante `aria-pressed` y `data-state`.',
      },
    },
  },
  argTypes: {
    ToggleValue: {
      control: false,
      description: 'Valor booleano controlado por `v-model:value`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: 'boolean' },
      },
    },
    ToggleState: {
      control: false,
      description: 'Nombre textual del estado efectivo.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'on' | 'off'" },
      },
    },
    ToggleSize: {
      control: false,
      description: 'Tamaños admitidos.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
      },
    },
    ToggleVariant: {
      control: false,
      description: 'Variantes visuales admitidas.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'plain' | 'outline'" },
      },
    },
    ToggleSeverity: {
      control: false,
      description: 'Severidades semánticas admitidas.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: "'default' | 'primary' | 'secondary' | 'warning' | 'success' | 'error'",
        },
      },
    },
    ToggleContext: {
      control: false,
      description: 'Contexto entregado a `ui.root` y a todos los slots.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary:
            '{ label; icon; trailingIcon; variant; severity; size; color; disabled; value; state; pressed }',
          detail:
            'interface ToggleContext {\n  label: string | undefined\n  icon: NormalizeIconProps | undefined\n  trailingIcon: NormalizeIconProps | undefined\n  variant: ToggleVariant | undefined\n  severity: ToggleSeverity | undefined\n  size: ToggleSize | undefined\n  color: string | undefined\n  disabled: boolean | undefined\n  value: boolean\n  state: ToggleState\n  pressed: boolean\n}',
        },
      },
    },
    ToggleUI: {
      control: false,
      description:
        '`root` es una función que recibe `ToggleContext` y devuelve atributos HTML para la raíz.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: '{ root?: (context: ToggleContext) => HTMLAttributes }' },
      },
    },
    default: {
      name: 'default',
      control: false,
      description: 'Contenido principal. Sustituye a `label`.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: ToggleContext' } },
    },
    leading: {
      name: 'leading',
      control: false,
      description: 'Contenido inicial. Sustituye a `icon`.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: ToggleContext' } },
    },
    trailing: {
      name: 'trailing',
      control: false,
      description: 'Contenido final. Sustituye a `trailingIcon`.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: ToggleContext' } },
    },
    updateValue: {
      name: 'update:value',
      control: false,
      description: 'Emitido para actualizar `v-model:value`.',
      table: { category: 'Events', type: { summary: '(value: boolean) => void' } },
    },
    valueChange: {
      name: 'valueChange',
      control: false,
      description: 'Emitido cuando cambia el valor efectivo.',
      table: { category: 'Events', type: { summary: '(value: boolean) => void' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el toggle y evita la interacción.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    value: {
      control: 'boolean',
      description: 'Estado controlado del toggle.',
      table: {
        category: 'Props',
        type: { summary: 'ToggleValue' },
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'Texto mostrado cuando no se proporciona el slot `default`.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    icon: {
      control: 'select',
      options: [undefined, ...iconNames],
      description: 'Icono inicial. Admite `IconName` o `IconProps`.',
      table: { category: 'Props', type: { summary: 'NormalizeIconProps' } },
    },
    trailingIcon: {
      control: 'select',
      options: [undefined, ...iconNames],
      description: 'Icono final. Admite `IconName` o `IconProps`.',
      table: { category: 'Props', type: { summary: 'NormalizeIconProps' } },
    },
    variant: {
      control: 'inline-radio',
      options: variants,
      description: 'Tratamiento visual del toggle.',
      table: {
        category: 'Props',
        type: { summary: 'ToggleVariant' },
        defaultValue: { summary: 'plain' },
      },
    },
    severity: {
      control: 'select',
      options: severities,
      description: 'Color semántico. `color` tiene prioridad cuando se define.',
      table: {
        category: 'Props',
        type: { summary: 'ToggleSeverity' },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: 'inline-radio',
      options: sizes,
      description: 'Tamaño del toggle.',
      table: {
        category: 'Props',
        type: { summary: 'ToggleSize' },
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'color',
      description: 'Color CSS personalizado que sustituye a la severidad visual.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    ui: {
      control: false,
      description:
        'Personaliza la raíz mediante `root: (context: ToggleContext) => HTMLAttributes`.',
      table: {
        category: 'Props',
        type: { summary: 'ToggleUI' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    label: 'Negrita',
    value: false,
    variant: 'plain',
    severity: 'default',
    size: 'md',
    color: undefined,
    icon: undefined,
    trailingIcon: undefined,
    disabled: false,
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
