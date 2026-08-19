import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { CollapsibleEmits } from '@/components/ui/Collapsible'
import type { IconConfig } from '@/components/ui/Icon'

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

// Props
export interface PanelProps {
  open?: boolean
  variant?: PanelVariants['variant']
  severity?: PanelVariants['severity']
  color?: string
  label?: string
  icon?: IconConfig
  collapsible?: boolean
  ui?: PanelUI
}

// Fn
export type PanelFn<T> = (context: PanelContext) => T

// UI
export interface PanelUI {
  root?: PanelFn<HTMLAttributes>
  header?: PanelFn<HTMLAttributes>
  label?: PanelFn<HTMLAttributes>
  arrows?: PanelFn<HTMLAttributes>
  content?: PanelFn<HTMLAttributes>
}

// Context
export interface PanelContext {
  props: Omit<PanelProps, 'ui' | 'icon'>
  open: boolean
}

// Emits
export type PanelEmits = CollapsibleEmits

// Slots
export interface PanelSlots {
  default?(props: PanelContext): unknown
  label?(props: PanelContext): unknown
  icon?(props: PanelContext): unknown
  arrows?(props: PanelContext): unknown
}
