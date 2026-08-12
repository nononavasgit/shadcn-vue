import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Badge, type BadgeContext } from '@/components/ui/Badge'
import { ICONS } from '@/components/ui/Icon/icons'

const sizes = ['sm', 'md', 'lg'] as const
const variants = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const
const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
const iconNames = Object.keys(ICONS)

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  parameters: {
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Muestra una etiqueta compacta para estados, categorías o metadatos, con variantes semánticas e iconos opcionales.',
      },
    },
    layout: 'centered',
  },
  argTypes: {
    BadgeSize: {
      control: false,
      description: 'Tamaños admitidos por el badge.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'sm' | 'md' | 'lg'" },
      },
    },
    BadgeVariant: {
      control: false,
      description: 'Variantes visuales admitidas.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'" },
      },
    },
    BadgeSeverity: {
      control: false,
      description: 'Severidades semánticas admitidas.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'primary' | 'secondary' | 'warning' | 'success' | 'error'" },
      },
    },
    BadgeContext: {
      control: false,
      description: 'Contexto entregado a las funciones de `ui` y a todos los slots.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ as; label; size; variant; severity; color; icon; trailingIcon }',
          detail:
            "interface BadgeContext {\n  as: BadgeProps['as']\n  label: string | undefined\n  size: BadgeSize | undefined\n  variant: BadgeVariant | undefined\n  severity: BadgeSeverity | undefined\n  color: string | undefined\n  icon: NormalizeIconProps | undefined\n  trailingIcon: NormalizeIconProps | undefined\n}",
        },
      },
    },
    BadgeUI: {
      control: false,
      description:
        '`root` es una función que recibe `BadgeContext` y devuelve atributos HTML para la raíz.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ root?: (context: BadgeContext) => HTMLAttributes }',
          detail: 'interface BadgeUI {\n  root?: (context: BadgeContext) => HTMLAttributes\n}',
        },
      },
    },
    default: {
      name: 'default',
      control: false,
      description: 'Contenido principal. Sustituye a `label`.',
      table: {
        category: 'Slots',
        readonly: true,
        type: { summary: 'slotProps: BadgeContext' },
      },
    },
    leading: {
      name: 'leading',
      control: false,
      description: 'Contenido inicial. Sustituye a `icon`.',
      table: {
        category: 'Slots',
        readonly: true,
        type: { summary: 'slotProps: BadgeContext' },
      },
    },
    trailing: {
      name: 'trailing',
      control: false,
      description: 'Contenido final. Sustituye a `trailingIcon`.',
      table: {
        category: 'Slots',
        readonly: true,
        type: { summary: 'slotProps: BadgeContext' },
      },
    },
    as: {
      control: 'text',
      description: 'Elemento o componente usado como raíz.',
      table: { category: 'Props', defaultValue: { summary: 'span' } },
    },
    label: {
      control: 'text',
      description: 'Texto mostrado cuando no se proporciona el slot `default`.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    size: {
      control: 'inline-radio',
      options: sizes,
      description: 'Tamaño del badge.',
      table: {
        category: 'Props',
        type: { summary: 'BadgeSize' },
        defaultValue: { summary: 'md' },
      },
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Tratamiento visual del badge.',
      table: {
        category: 'Props',
        type: { summary: 'BadgeVariant' },
        defaultValue: { summary: 'solid' },
      },
    },
    severity: {
      control: 'select',
      options: severities,
      description: 'Color semántico del badge. `color` tiene prioridad cuando se define.',
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
      description: 'Icono inicial. Admite `IconName` o `IconProps`.',
      table: { category: 'Props', type: { summary: 'NormalizeIconProps' } },
    },
    trailingIcon: {
      control: 'select',
      options: [undefined, ...iconNames],
      description: 'Icono final. Admite `IconName` o `IconProps`.',
      table: { category: 'Props', type: { summary: 'NormalizeIconProps' } },
    },
    ui: {
      control: false,
      description:
        'Personaliza la raíz mediante `root: (context: BadgeContext) => HTMLAttributes`.',
      table: {
        category: 'Props',
        type: { summary: 'BadgeUI' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    as: 'span',
    label: 'Badge',
    size: 'md',
    variant: 'solid',
    severity: 'primary',
    color: undefined,
    icon: undefined,
    trailingIcon: undefined,
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => ({
    components: { Badge },
    setup: () => ({ severities, variants }),
    template: `
      <div class="grid gap-4">
        <div v-for="variant in variants" :key="variant" class="flex flex-wrap items-center gap-3">
          <code class="w-16 text-xs text-muted-foreground">{{ variant }}</code>
          <Badge
            v-for="severity in severities"
            :key="severity"
            :label="severity"
            :variant="variant"
            :severity="severity"
          />
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    setup: () => ({ sizes }),
    template: `
      <div class="flex items-center gap-4">
        <Badge v-for="size in sizes" :key="size" :label="size" :size="size" />
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  name: 'Con iconos',
  args: {
    label: 'Completado',
    severity: 'success',
    icon: 'check',
    trailingIcon: 'chevronRight',
  },
}

export const CustomColor: Story = {
  name: 'Color personalizado',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    setup: () => ({ variants }),
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Badge
          v-for="variant in variants"
          :key="variant"
          :label="variant"
          :variant="variant"
          color="#7c3aed"
        />
      </div>
    `,
  }),
}

export const Slots: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Badge },
    template: `
      <Badge severity="secondary">
        <template #leading="{ severity }">
          <span class="size-2 rounded-full bg-current" :data-severity="severity" />
        </template>
        Personalizado
        <template #trailing>
          <span aria-hidden="true">×</span>
        </template>
      </Badge>
    `,
  }),
}

export const UiAsFunction: Story = {
  name: 'UI como función',
  args: {
    label: 'Condicional',
    severity: 'warning',
    ui: {
      root: (context: BadgeContext) => ({
        class: context.severity === 'warning' ? 'uppercase tracking-wide' : undefined,
        'data-variant': context.variant,
        'aria-label': `${context.label}: ${context.severity}`,
      }),
    },
  },
  parameters: {
    controls: { exclude: ['ui'] },
    docs: {
      description: {
        story: '`ui.root` recibe `BadgeContext` y devuelve atributos HTML para la raíz.',
      },
    },
  },
}
