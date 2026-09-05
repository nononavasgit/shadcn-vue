import type {
  ToastProviderProps as RekaToastProviderProps,
  ToastRootEmits as RekaToastRootEmits,
  ToastRootProps as RekaToastRootProps,
} from 'reka-ui'
import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { NormalizeButtonProps } from '@/components/ui/Button'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Toast } from './Toast.vue'

export type ToastProviderProps = Pick<
  RekaToastProviderProps,
  'disableSwipe' | 'swipeDirection' | 'swipeThreshold'
>

export type ToastRootProps = Pick<RekaToastRootProps, 'type' | 'duration'>

export type ToastFn<T> = (context: ToastContext) => T

export interface ToastProps extends ToastRootProps {
  variant?: ToastVariant
  severity?: ToastSeverity
  color?: string
  position?: ToastPosition
  open?: boolean
  label?: string
  description?: string
  icon?: IconConfig
  closeButton?: NormalizeButtonProps
  progress?: boolean
  closable?: boolean
  disableSwipe?: ToastProviderProps['disableSwipe']
  swipeDirection?: ToastProviderProps['swipeDirection']
  swipeThreshold?: ToastProviderProps['swipeThreshold']
  hotkey?: string[]
  labelHotkey?: string
  ui?: ToastUI
}

export interface ToastUI {
  root?: ToastFn<HTMLAttributes>
  iconContainer?: ToastFn<HTMLAttributes>
  content?: ToastFn<HTMLAttributes>
  label?: ToastFn<HTMLAttributes>
  description?: ToastFn<HTMLAttributes>
  close?: ToastFn<HTMLAttributes>
  progress?: ToastFn<HTMLAttributes>
  viewport?: ToastFn<HTMLAttributes>
}

export interface ToastContext {
  open: boolean
  close: () => void
}

export type ToastEmits = RekaToastRootEmits & {
  close: []
}

export interface ToastSlots {
  default?(props: ToastContext): unknown
  icon?(props: ToastContext): unknown
  label?(props: ToastContext): unknown
  description?(props: ToastContext): unknown
  close?(props: ToastContext): unknown
}

export const toastVariants = cva('', {
  variants: {
    variant: {
      solid: 'border-transparent bg-(--toast-solid) text-(--toast-solid-foreground)',
      outline: 'border-(--toast-color)/40 bg-transparent text-(--toast-color)',
      plain: 'border-transparent bg-transparent text-(--toast-color)',
      subtle: 'border-(--toast-color)/20 bg-(--toast-color)/10 text-(--toast-color)',
      soft: 'border-transparent bg-(--toast-color)/10 text-(--toast-color)',
    },
    severity: {
      primary:
        '[--toast-color:var(--primary)] [--toast-solid:var(--primary)] [--toast-solid-foreground:var(--primary-foreground)]',
      secondary:
        '[--toast-color:var(--secondary-foreground)] [--toast-solid:var(--secondary)] [--toast-solid-foreground:var(--secondary-foreground)]',
      success:
        '[--toast-color:var(--success)] [--toast-solid:var(--success)] [--toast-solid-foreground:var(--success-foreground)]',
      warning:
        '[--toast-color:var(--warning)] [--toast-solid:var(--warning)] [--toast-solid-foreground:var(--warning-foreground)]',
      error:
        '[--toast-color:var(--error)] [--toast-solid:var(--error)] [--toast-solid-foreground:var(--error-foreground)]',
    },
    color: {
      true: '[--toast-solid:var(--toast-color)] [--toast-solid-foreground:var(--toast-color-foreground)]',
      false: '',
    },
  },
  defaultVariants: { variant: 'soft', severity: 'primary', color: false },
})

export const toastViewportVariants = cva('', {
  variants: {
    position: {
      'top-left': 'top-0 left-0',
      'top-center': 'top-0 left-1/2 -translate-x-1/2',
      'top-right': 'top-0 right-0',
      'bottom-left': 'bottom-0 left-0',
      'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
      'bottom-right': 'bottom-0 right-0',
    },
  },
  defaultVariants: { position: 'bottom-right' },
})

export type ToastVariants = VariantProps<typeof toastVariants>
export type ToastViewportVariants = VariantProps<typeof toastViewportVariants>
export type ToastVariant = NonNullable<ToastVariants['variant']>
export type ToastSeverity = NonNullable<ToastVariants['severity']>
export type ToastPosition =
  'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
