import type {
  AlertDialogContentEmits as RekaAlertDialogContentEmits,
  AlertDialogContentProps as RekaAlertDialogContentProps,
  AlertDialogEmits as RekaAlertDialogEmits,
  AlertDialogProps as RekaAlertDialogProps,
  AlertDialogTriggerProps as RekaAlertDialogTriggerProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { ButtonProps } from '@/components/ui/Button'
import type { IconName, IconProps } from '@/components/ui/Icon'

export { default as AlertDialog } from './AlertDialog.vue'

export type AlertDialogRootProps = Pick<RekaAlertDialogProps, 'defaultOpen' | 'unmountOnHide'>
export type AlertDialogTriggerProps = Pick<RekaAlertDialogTriggerProps, 'as' | 'asChild'>

export type AlertDialogContentEventProps = {
  [K in keyof RekaAlertDialogContentEmits as `on${Capitalize<string & K>}`]?: (
    ...args: RekaAlertDialogContentEmits[K]
  ) => void
}

export type AlertDialogContentProps = Pick<
  RekaAlertDialogContentProps,
  'as' | 'asChild' | 'forceMount' | 'disableOutsidePointerEvents'
> &
  AlertDialogContentEventProps

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
  icon?: IconName | IconProps
  actionButton?: ButtonProps
  cancelButton?: ButtonProps
  trigger?: AlertDialogTriggerProps
  content?: AlertDialogContentProps
  ui?: AlertDialogUI
}

// UI
export interface AlertDialogUI {
  root?: HTMLAttributes
  trigger?: HTMLAttributes
  overlay?: HTMLAttributes
  content?: HTMLAttributes
  header?: HTMLAttributes
  label?: HTMLAttributes
  icon?: HTMLAttributes
  description?: HTMLAttributes
  body?: HTMLAttributes
  footer?: HTMLAttributes
  action?: HTMLAttributes
  cancel?: HTMLAttributes
}

// Context
export interface AlertDialogContext {
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
