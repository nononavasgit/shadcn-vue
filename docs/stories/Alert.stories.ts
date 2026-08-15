import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Alert } from '@/components/ui/Alert'
import { ICONS } from '@/components/ui/Icon/icons'

const variants = ['solid', 'outline', 'plain', 'subtle', 'soft'] as const
const severities = ['primary', 'secondary', 'warning', 'success', 'error'] as const
const iconNames = Object.keys(ICONS)

const meta = {
  title: 'Componentes/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      argTypes: { sort: 'none' },
      description: {
        component:
          'Comunica información relevante mediante una etiqueta, una descripción y un icono opcionales. Puede cerrarse y adaptar su semántica cuando es decorativo.',
      },
    },
  },
  decorators: [() => ({ template: '<div class="w-72"><story /></div>' })],
  argTypes: {
    AlertVariant: {
      control: false,
      description: 'Define el tratamiento visual del alert.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'" },
      },
    },
    AlertSeverity: {
      control: false,
      description: 'Define la intención semántica de color del alert.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: { summary: "'primary' | 'secondary' | 'warning' | 'success' | 'error'" },
      },
    },
    AlertContext: {
      control: false,
      description: 'Representa la apariencia y el comportamiento efectivo del alert.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ variant; severity; color; closable; decorative; close }',
          detail:
            'interface AlertContext {\n  variant: AlertVariant\n  severity: AlertSeverity\n  color: string | undefined\n  closable: boolean\n  decorative: boolean\n  close: () => void\n}',
        },
      },
    },
    AlertUI: {
      control: false,
      description: 'Define los atributos HTML de las partes internas personalizables del alert.',
      table: {
        category: 'Interfaces',
        readonly: true,
        type: {
          summary: '{ label; description; closeButtonContainer }',
          detail:
            'interface AlertUI {\n  label?: (context: AlertContext) => HTMLAttributes\n  description?: (context: AlertContext) => HTMLAttributes\n  closeButtonContainer?: (context: AlertContext) => HTMLAttributes\n}',
        },
      },
    },
    iconSlot: {
      name: 'icon',
      control: false,
      description: 'Personaliza el icono del alert.',
      table: { category: 'slots', readonly: true, type: { summary: 'AlertContext' } },
    },
    labelSlot: {
      name: 'label',
      control: false,
      description: 'Personaliza la etiqueta del alert.',
      table: { category: 'slots', readonly: true, type: { summary: 'AlertContext' } },
    },
    descriptionSlot: {
      name: 'description',
      control: false,
      description: 'Personaliza la descripción del alert.',
      table: { category: 'slots', readonly: true, type: { summary: 'AlertContext' } },
    },
    closeSlot: {
      name: 'close',
      control: false,
      description: 'Personaliza el control de cierre y permite usar `context.close()`.',
      table: { category: 'slots', readonly: true, type: { summary: 'AlertContext' } },
    },
    close: {
      control: false,
      description: 'Emitido cuando el alert se cierra.',
      table: { category: 'Events', type: { summary: '() => void' } },
    },
    label: {
      control: 'text',
      description: 'Etiqueta principal del alert.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    description: {
      control: 'text',
      description: 'Contenido descriptivo del alert.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    icon: {
      control: 'select',
      options: [undefined, ...iconNames],
      description: 'Icono mostrado al inicio. Admite un nombre o configuración de icono.',
      table: { category: 'Props', type: { summary: 'NormalizeIconProps' } },
    },
    closeButton: {
      control: 'object',
      description: 'Configura el botón de cierre predeterminado.',
      table: { category: 'Props', type: { summary: 'NormalizeButtonProps' } },
    },
    variant: {
      control: 'inline-radio',
      options: variants,
      description: 'Tratamiento visual del alert.',
      table: {
        category: 'Props',
        type: { summary: 'AlertVariant' },
        defaultValue: { summary: 'soft' },
      },
    },
    severity: {
      control: 'select',
      options: severities,
      description: 'Intención semántica de color.',
      table: {
        category: 'Props',
        type: { summary: 'AlertSeverity' },
        defaultValue: { summary: 'primary' },
      },
    },
    color: {
      control: 'color',
      description: 'Color CSS personalizado que sustituye a la severidad visual.',
      table: { category: 'Props', type: { summary: 'string' } },
    },
    closable: {
      control: 'boolean',
      description: 'Muestra un control para cerrar el alert.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    decorative: {
      control: 'boolean',
      description: 'Elimina la semántica de alerta cuando el contenido es decorativo.',
      table: {
        category: 'Props',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    ui: {
      control: 'object',
      description: 'Personaliza la raíz, etiqueta, descripción y contenedor de cierre.',
      table: { category: 'Props', type: { summary: 'AlertUI' } },
    },
  },
  args: {
    label: 'Cambios guardados',
    description: 'La configuración se ha actualizado correctamente.',
    icon: 'success',
    closeButton: undefined,
    variant: 'soft',
    severity: 'success',
    color: undefined,
    closable: true,
    decorative: false,
    ui: undefined,
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
