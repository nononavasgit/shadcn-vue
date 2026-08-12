import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Icon, type IconContext } from '@/components/ui/Icon'
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
        type: { summary: "'sm' | 'md' | 'lg'" },
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
      options: ['sm', 'md', 'lg'],
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

export const Catalog: Story = {
  name: 'Catálogo',
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => ({
    components: { Icon },
    setup: () => ({ iconNames }),
    template: `
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <div
          v-for="name in iconNames"
          :key="name"
          class="flex min-w-32 flex-col items-center gap-3 rounded-lg border p-4"
        >
          <Icon :name="name" size="lg" />
          <code class="text-xs text-muted-foreground">{{ name }}</code>
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Icon },
    template: `
      <div class="flex items-end gap-6">
        <div v-for="size in ['sm', 'md', 'lg']" :key="size" class="grid justify-items-center gap-2">
          <Icon name="check" :size="size" />
          <code class="text-xs text-muted-foreground">{{ size }}</code>
        </div>
      </div>
    `,
  }),
}

export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Icon },
    template: `
      <div class="flex items-center gap-6">
        <Icon name="info" size="lg" color="#2563eb" />
        <Icon name="success" size="lg" color="#16a34a" />
        <Icon name="warning" size="lg" color="#d97706" />
        <Icon name="error" size="lg" color="#dc2626" />
      </div>
    `,
  }),
}

export const UiAsFunction: Story = {
  name: 'UI como función',
  args: {
    name: 'spinner',
    size: 'lg',
    ui: {
      root: (context: IconContext) => ({
        class: context.name === 'spinner' ? 'animate-spin' : undefined,
        'data-icon-name': context.name,
        'data-icon-size': context.size,
      }),
    },
  },
  parameters: {
    controls: { exclude: ['ui'] },
    docs: {
      description: {
        story: '`ui.root` recibe `IconContext` y devuelve atributos HTML para el SVG.',
      },
    },
  },
}
