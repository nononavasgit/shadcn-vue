import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Icon } from '@/components/ui/Icon'
import { ICONS } from '@/components/ui/Icon/icons'

const iconNames = Object.keys(ICONS)

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
    IconContext: {
      control: false,
      description: 'Contexto entregado a las funciones de `ui`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ name: IconName; size: IconSize; color: string }',
          detail:
            'interface IconContext {\n  name: IconName\n  size: IconSize | undefined\n  color: string | undefined\n}',
        },
      },
    },
    IconUI: {
      control: false,
      description:
        '`root` es una función que recibe `IconContext` y devuelve atributos HTML para el SVG.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ root?: (context: IconContext) => HTMLAttributes }',
          detail:
            'interface IconUI {\n  root?: (context: IconContext) => HTMLAttributes\n}\n\n// HTMLAttributes admite class, style, id, role, aria-*, data-* y listeners HTML.',
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
      options: ['xs', 'sm', 'md', 'lg'],
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
    ui: {
      control: false,
      description: 'Personaliza el SVG mediante `root: (context: IconContext) => HTMLAttributes`.',
      table: {
        category: 'Props',
        type: { summary: 'IconUI' },
        defaultValue: { summary: 'undefined' },
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
