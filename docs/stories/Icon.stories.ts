import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Icon } from '@/components/ui/Icon'
import { ICONS } from '@/components/ui/Icon/icons'

const iconNames = Object.keys(ICONS)
const sizes = ['xs', 'sm', 'md', 'lg'] as const

const meta = {
  title: 'Componentes/Icon',
  component: Icon,
  parameters: {
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Renderiza un icono del catálogo interno con tamaño, color y atributos personalizables.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    IconName: {
      control: false,
      description: 'Nombres disponibles en el catálogo interno de iconos.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: iconNames.map((name) => `'${name}'`).join(' | ') },
      },
    },
    IconSize: {
      control: false,
      description: 'Tamaños admitidos por el icono.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
      },
    },
    NormalizeIconProps: {
      control: false,
      description: 'Admite el nombre del icono o su configuración completa.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: 'IconName | IconConfig',
          detail: 'type NormalizeIconProps = IconName | IconConfig',
        },
      },
    },
    name: {
      control: 'select',
      options: iconNames,
      description: 'Icono que se renderiza.',
      table: {
        category: 'Props',
        type: { summary: 'IconName' },
      },
    },
    size: {
      control: 'inline-radio',
      options: sizes,
      description: 'Tamaño del icono.',
      table: {
        category: 'Props',
        type: { summary: 'IconSize' },
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'color',
      description: 'Color CSS aplicado al icono. Hereda el color del texto por defecto.',
      table: {
        category: 'Props',
        type: { summary: 'string' },
        defaultValue: { summary: 'currentColor' },
      },
    },
  },
  args: {
    name: 'check',
    size: 'md',
    color: 'currentColor',
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
