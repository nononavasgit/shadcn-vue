import type {
  AlertDialogContentProps as RekaAlertDialogContentProps,
  AlertDialogEmits as RekaAlertDialogEmits,
  AlertDialogProps as RekaAlertDialogProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { NormalizeButtonProps } from '@/components/ui/Button'
import type { IconConfig } from '@/components/ui/Icon'

export { default as AlertDialog } from './AlertDialog.vue'

export type AlertDialogRootProps = Pick<RekaAlertDialogProps, 'unmountOnHide'>
export type AlertDialogContentProps = Pick<
  RekaAlertDialogContentProps,
  'forceMount' | 'disableOutsidePointerEvents'
>

// Fn
export type AlertDialogFn<T> = (context: AlertDialogContext) => T

// Props
export interface AlertDialogProps extends AlertDialogRootProps, AlertDialogContentProps {
  open?: boolean
  label?: string
  description?: string
  icon?: IconConfig
  actionButton?: NormalizeButtonProps
  cancelButton?: NormalizeButtonProps
  ui?: AlertDialogUI
}

// Expose
export interface AlertDialogExpose {
  /** Closes the alert dialog through the exposed component API or slot context. */
  close: () => void
}

// UI
export interface AlertDialogUI {
  trigger?: AlertDialogFn<HTMLAttributes>
  overlay?: AlertDialogFn<HTMLAttributes>
  content?: AlertDialogFn<HTMLAttributes>
  header?: AlertDialogFn<HTMLAttributes>
  label?: AlertDialogFn<HTMLAttributes>
  description?: AlertDialogFn<HTMLAttributes>
  body?: AlertDialogFn<HTMLAttributes>
  footer?: AlertDialogFn<HTMLAttributes>
}

// Context
export interface AlertDialogContext {
  ui: AlertDialogProps['ui']
  open: boolean
  close: () => void
}

export function createAlertDialogContext(
  props: Pick<AlertDialogProps, 'ui'>,
  open: AlertDialogProps['open'],
  close: () => void,
): AlertDialogContext {
  return {
    ui: props.ui,
    open: open ?? false,
    close,
  }
}

// Emits
export type AlertDialogEmits = RekaAlertDialogEmits & {
  action: [event: PointerEvent]
  cancel: [event: PointerEvent]
}

// Slots
export interface AlertDialogSlots {
  default?(props: AlertDialogContext): unknown
  content?(props: AlertDialogContext): unknown
  header?(props: AlertDialogContext): unknown
  label?(props: AlertDialogContext): unknown
  description?(props: AlertDialogContext): unknown
  footer?(props: AlertDialogContext): unknown
  action?(props: AlertDialogContext): unknown
  cancel?(props: AlertDialogContext): unknown
}
