import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Announcer } from '@/components/ui/Announcer'
import { Button } from '@/components/ui/Button'

const politenessOptions = ['assertive', 'polite', 'off'] as const
const contextType = { summary: 'AnnouncerContext' }

const meta = {
  title: 'Componentes/Announcer',
  component: Announcer,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Publica mensajes para tecnologias de asistencia mediante una region viva e invisible.',
      },
    },
  },
  argTypes: {
    AnnouncerPoliteness: {
      control: false,
      description: 'Determina la urgencia con la que se anuncia un mensaje.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'assertive' | 'polite' | 'off'" },
      },
    },
    AnnouncerContext: {
      control: false,
      description: 'Contexto disponible para el slot `default`.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ props; message }',
          detail:
            'interface AnnouncerContext {\n  props: Required<AnnouncerProps>\n  message: string\n}',
        },
      },
    },
    default: {
      control: false,
      description: 'Sustituye el texto anunciado y recibe `AnnouncerContext` como slot props.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    atomic: {
      control: 'boolean',
      description: 'Indica si se debe anunciar el contenido completo de la region.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    message: {
      control: 'text',
      description: 'Mensaje que se publica en la region viva.',
      table: { category: 'Props', type: { summary: 'string' }, defaultValue: { summary: "''" } },
    },
    politeness: {
      control: 'inline-radio',
      options: politenessOptions,
      description: 'Nivel de urgencia utilizado por la region viva.',
      table: {
        category: 'Props',
        type: { summary: 'AnnouncerPoliteness' },
        defaultValue: { summary: 'polite' },
      },
    },
  },
  args: {
    atomic: true,
    message: '',
    politeness: 'polite',
  },
} satisfies Meta<typeof Announcer>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { Announcer, Button },
    setup: () => {
      const announce = (message: string) => {
        args.message = message
      }

      return { args, announce }
    },
    template: `
      <div class="grid w-96 gap-4">
        <Announcer v-bind="args" />
        <div class="rounded-lg border bg-card p-4 text-card-foreground">
          <p class="text-sm font-medium">Live announcer</p>
          <p class="mt-1 text-sm text-muted-foreground">
            {{ args.message || 'No hay ningun mensaje activo.' }}
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button
            label="Guardado"
            variant="outline"
            @click="announce('Los cambios se han guardado')"
          />
          <Button
            label="Error"
            severity="error"
            @click="announce('No se ha podido completar la operacion')"
          />
          <Button label="Limpiar" variant="plain" @click="announce('')" />
        </div>
      </div>
    `,
  }),
}
