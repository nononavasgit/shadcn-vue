import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { NormalizeButtonProps } from '@/components/ui/Button'
import type { NormalizeIconProps } from '@/components/ui/Icon'

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

// Fn
export type AlertFn<T> = T | ((context: AlertContext) => T)

// Props
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

// UI
export interface AlertUI {
  root?: AlertFn<HTMLAttributes>
  label?: AlertFn<HTMLAttributes>
  description?: AlertFn<HTMLAttributes>
  closeButtonContainer?: AlertFn<HTMLAttributes>
}

// Context
export interface AlertContext {
  label: AlertProps['label']
  description: AlertProps['description']
  icon: AlertProps['icon']
  closeButton: AlertProps['closeButton']
  variant: AlertProps['variant']
  severity: AlertProps['severity']
  color: AlertProps['color']
  closable: AlertProps['closable']
  decorative: AlertProps['decorative']
  close: () => void
}

export function createAlertContext(props: AlertProps, close: () => void): AlertContext {
  const { label, description, icon, closeButton, variant, severity, color, closable, decorative } =
    props

  return {
    label,
    description,
    icon,
    closeButton,
    variant,
    severity,
    color,
    closable,
    decorative,
    close,
  }
}

// Emits
export interface AlertEmits {
  close: []
}

// Slots
export interface AlertSlots {
  icon?(props: AlertContext): unknown
  label?(props: AlertContext): unknown
  description?(props: AlertContext): unknown
  close?(props: AlertContext): unknown
}
