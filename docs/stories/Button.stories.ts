import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button, type ButtonContext } from '@/components/ui/Button'
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
      description: 'Contexto entregado a `ui.root` y a todos los slots.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary:
            '{ as; asChild; label; variant; severity; size; rounded; square; loading; color; icon; trailingIcon }',
          detail:
            "interface ButtonContext {\n  as: ButtonProps['as']\n  asChild: boolean | undefined\n  label: string | undefined\n  variant: ButtonVariant | undefined\n  severity: ButtonSeverity | undefined\n  size: ButtonSize | undefined\n  rounded: boolean | undefined\n  square: boolean | undefined\n  loading: boolean | undefined\n  color: string | undefined\n  icon: NormalizeIconProps | undefined\n  trailingIcon: NormalizeIconProps | undefined\n}",
        },
      },
    },
    ButtonUI: {
      control: false,
      description:
        '`root` es una función que recibe `ButtonContext` y devuelve atributos HTML para la raíz.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ root?: (context: ButtonContext) => HTMLAttributes }',
          detail: 'interface ButtonUI {\n  root?: (context: ButtonContext) => HTMLAttributes\n}',
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
    ui: {
      control: false,
      description:
        'Personaliza la raíz mediante `root: (context: ButtonContext) => HTMLAttributes`.',
      table: {
        category: 'Props',
        type: { summary: 'ButtonUI' },
        defaultValue: { summary: 'undefined' },
      },
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

export const Playground: Story = {}

export const Variants: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => ({
    components: { Button },
    setup: () => ({ variants, severities }),
    template: `
      <div class="grid gap-4">
        <div v-for="variant in variants" :key="variant" class="flex flex-wrap items-center gap-3">
          <code class="w-16 text-xs text-muted-foreground">{{ variant }}</code>
          <Button v-for="severity in severities" :key="severity" :label="severity" :variant="variant" :severity="severity" />
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    setup: () => ({ sizes }),
    template: `<div class="flex items-center gap-4"><Button v-for="size in sizes" :key="size" :label="size" :size="size" /></div>`,
  }),
}

export const Icons: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Button label="Guardar" icon="save" />
        <Button label="Continuar" trailing-icon="chevronRight" variant="outline" />
        <Button aria-label="Buscar" icon="search" square />
        <Button aria-label="Eliminar" icon="trash2" square rounded severity="error" />
      </div>
    `,
  }),
}

export const Loading: Story = {
  args: { label: 'Guardando', loading: true, icon: 'save' },
}

export const CustomColor: Story = {
  name: 'Color personalizado',
  args: { label: 'Personalizado', color: '#7c3aed', icon: 'check' },
}

export const Slots: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Button },
    template: `
      <Button variant="outline">
        <template #leading><span aria-hidden="true">★</span></template>
        Contenido personalizado
        <template #trailing><span aria-hidden="true">→</span></template>
      </Button>
    `,
  }),
}

export const UiAsFunction: Story = {
  name: 'UI como función',
  args: {
    label: 'Condicional',
    severity: 'success',
    ui: {
      root: (context: ButtonContext) => ({
        class: context.loading ? 'opacity-70' : 'tracking-wide',
        'data-variant': context.variant,
        'aria-label': `${context.label}: ${context.severity}`,
      }),
    },
  },
  parameters: {
    controls: { exclude: ['ui'] },
    docs: {
      description: {
        story: '`ui.root` recibe `ButtonContext` y devuelve atributos HTML para la raíz.',
      },
    },
  },
}
