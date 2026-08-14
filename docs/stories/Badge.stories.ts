import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Badge } from '@/components/ui/Badge'
import { ICONS } from '@/components/ui/Icon/icons'

const sizes = ['sm', 'md', 'lg'] as const
const variants = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const
const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
const iconNames = Object.keys(ICONS)
const contextType = { summary: 'BadgeContext' }

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Muestra una etiqueta compacta con raíz `span` para estados, categorías o metadatos, con variantes semánticas e iconos opcionales.',
      },
    },
  },
  argTypes: {
    BadgeSize: {
      control: false,
      description: 'Tamaños visuales disponibles para el Badge.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'sm' | 'md' | 'lg'" },
      },
    },
    BadgeVariant: {
      control: false,
      description: 'Tratamientos visuales disponibles para el Badge.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'" },
      },
    },
    BadgeSeverity: {
      control: false,
      description: 'Intenciones semánticas de color disponibles.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'primary' | 'secondary' | 'warning' | 'success' | 'error'" },
      },
    },
    BadgeContext: {
      control: false,
      description: 'Representa la apariencia efectiva del Badge.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ size; variant; severity; color }',
          detail:
            'interface BadgeContext {\n  size: BadgeSize\n  variant: BadgeVariant\n  severity: BadgeSeverity\n  color: string | undefined\n}',
        },
      },
    },
    BadgeUI: {
      control: false,
      description: 'Define los atributos HTML personalizables de la raíz.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ root }',
          detail: 'interface BadgeUI {\n  root?: (context: BadgeContext) => HTMLAttributes\n}',
        },
      },
    },
    default: {
      control: false,
      description: 'Personaliza el contenido principal y sustituye a `label`.',
      table: { category: 'slots', readonly: true, type: contextType },
    },
    leading: {
      control: false,
      description: 'Personaliza el contenido inicial y sustituye a `icon`.',
      table: { category: 'slots', readonly: true, type: contextType },
    },
    trailing: {
      control: false,
      description: 'Personaliza el contenido final y sustituye a `trailingIcon`.',
      table: { category: 'slots', readonly: true, type: contextType },
    },
    label: {
      control: 'text',
      description: 'Texto mostrado cuando no se proporciona el slot `default`.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    size: {
      control: 'inline-radio',
      options: sizes,
      description: 'Tamaño visual del Badge.',
      table: {
        category: 'Props',
        type: { summary: 'BadgeSize' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Tratamiento visual del Badge.',
      table: {
        category: 'Props',
        type: { summary: 'BadgeVariant' },
        defaultValue: { summary: 'solid' },
      },
    },
    severity: {
      control: 'select',
      options: severities,
      description: 'Intención semántica de color. `color` tiene prioridad visual.',
      table: {
        category: 'Props',
        type: { summary: 'BadgeSeverity' },
        defaultValue: { summary: 'primary' },
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
      description:
        'Icono inicial. Hereda `size` del Badge salvo que la configuración del icono defina su propio tamaño.',
      table: { category: 'Props', type: { summary: 'NormalizeIconProps' } },
    },
    trailingIcon: {
      control: 'select',
      options: [undefined, ...iconNames],
      description:
        'Icono final. Hereda `size` del Badge salvo que la configuración del icono defina su propio tamaño.',
      table: { category: 'Props', type: { summary: 'NormalizeIconProps' } },
    },
    ui: {
      control: 'object',
      description: 'Personaliza la raíz mediante una función que recibe `BadgeContext`.',
      table: { category: 'Props', type: { summary: 'BadgeUI' } },
    },
  },
  args: {
    label: 'Badge',
    size: 'md',
    variant: 'solid',
    severity: 'primary',
    color: undefined,
    icon: 'info',
    trailingIcon: 'chevronRight',
    ui: undefined,
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
