import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { NormalizeButtonProps } from '@/components/app/Button'
import type { NormalizeIconProps, NormalizedIconProps } from '@/components/app/Icon'

export { default as Alert } from './Alert.vue'

export const alertVariants = cva('', {
  variants: {
    variant: {
      solid: 'border-transparent bg-(--alert-solid) text-(--alert-solid-foreground)',
      outline: 'border-(--alert-color)/40 bg-transparent text-(--alert-color)',
      plain: 'border-transparent bg-transparent text-(--alert-color)',
      subtle: 'border-(--alert-color)/20 bg-(--alert-color)/10 text-(--alert-color)',
      soft: 'border-transparent bg-(--alert-color)/10 text-(--alert-color)',
    },
    severity: {
      primary:
        '[--alert-color:var(--primary)] [--alert-solid:var(--primary)] [--alert-solid-foreground:var(--primary-foreground)]',
      secondary:
        '[--alert-color:var(--secondary-foreground)] [--alert-solid:var(--secondary)] [--alert-solid-foreground:var(--secondary-foreground)]',
      warning:
        '[--alert-color:var(--warning)] [--alert-solid:var(--warning)] [--alert-solid-foreground:var(--warning-foreground)]',
      success:
        '[--alert-color:var(--success)] [--alert-solid:var(--success)] [--alert-solid-foreground:var(--success-foreground)]',
      error:
        '[--alert-color:var(--error)] [--alert-solid:var(--error)] [--alert-solid-foreground:var(--error-foreground)]',
    },
    color: {
      true: '[--alert-solid:var(--alert-color)] [--alert-solid-foreground:var(--alert-color-foreground)]',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'soft',
    severity: 'primary',
    color: false,
  },
})

export type AlertVariants = VariantProps<typeof alertVariants>

export interface AlertUI {
  icon?: NormalizedIconProps
  label?: HTMLAttributes
  description?: HTMLAttributes
}

export interface AlertProps {
  label?: string
  description?: string
  icon?: NormalizeIconProps
  closeButton?: NormalizeButtonProps
  variant?: AlertVariants['variant']
  severity?: AlertVariants['severity']
  color?: string
  closable?: boolean
  decorative?: boolean
  ui?: AlertUI
}

export interface AlertEmits {
  close: []
}

export interface AlertSlotProps {
  close: () => void
}

export interface AlertSlots {
  icon?(props: AlertSlotProps): unknown
  label?(props: AlertSlotProps): unknown
  description?(props: AlertSlotProps): unknown
  close?(props: AlertSlotProps): unknown
}
