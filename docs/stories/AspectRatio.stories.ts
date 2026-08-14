import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { AspectRatio } from '@/components/ui/AspectRatio'

const contextType = { summary: 'AspectRatioContext' }

const meta = {
  title: 'Componentes/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Mantiene una proporción constante para contenido adaptable como imágenes, vídeos o paneles.',
      },
    },
  },
  decorators: [() => ({ template: '<div class="w-96"><story /></div>' })],
  argTypes: {
    AspectRatioRatio: {
      control: false,
      description: 'Relación entre el ancho y el alto del contenido.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: 'number' },
      },
    },
    AspectRatioContext: {
      control: false,
      description: 'Representa la proporción efectiva del componente.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ ratio }',
          detail: 'interface AspectRatioContext {\n  ratio: AspectRatioRatio\n}',
        },
      },
    },
    default: {
      control: false,
      description: 'Contenido que mantiene la proporción configurada.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    ratio: {
      control: { type: 'number', min: 0.1, step: 0.1 },
      description: 'Relación entre el ancho y el alto.',
      table: {
        category: 'Props',
        type: { summary: 'AspectRatioRatio' },
        defaultValue: { summary: '1' },
      },
    },
  },
  args: { ratio: 16 / 9 },
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { AspectRatio },
    setup: () => ({ args }),
    template: `
      <AspectRatio v-bind="args">
        <div class="flex size-full items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
          {{ args.ratio }}:1
        </div>
      </AspectRatio>
    `,
  }),
}
