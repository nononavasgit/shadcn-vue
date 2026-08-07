import type {
  AlertDialogContentEmits as RekaAlertDialogContentEmits,
  AlertDialogContentProps as RekaAlertDialogContentProps,
  AlertDialogEmits as RekaAlertDialogEmits,
  AlertDialogProps as RekaAlertDialogProps,
  AlertDialogTriggerProps as RekaAlertDialogTriggerProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { NormalizeButtonProps } from '@/components/ui/Button'
import type { NormalizeIconProps } from '@/components/ui/Icon'
import type { EmitsAsProps } from '@/types/emits'

export { default as AlertDialog } from './AlertDialog.vue'

export type AlertDialogRootProps = Pick<RekaAlertDialogProps, 'defaultOpen' | 'unmountOnHide'>
export type AlertDialogTriggerProps = Pick<RekaAlertDialogTriggerProps, 'as' | 'asChild'>

export type AlertDialogContentProps = Pick<
  RekaAlertDialogContentProps,
  'as' | 'asChild' | 'forceMount' | 'disableOutsidePointerEvents'
> &
  EmitsAsProps<RekaAlertDialogContentEmits>

// Fn
export type AlertDialogFn<T> = T | ((context: AlertDialogContext) => T)

export function normalizeAlertDialogTriggerProps(
  source: AlertDialogTriggerProps | null | undefined,
): AlertDialogTriggerProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeAlertDialogContentProps(
  source: AlertDialogContentProps | null | undefined,
): AlertDialogContentProps | undefined {
  if (!source) return undefined
  const {
    as,
    asChild,
    forceMount,
    disableOutsidePointerEvents,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
  } = source
  return {
    as,
    asChild,
    forceMount,
    disableOutsidePointerEvents,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
  }
}

// Props
export interface AlertDialogProps extends AlertDialogRootProps {
  open?: boolean
  label?: string
  description?: string
  icon?: NormalizeIconProps
  actionButton?: NormalizeButtonProps
  cancelButton?: NormalizeButtonProps
  trigger?: AlertDialogTriggerProps
  content?: AlertDialogContentProps
  ui?: AlertDialogUI
}

// UI
export interface AlertDialogUI {
  root?: AlertDialogFn<HTMLAttributes>
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
  props: Omit<AlertDialogProps, 'ui'>
  open: boolean
  close: () => void
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
