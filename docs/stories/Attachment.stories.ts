import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Attachment } from '@/components/ui/Attachment'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ICONS } from '@/components/ui/Icon/icons'

const orientations = ['horizontal', 'vertical'] as const
const sizes = ['md', 'sm', 'xs'] as const
const states = ['idle', 'uploading', 'processing', 'error', 'done'] as const
const mediaVariants = ['icon', 'image'] as const
const iconNames = Object.keys(ICONS)
const contextType = { summary: 'AttachmentContext' }

const meta = {
  title: 'Componentes/Attachment',
  component: Attachment,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Muestra un archivo o recurso con metadatos, contenido multimedia y acciones opcionales.',
      },
    },
  },
  decorators: [() => ({ template: '<div class="w-full max-w-xl"><story /></div>' })],
  argTypes: {
    AttachmentLabel: {
      control: false,
      description: 'Texto utilizado como nombre o título del archivo.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: 'string' },
      },
    },
    AttachmentDescription: {
      control: false,
      description: 'Texto secundario mostrado junto al archivo.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: 'string' },
      },
    },
    AttachmentOrientation: {
      control: false,
      description: 'Orientaciones admitidas por el Attachment.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'horizontal' | 'vertical'" },
      },
    },
    AttachmentSize: {
      control: false,
      description: 'Tamaños admitidos por el Attachment.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'md' | 'sm' | 'xs'" },
      },
    },
    AttachmentState: {
      control: false,
      description: 'Estados admitidos por el Attachment.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'idle' | 'uploading' | 'processing' | 'error' | 'done'" },
      },
    },
    AttachmentMediaVariant: {
      control: false,
      description: 'Variantes multimedia admitidas.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'icon' | 'image'" },
      },
    },
    AttachmentContext: {
      control: false,
      description: 'Contexto entregado a los resolvers `ui` y a todos los slots.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ label; description; icon; orientation; size; state; mediaVariant }',
          detail:
            'interface AttachmentContext {\n  label: AttachmentLabel | undefined\n  description: AttachmentDescription | undefined\n  icon: NormalizeIconProps | undefined\n  orientation: AttachmentOrientation\n  size: AttachmentSize\n  state: AttachmentState\n  mediaVariant: AttachmentMediaVariant\n}',
        },
      },
    },
    AttachmentUI: {
      control: false,
      description: 'Define los atributos HTML personalizables de sus partes internas.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ media; content; label; description; actions; trigger }',
          detail:
            'interface AttachmentUI {\n  media?: (context: AttachmentContext) => HTMLAttributes\n  content?: (context: AttachmentContext) => HTMLAttributes\n  label?: (context: AttachmentContext) => HTMLAttributes\n  description?: (context: AttachmentContext) => HTMLAttributes\n  actions?: (context: AttachmentContext) => HTMLAttributes\n  trigger?: (context: AttachmentContext) => HTMLAttributes\n}',
        },
      },
    },
    media: {
      control: false,
      description: 'Contenido multimedia mostrado al inicio cuando `mediaVariant` es `image`.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    labelSlot: {
      name: 'label',
      control: false,
      description: 'Sustituye el contenido de la prop `label`.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    descriptionSlot: {
      name: 'description',
      control: false,
      description: 'Sustituye el contenido de la prop `description`.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    actions: {
      control: false,
      description: 'Acciones alineadas junto al contenido.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    trigger: {
      control: false,
      description: 'Control que convierte todo el Attachment en una superficie accionable.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    label: {
      control: 'text',
      description: 'Nombre o título del archivo.',
      table: { category: 'Props', type: { summary: 'AttachmentLabel' } },
    },
    description: {
      control: 'text',
      description: 'Información secundaria del archivo.',
      table: { category: 'Props', type: { summary: 'AttachmentDescription' } },
    },
    icon: {
      control: 'select',
      options: [undefined, ...iconNames],
      description:
        'Icono mostrado cuando `mediaVariant` es `icon`. Su tamaño coincide con el del Attachment.',
      table: { category: 'Props', type: { summary: 'NormalizeIconProps' } },
    },
    orientation: {
      control: 'inline-radio',
      options: orientations,
      description: 'Distribución horizontal o vertical.',
      table: {
        category: 'Props',
        type: { summary: 'AttachmentOrientation' },
        defaultValue: { summary: 'horizontal' },
      },
    },
    size: {
      control: 'inline-radio',
      options: sizes,
      description: 'Tamaño visual del Attachment.',
      table: {
        category: 'Props',
        type: { summary: 'AttachmentSize' },
        defaultValue: { summary: 'md' },
      },
    },
    state: {
      control: 'select',
      options: states,
      description: 'Estado visual del archivo.',
      table: {
        category: 'Props',
        type: { summary: 'AttachmentState' },
        defaultValue: { summary: 'idle' },
      },
    },
    mediaVariant: {
      control: 'inline-radio',
      options: mediaVariants,
      description: 'Tratamiento del área multimedia.',
      table: {
        category: 'Props',
        type: { summary: 'AttachmentMediaVariant' },
        defaultValue: { summary: 'icon' },
      },
    },
    ui: {
      control: 'object',
      description: 'Personaliza las partes internas mediante resolvers.',
      table: { category: 'Props', type: { summary: 'AttachmentUI' } },
    },
  },
  args: {
    label: 'Informe trimestral.pdf',
    description: '2.4 MB · PDF',
    icon: 'fileText',
    orientation: 'horizontal',
    size: 'md',
    state: 'idle',
    mediaVariant: 'icon',
    ui: undefined,
  },
} satisfies Meta<typeof Attachment>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { Attachment, Button, Icon },
    setup: () => ({ args }),
    template: `
      <Attachment v-bind="args">
        <template #media v-if="args.mediaVariant === 'image'">
          <Icon :name="args.mediaVariant === 'image' ? 'image' : 'fileText'" size="lg" />
        </template>
      </Attachment>
    `,
  }),
}
