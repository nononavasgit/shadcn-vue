import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { Input, type InputContext } from '@/components/ui/Input'

const meta = {
  title: 'Componentes/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Campo de texto nativo con soporte para `v-model:value`. Los atributos HTML como `type`, `name`, `placeholder`, `disabled` y `required` se transmiten directamente al elemento `input`.',
      },
    },
  },
  decorators: [() => ({ template: '<div class="w-80"><story /></div>' })],
  argTypes: {
    InputValue: {
      control: false,
      description: 'Valor admitido por el campo.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: 'string' },
      },
    },
    InputContext: {
      control: false,
      description: 'Contexto entregado a `ui.root`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ value: InputValue }',
          detail: 'interface InputContext {\n  value: InputValue\n}',
        },
      },
    },
    InputUI: {
      control: false,
      description: '`root` recibe `InputContext` y devuelve atributos HTML para el input.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: '{ root?: (context: InputContext) => HTMLAttributes }' },
      },
    },
    updateValue: {
      name: 'update:value',
      control: false,
      description: 'Emitido para actualizar `v-model:value`.',
      table: { category: 'Events', type: { summary: '(value: InputValue) => void' } },
    },
    valueChange: {
      name: 'valueChange',
      control: false,
      description: 'Emitido cuando cambia el valor efectivo.',
      table: { category: 'Events', type: { summary: '(value: InputValue) => void' } },
    },
    value: {
      control: 'text',
      description: 'Valor controlado mediante `v-model:value`.',
      table: {
        category: 'Props',
        type: { summary: 'InputValue' },
        defaultValue: { summary: "''" },
      },
    },
    ui: {
      control: 'object',
      description:
        'Personaliza el input mediante `root: (context: InputContext) => HTMLAttributes`.',
      table: {
        category: 'Props',
        type: { summary: 'InputUI' },
        defaultValue: { summary: 'undefined' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
      description: 'Tipo nativo del input.',
      table: { category: 'HTML Attributes', type: { summary: 'string' } },
    },
    placeholder: {
      control: 'text',
      description: 'Texto de ayuda nativo cuando el campo está vacío.',
      table: { category: 'HTML Attributes', type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilita el input mediante el atributo HTML nativo.',
      table: { category: 'HTML Attributes', type: { summary: 'boolean' } },
    },
    required: {
      control: 'boolean',
      description: 'Marca el campo como obligatorio mediante validación HTML nativa.',
      table: { category: 'HTML Attributes', type: { summary: 'boolean' } },
    },
  },
  args: {
    value: '',
    type: 'text',
    placeholder: 'Escribe un valor…',
    disabled: false,
    required: false,
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    ui: {
      root: () => {
        return {}
      },
    },
  },
}

export const Types: Story = {
  name: 'Tipos nativos',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Input },
    template: `
      <div class="grid gap-3">
        <Input type="text" placeholder="Texto" />
        <Input type="email" placeholder="correo@ejemplo.com" />
        <Input type="password" placeholder="Contraseña" />
        <Input type="search" placeholder="Buscar…" />
      </div>
    `,
  }),
}

export const States: Story = {
  name: 'Estados',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Input },
    template: `
      <div class="grid gap-3">
        <Input value="Valor readonly" readonly />
        <Input placeholder="Normal" />
        <Input value="Valor definido" />
        <Input placeholder="Deshabilitado" disabled />
        <Input value="Valor no válido" aria-invalid="true" />
      </div>
    `,
  }),
}

export const Controlled: Story = {
  name: 'Controlado',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <div class="grid gap-3">
        <Input v-model:value="value" placeholder="Escribe algo…" />
        <p class="text-sm text-muted-foreground">Valor: {{ value || 'vacío' }}</p>
      </div>
    `,
  }),
}

export const UiAsFunction: Story = {
  name: 'UI como función',
  args: {
    value: 'Personalizado',
    ui: {
      root: (context: InputContext) => ({
        class: 'border-primary bg-primary/5',
        'data-empty': String(context.value.length === 0),
      }),
    },
  },
  parameters: {
    controls: { exclude: ['ui'] },
    docs: {
      description: { story: '`ui.root` recibe el valor efectivo y devuelve atributos del input.' },
    },
  },
}
