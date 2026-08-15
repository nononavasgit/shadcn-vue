import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Avatar } from '@/components/ui/Avatar'
import { ICONS } from '@/components/ui/Icon/icons'

const iconNames = Object.keys(ICONS)
const sizes = ['xs', 'sm', 'md', 'lg'] as const
const shapes = ['rounded', 'square'] as const

const meta = {
  title: 'Componentes/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Muestra una imagen de usuario con fallback de texto, icono o contenido personalizado.',
      },
    },
  },
  argTypes: {
    AvatarSize: {
      control: false,
      description: 'Tamanos visuales disponibles para el Avatar.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'xs' | 'sm' | 'md' | 'lg'" },
      },
    },
    AvatarShape: {
      control: false,
      description: 'Formas disponibles para el Avatar.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'rounded' | 'square'" },
      },
    },
    size: {
      control: 'inline-radio',
      options: sizes,
      description: 'Tamano visual del Avatar.',
      table: {
        category: 'Props',
        type: { summary: 'AvatarSize' },
        defaultValue: { summary: 'md' },
      },
    },
    shape: {
      control: 'inline-radio',
      options: shapes,
      description: 'Forma del Avatar.',
      table: {
        category: 'Props',
        type: { summary: 'AvatarShape' },
        defaultValue: { summary: 'rounded' },
      },
    },
    src: {
      control: 'text',
      description: 'URL nativa de la imagen. Si no se proporciona, se muestra el fallback.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    delayMs: {
      control: 'number',
      description: 'Retrasa la aparicion del fallback.',
      table: { category: 'Props', type: { summary: 'number' } },
    },
    icon: {
      control: 'select',
      options: [undefined, ...iconNames],
      description: 'Icono mostrado en el fallback.',
      table: { category: 'Props', type: { summary: 'NormalizeIconProps' } },
    },
    label: {
      control: 'text',
      description: 'Texto mostrado en el fallback cuando no se proporciona un icono.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
  },
  args: {
    size: 'md',
    shape: 'rounded',
    src: 'https://i.pravatar.cc/96?img=12',
    delayMs: undefined,
    icon: undefined,
    label: 'AL',
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { Avatar },
    setup: () => ({ args }),
    template: `
      <Avatar :key="args.src || 'fallback'" v-bind="args" />
    `,
  }),
}
