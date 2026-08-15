import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '@/components/ui/Button'
import { ICONS } from '@/components/ui/Icon/icons'

const sizes = ['xs', 'sm', 'md', 'lg'] as const
const variants = ['solid', 'outline', 'plain', 'subtle', 'soft', 'link'] as const
const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
const iconNames = Object.keys(ICONS)

const meta = {
  title: 'Componentes/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Ejecuta una acción y comunica sus estados mediante variantes, severidades, iconos y carga.',
      },
    },
  },
  argTypes: {
    ButtonSize: {
      control: false,
      description: 'Tamaños admitidos por el botón.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
      },
    },
    ButtonVariant: {
      control: false,
      description: 'Variantes visuales admitidas.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'link'" },
      },
    },
    ButtonSeverity: {
      control: false,
      description: 'Severidades semánticas admitidas.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'primary' | 'secondary' | 'warning' | 'success' | 'error'" },
      },
    },
    ButtonContext: {
      control: false,
      description: 'Contexto entregado a todos los slots.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ variant; severity; size; rounded; square; loading; color }',
          detail:
            'interface ButtonContext {\n  variant: ButtonVariant\n  severity: ButtonSeverity\n  size: ButtonSize\n  rounded: boolean\n  square: boolean\n  loading: boolean\n  color: string | undefined\n}',
        },
      },
    },
    default: {
      name: 'default',
      control: false,
      description: 'Contenido principal. Sustituye a `label`.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: ButtonContext' } },
    },
    leading: {
      name: 'leading',
      control: false,
      description: 'Contenido inicial. Sustituye a `icon` y se oculta durante la carga.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: ButtonContext' } },
    },
    loadingSlot: {
      name: 'loading',
      control: false,
      description: 'Indicador de carga personalizado. Sustituye al spinner.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: ButtonContext' } },
    },
    trailing: {
      name: 'trailing',
      control: false,
      description: 'Contenido final. Sustituye a `trailingIcon`.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: ButtonContext' } },
    },
    click: {
      name: 'click',
      control: false,
      description: 'Emitido al activar el botón si no está deshabilitado ni cargando.',
      table: { category: 'Events', type: { summary: '(event: PointerEvent) => void' } },
    },
    as: {
      control: 'text',
      description: 'Elemento o componente usado como raíz.',
      table: { category: 'Props', defaultValue: { summary: 'button' } },
    },
    asChild: {
      control: 'boolean',
      description: 'Fusiona el botón con el elemento hijo mediante Reka UI.',
      table: { category: 'Props', defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Texto mostrado cuando no se proporciona el slot `default`.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Tratamiento visual del botón.',
      table: {
        category: 'Props',
        type: { summary: 'ButtonVariant' },
        defaultValue: { summary: 'solid' },
      },
    },
    severity: {
      control: 'select',
      options: severities,
      description: 'Color semántico. `color` tiene prioridad cuando se define.',
      table: {
        category: 'Props',
        type: { summary: 'ButtonSeverity' },
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'inline-radio',
      options: sizes,
      description: 'Tamaño del botón.',
      table: {
        category: 'Props',
        type: { summary: 'ButtonSize' },
        defaultValue: { summary: 'md' },
      },
    },
    rounded: {
      control: 'boolean',
      description: 'Aplica bordes completamente redondeados.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    square: {
      control: 'boolean',
      description: 'Iguala ancho y alto para botones de icono.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    loading: {
      control: 'boolean',
      description: 'Muestra carga, añade estado accesible y bloquea la interacción.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    color: {
      control: 'color',
      description: 'Color CSS personalizado que sustituye a la severidad visual.',
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
  },
  args: {
    as: 'button',
    asChild: false,
    label: 'Button',
    variant: 'solid',
    severity: 'primary',
    size: 'md',
    rounded: false,
    square: false,
    loading: false,
    color: undefined,
    icon: undefined,
    trailingIcon: undefined,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { Button },
    setup: () => ({ args }),
    template: '<Button v-bind="args" />',
  }),
}
