import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes, SVGAttributes } from 'vue'
import type { ButtonProps } from '@/components/app/Button'
import type { IconoNombre, IconProps } from '@/components/app/Icon'

export { default as Panel } from './Panel.vue'

export const panelVariants = cva(
  'overflow-hidden rounded-[4px] border bg-card shadow-[0_1px_1px_rgb(0_0_0/0.05)]',
  {
    variants: {
      severity: {
        primary: '[--panel-border:var(--primary)]',
        secondary: '[--panel-border:var(--secondary-foreground)]',
        success: '[--panel-border:var(--success)]',
        error: '[--panel-border:var(--error)]',
        warning: '[--panel-border:var(--warning)]',
      },
      variant: {
        solid: 'border-(--panel-border)',
        outlined: 'border-(--panel-border)/40',
        plain: 'border-(--panel-border)/20',
        subtle: 'border-(--panel-border)/20',
        soft: 'border-(--panel-border)/20',
      },
      color: {
        true: '[--panel-border:var(--panel-color)]',
        false: '',
      },
    },
    defaultVariants: {
      severity: 'primary',
      variant: 'solid',
      color: false,
    },
  },
)

export type PanelVariants = VariantProps<typeof panelVariants>
export type PanelIconProps = Omit<IconProps, 'name'> & SVGAttributes

export type PanelHeaderUI = Omit<HTMLAttributes, 'onClick'> & {
  onClick?: (event: MouseEvent) => void
}

export interface PanelUI {
  root?: HTMLAttributes
  header?: PanelHeaderUI
  icon?: SVGAttributes
  label?: HTMLAttributes
  arrows?: HTMLAttributes
  content?: HTMLAttributes
}

export interface PanelProps {
  open?: boolean
  defaultOpen?: boolean
  variant?: ButtonProps['variant']
  severity?: ButtonProps['severity']
  color?: string
  label?: string
  nameIcon?: IconoNombre
  iconProps?: PanelIconProps
  expandable?: boolean
  ui?: PanelUI
}

export interface PanelEmits {
  'update:open': [value: boolean]
}

export interface PanelSlotProps {
  open: boolean
}
