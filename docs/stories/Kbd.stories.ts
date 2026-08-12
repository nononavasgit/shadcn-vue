import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Kbd, KbdGroup, type KbdContext } from '@/components/ui/Kbd'
import { Icon } from '@/components/ui/Icon'

const meta = {
  title: 'Componentes/Kbd',
  component: Kbd,
  subcomponents: { KbdGroup },
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Representa una tecla o entrada de teclado. `KbdGroup` combina varias teclas en un atajo.',
      },
    },
  },
  argTypes: {
    KbdContext: {
      control: false,
      description: 'Contexto entregado a `ui.root` y al slot `default` de `Kbd`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: '{ label: string | undefined }' },
      },
    },
    KbdUI: {
      control: false,
      description: '`root` recibe `KbdContext` y devuelve atributos HTML.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: '{ root?: (context: KbdContext) => HTMLAttributes }' },
      },
    },
    KbdGroupContext: {
      control: false,
      description: 'Contexto vacío entregado por `KbdGroup`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: 'Record<string, never>' },
      },
    },
    KbdGroupUI: {
      control: false,
      description: '`root` recibe `KbdGroupContext` y devuelve atributos HTML.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: '{ root?: (context: KbdGroupContext) => HTMLAttributes }' },
      },
    },
    default: {
      name: 'default',
      control: false,
      description: 'Contenido de la tecla. Sustituye a `label`.',
      table: { category: 'Slots', readonly: true, type: { summary: 'slotProps: KbdContext' } },
    },
    label: {
      control: 'text',
      description: 'Texto de la tecla cuando no se proporciona el slot `default`.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    ui: {
      control: false,
      description: 'Personaliza la tecla mediante `root: (context: KbdContext) => HTMLAttributes`.',
      table: {
        category: 'Props',
        type: { summary: 'KbdUI' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: { label: 'Ctrl' },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const CommonKeys: Story = {
  name: 'Teclas comunes',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Kbd },
    template: `
      <div class="flex flex-wrap items-center gap-3">
        <Kbd v-for="key in ['Ctrl', 'Alt', 'Shift', 'Enter', 'Esc', '⌘', '⌥', '⇧']" :key="key" :label="key" />
      </div>
    `,
  }),
}

export const Group: Story = {
  name: 'Grupo',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Kbd, KbdGroup },
    template: `
      <div class="grid gap-4">
        <div class="flex items-center justify-between gap-8"><span>Buscar</span><KbdGroup><Kbd label="Ctrl" /><span>+</span><Kbd label="K" /></KbdGroup></div>
        <div class="flex items-center justify-between gap-8"><span>Guardar</span><KbdGroup><Kbd label="Ctrl" /><span>+</span><Kbd label="S" /></KbdGroup></div>
        <div class="flex items-center justify-between gap-8"><span>Deshacer</span><KbdGroup><Kbd label="Ctrl" /><span>+</span><Kbd label="Z" /></KbdGroup></div>
      </div>
    `,
  }),
}

export const WithIcon: Story = {
  name: 'Con icono',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Icon, Kbd },
    template: `<Kbd aria-label="Flecha izquierda"><Icon name="chevronLeft" /></Kbd>`,
  }),
}

export const UiAsFunction: Story = {
  name: 'UI como función',
  args: {
    label: 'Enter',
    ui: {
      root: (context: KbdContext) => ({
        class: context.label === 'Enter' ? 'min-w-12 text-primary' : undefined,
        'aria-label': `Tecla ${context.label}`,
        'data-key': context.label,
      }),
    },
  },
  parameters: {
    controls: { exclude: ['ui'] },
    docs: { description: { story: '`ui.root` recibe `KbdContext` y devuelve atributos HTML.' } },
  },
}
