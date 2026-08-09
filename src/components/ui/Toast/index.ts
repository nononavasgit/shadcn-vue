import type {
  ToastProviderProps as RekaToastProviderProps,
  ToastRootEmits as RekaToastRootEmits,
  ToastRootProps as RekaToastRootProps,
  ToastViewportProps as RekaToastViewportProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { NormalizeButtonProps } from '@/components/ui/Button'
import type { NormalizeIconProps } from '@/components/ui/Icon'

export { default as Toast } from './Toast.vue'

export type ToastProviderProps = Pick<
  RekaToastProviderProps,
  'disableSwipe' | 'swipeDirection' | 'swipeThreshold'
>

export type ToastRootProps = Pick<
  RekaToastRootProps,
  'as' | 'asChild' | 'type' | 'duration' | 'defaultOpen' | 'forceMount'
>

export type ToastViewportProps = Pick<RekaToastViewportProps, 'as' | 'asChild' | 'hotkey' | 'label'>

export type ToastFn<T> = T | ((context: ToastContext) => T)

export interface ToastProps extends ToastRootProps {
  open?: boolean
  label?: string
  description?: string
  icon?: NormalizeIconProps
  actionButton?: NormalizeButtonProps
  closeButton?: NormalizeButtonProps
  closable?: boolean
  disableSwipe?: ToastProviderProps['disableSwipe']
  swipeDirection?: ToastProviderProps['swipeDirection']
  swipeThreshold?: ToastProviderProps['swipeThreshold']
  viewport?: ToastViewportProps
  ui?: ToastUI
}

export interface ToastUI {
  root?: ToastFn<HTMLAttributes>
  iconContainer?: ToastFn<HTMLAttributes>
  content?: ToastFn<HTMLAttributes>
  label?: ToastFn<HTMLAttributes>
  description?: ToastFn<HTMLAttributes>
  action?: ToastFn<HTMLAttributes>
  close?: ToastFn<HTMLAttributes>
  viewport?: ToastFn<HTMLAttributes>
}

export interface ToastContext {
  props: Omit<ToastProps, 'ui'>
  open: boolean
  close: () => void
}

export type ToastEmits = RekaToastRootEmits & {
  action: [event: PointerEvent]
  close: []
}

export interface ToastSlots {
  default?(props: ToastContext): unknown
  icon?(props: ToastContext): unknown
  label?(props: ToastContext): unknown
  description?(props: ToastContext): unknown
  action?(props: ToastContext): unknown
  close?(props: ToastContext): unknown
  viewport?(props: ToastContext): unknown
}
