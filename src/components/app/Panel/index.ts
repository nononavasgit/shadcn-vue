import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { NormalizeIconProps, NormalizedIconProps } from '@/components/app/Icon'

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
        outline: 'border-(--panel-border)/40',
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

export interface PanelUI {
  header?: HTMLAttributes
  icon?: NormalizedIconProps
  label?: HTMLAttributes
  arrows?: HTMLAttributes
  content?: HTMLAttributes
}

export interface PanelProps {
  open?: boolean
  variant?: PanelVariants['variant']
  severity?: PanelVariants['severity']
  color?: string
  label?: string
  icon?: NormalizeIconProps
  collapsible?: boolean
  ui?: PanelUI
}

export interface PanelEmits {
  'update:open': [value: boolean]
}

export interface PanelSlotProps {
  open: boolean
}

export interface PanelSlots {
  default?(): unknown
  label?(props: PanelSlotProps): unknown
  icon?(props: PanelSlotProps): unknown
  arrows?(props: PanelSlotProps): unknown
}
