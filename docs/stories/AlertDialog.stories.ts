import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { AlertDialog } from '@/components/ui/AlertDialog'
import { Button } from '@/components/ui/Button'
import { ICONS } from '@/components/ui/Icon/icons'

const iconNames = Object.keys(ICONS)
const contextType = { summary: 'slotProps: AlertDialogContext' }

const meta = {
  title: 'Componentes/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Solicita confirmacion antes de ejecutar una accion importante o potencialmente destructiva.',
      },
    },
  },
  argTypes: {
    AlertDialogContext: {
      control: false,
      description: 'Contexto entregado a los resolvers `ui` y a todos los slots.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ ui; open; close }',
          detail:
            "interface AlertDialogContext {\n  ui: AlertDialogProps['ui']\n  open: boolean\n  close: () => void\n}",
        },
      },
    },
    AlertDialogUI: {
      control: false,
      description: 'Define los atributos HTML personalizables de las partes internas.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ trigger; overlay; content; header; label; description; body; footer }',
          detail:
            'interface AlertDialogUI {\n  trigger?: (context: AlertDialogContext) => HTMLAttributes\n  overlay?: (context: AlertDialogContext) => HTMLAttributes\n  content?: (context: AlertDialogContext) => HTMLAttributes\n  header?: (context: AlertDialogContext) => HTMLAttributes\n  label?: (context: AlertDialogContext) => HTMLAttributes\n  description?: (context: AlertDialogContext) => HTMLAttributes\n  body?: (context: AlertDialogContext) => HTMLAttributes\n  footer?: (context: AlertDialogContext) => HTMLAttributes\n}',
        },
      },
    },
    close: {
      control: false,
      description: 'Cierra el dialogo mediante la API expuesta de la instancia.',
      table: { category: 'Expose', readonly: true, type: { summary: '() => void' } },
    },
    default: {
      control: false,
      description: 'Elemento que abre el dialogo.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    content: {
      control: false,
      description: 'Contenido adicional situado entre la cabecera y las acciones.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    header: {
      control: false,
      description: 'Sustituye la cabecera completa.',
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
    footer: {
      control: false,
      description: 'Sustituye el pie completo.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    actionSlot: {
      name: 'action',
      control: false,
      description: 'Sustituye el boton de confirmacion.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    cancelSlot: {
      name: 'cancel',
      control: false,
      description: 'Sustituye el boton de cancelacion.',
      table: { category: 'Slots', readonly: true, type: contextType },
    },
    action: {
      control: false,
      description: 'Emitido al confirmar la accion.',
      table: { category: 'Events', type: { summary: '(event: PointerEvent) => void' } },
    },
    cancel: {
      control: false,
      description: 'Emitido al cancelar la accion.',
      table: { category: 'Events', type: { summary: '(event: PointerEvent) => void' } },
    },
    'update:open': {
      control: false,
      description: 'Emitido cuando cambia el estado de apertura.',
      table: { category: 'Events', type: { summary: '(open: boolean) => void' } },
    },
    open: {
      control: 'boolean',
      description: 'Estado de apertura controlado.',
      table: { category: 'Props', type: { summary: 'boolean' } },
    },
    unmountOnHide: {
      control: 'boolean',
      description: 'Desmonta el contenido cuando el dialogo esta cerrado.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    label: {
      control: 'text',
      description: 'Titulo principal del dialogo.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    description: {
      control: 'text',
      description: 'Explica las consecuencias de la accion.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    icon: {
      control: 'select',
      options: [undefined, ...iconNames],
      description: 'Icono mostrado junto al titulo.',
      table: { category: 'Props', type: { summary: 'NormalizeIconProps' } },
    },
    actionButton: {
      control: 'object',
      description: 'Configura el boton de confirmacion predeterminado.',
      table: { category: 'Props', type: { summary: 'NormalizeButtonProps' } },
    },
    cancelButton: {
      control: 'object',
      description: 'Configura el boton de cancelacion predeterminado.',
      table: { category: 'Props', type: { summary: 'NormalizeButtonProps' } },
    },
    forceMount: {
      control: 'boolean',
      description: 'Mantiene montado el contenido independientemente de su estado.',
      table: { category: 'Props', type: { summary: 'boolean' } },
    },
    disableOutsidePointerEvents: {
      control: 'boolean',
      description: 'Desactiva la interaccion con elementos externos mientras esta abierto.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    ui: {
      control: 'object',
      description: 'Personaliza las partes internas mediante resolvers.',
      table: { category: 'Props', type: { summary: 'AlertDialogUI' } },
    },
  },
  args: {
    open: undefined,
    unmountOnHide: true,
    label: 'Eliminar proyecto',
    description: 'Esta accion no se puede deshacer y eliminara todos sus datos.',
    icon: 'warning',
    actionButton: { label: 'Eliminar', severity: 'error' },
    cancelButton: { label: 'Cancelar' },
    forceMount: false,
    disableOutsidePointerEvents: true,
    ui: undefined,
  },
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => ({
    components: { AlertDialog, Button },
    setup: () => ({ args }),
    template: `
      <AlertDialog v-bind="args">
        <Button label="Eliminar proyecto" severity="error" variant="outline" />
      </AlertDialog>
    `,
  }),
}
