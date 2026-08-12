import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Separator, type SeparatorContext } from '@/components/ui/Separator'

const meta = {
  title: 'Componentes/Separator',
  component: Separator,
  parameters: {
    layout: 'padded',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Separa visual o semánticamente grupos de contenido en orientación horizontal o vertical.',
      },
    },
  },
  argTypes: {
    SeparatorOrientation: {
      control: false,
      description: 'Orientaciones admitidas por el separador.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    SeparatorContext: {
      control: false,
      description: 'Contexto entregado a `ui.root` y al slot `default`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ orientation: SeparatorOrientation; decorative: boolean }',
          detail:
            'interface SeparatorContext {\n  orientation: SeparatorOrientation | undefined\n  decorative: boolean | undefined\n}',
        },
      },
    },
    SeparatorUI: {
      control: false,
      description: '`root` es una función que recibe `SeparatorContext` y devuelve atributos HTML.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ root?: (context: SeparatorContext) => HTMLAttributes }',
          detail:
            'interface SeparatorUI {\n  root?: (context: SeparatorContext) => HTMLAttributes\n}',
        },
      },
    },
    default: {
      name: 'default',
      control: false,
      description: 'Contenido opcional renderizado dentro del separador.',
      table: {
        category: 'Slots',
        readonly: true,
        type: { summary: 'slotProps: SeparatorContext' },
      },
    },
    as: {
      control: 'text',
      description: 'Elemento o componente usado como raíz.',
      table: { category: 'Props', defaultValue: { summary: 'div' } },
    },
    asChild: {
      control: 'boolean',
      description: 'Fusiona el separador con el elemento hijo mediante Reka UI.',
      table: { category: 'Props', defaultValue: { summary: 'false' } },
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Dirección del separador.',
      table: {
        category: 'Props',
        type: { summary: 'SeparatorOrientation' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    decorative: {
      control: 'boolean',
      description:
        'Si es `true`, el separador es únicamente visual. Si es `false`, expone semántica de separación a las tecnologías de asistencia.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    ui: {
      control: false,
      description:
        'Personaliza la raíz mediante `root: (context: SeparatorContext) => HTMLAttributes`.',
      table: {
        category: 'Props',
        type: { summary: 'SeparatorUI' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    as: 'div',
    asChild: false,
    orientation: 'horizontal',
    decorative: true,
  },
  render: (args) => ({
    components: { Separator },
    setup: () => ({ args }),
    template: `
      <div :class="args.orientation === 'vertical' ? 'flex h-24 items-center gap-4' : 'grid w-full gap-4'">
        <span>Contenido anterior</span>
        <Separator v-bind="args" />
        <span>Contenido posterior</span>
      </div>
    `,
  }),
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Horizontal: Story = {
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Separator },
    template: `
      <div class="grid w-full max-w-xl gap-4">
        <div>
          <h3 class="font-medium">Cuenta</h3>
          <p class="text-sm text-muted-foreground">Gestiona tus datos personales.</p>
        </div>
        <Separator />
        <div>
          <h3 class="font-medium">Preferencias</h3>
          <p class="text-sm text-muted-foreground">Configura el comportamiento de la aplicación.</p>
        </div>
      </div>
    `,
  }),
}

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  parameters: { controls: { exclude: ['orientation'] } },
  render: (args) => ({
    components: { Separator },
    setup: () => ({ args }),
    template: `
      <div class="flex h-10 items-center gap-4">
        <span>Blog</span>
        <Separator v-bind="args" />
        <span>Documentación</span>
        <Separator v-bind="args" />
        <span>Contacto</span>
      </div>
    `,
  }),
}

export const Semantic: Story = {
  name: 'Semántico',
  args: { decorative: false },
  parameters: {
    docs: {
      description: {
        story:
          'Usa `decorative="false"` cuando la separación también representa una estructura semántica.',
      },
    },
  },
}

export const WithContent: Story = {
  name: 'Con contenido',
  parameters: { controls: { disable: true } },
  render: () => ({
    components: { Separator },
    template: `
      <Separator class="flex h-auto items-center gap-3 bg-transparent before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
        <span class="text-xs font-medium text-muted-foreground uppercase">Sección</span>
      </Separator>
    `,
  }),
}

export const UiAsFunction: Story = {
  name: 'UI como función',
  args: {
    decorative: false,
    ui: {
      root: (context: SeparatorContext) => ({
        class: context.orientation === 'vertical' ? 'bg-primary' : 'bg-primary/50',
        'data-decorative': context.decorative,
        'aria-label': context.decorative ? undefined : 'Cambio de sección',
      }),
    },
  },
  parameters: {
    controls: { exclude: ['ui'] },
    docs: {
      description: {
        story: '`ui.root` recibe `SeparatorContext` y devuelve atributos HTML para la raíz.',
      },
    },
  },
}
