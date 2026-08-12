import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { Toggle, type ToggleContext } from '@/components/ui/Toggle'
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

export const States: Story = {
  name: 'Estados',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Toggle },
    template: `
      <div class="flex items-center gap-3">
        <Toggle label="Desactivado" :value="false" />
        <Toggle label="Activado" :value="true" />
        <Toggle label="Deshabilitado" disabled />
        <Toggle label="Activo deshabilitado" :value="true" disabled />
      </div>
    `,
  }),
}

export const Variants: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => ({
    components: { Toggle },
    setup: () => ({ severities, variants }),
    template: `
      <div class="grid gap-4">
        <div v-for="variant in variants" :key="variant" class="flex flex-wrap items-center gap-3">
          <code class="w-14 text-xs text-muted-foreground">{{ variant }}</code>
          <Toggle v-for="severity in severities" :key="severity" :label="severity" :variant="variant" :severity="severity" :value="true" />
        </div>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Toggle },
    setup: () => ({ sizes }),
    template: `<div class="flex items-center gap-4"><Toggle v-for="size in sizes" :key="size" :label="size" :size="size" /></div>`,
  }),
}

export const Icons: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Toggle },
    template: `
      <div class="flex items-center gap-3">
        <Toggle aria-label="Favorito" icon="success" />
        <Toggle label="Completado" icon="check" severity="success" />
        <Toggle label="Opciones" trailing-icon="chevronDown" variant="outline" />
      </div>
    `,
  }),
}

export const Controlled: Story = {
  name: 'Controlado',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Toggle },
    setup() {
      const enabled = ref(false)
      return { enabled }
    },
    template: `
      <div class="grid justify-items-center gap-3">
        <Toggle v-model:value="enabled" label="Notificaciones" icon="info" />
        <span class="text-sm text-muted-foreground">{{ enabled ? 'Activadas' : 'Desactivadas' }}</span>
      </div>
    `,
  }),
}

export const CustomColor: Story = {
  name: 'Color personalizado',
  args: { label: 'Personalizado', value: true, color: '#7c3aed', icon: 'check' },
}

export const Slots: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Toggle },
    template: `
      <Toggle variant="outline">
        <template #leading><span aria-hidden="true">★</span></template>
        <template #default="{ pressed }">{{ pressed ? 'Seleccionado' : 'Seleccionar' }}</template>
        <template #trailing="{ state }"><small>{{ state }}</small></template>
      </Toggle>
    `,
  }),
}

export const UiAsFunction: Story = {
  name: 'UI como función',
  args: {
    label: 'Condicional',
    value: true,
    ui: {
      root: (context: ToggleContext) => ({
        class: context.pressed ? 'uppercase tracking-wide' : undefined,
        'data-value': context.value,
        'aria-label': `${context.label}: ${context.state}`,
      }),
    },
  },
  parameters: {
    controls: { exclude: ['ui'] },
    docs: {
      description: {
        story: '`ui.root` recibe `ToggleContext`, incluido `value`, `state` y `pressed`.',
      },
    },
  },
}
