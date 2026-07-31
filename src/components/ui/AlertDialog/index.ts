import type { Component, HTMLAttributes } from 'vue'
import type { ButtonProps } from '@/components/ui/Button'
import type { IconName, IconProps } from '@/components/ui/Icon'

export { default as AlertDialog } from './AlertDialog.vue'

export interface AlertDialogTriggerProps {
  as?: string | Component
  asChild?: boolean
}

export interface AlertDialogContentProps {
  as?: string | Component
  asChild?: boolean
  forceMount?: boolean
  disableOutsidePointerEvents?: boolean
}

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
  const { as, asChild, forceMount, disableOutsidePointerEvents } = source
  return { as, asChild, forceMount, disableOutsidePointerEvents }
}

export interface AlertDialogUI {
  root?: HTMLAttributes
  trigger?: HTMLAttributes
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

export interface AlertDialogProps {
  open?: boolean
  defaultOpen?: boolean
  unmountOnHide?: boolean
  label?: string
  description?: string
  icon?: IconName | IconProps
  actionButton?: ButtonProps
  cancelButton?: ButtonProps
  trigger?: AlertDialogTriggerProps
  content?: AlertDialogContentProps
  ui?: AlertDialogUI
}

export interface AlertDialogEmits {
  'update:open': [value: boolean]
  action: [event: PointerEvent]
  cancel: [event: PointerEvent]
  openAutoFocus: [event: Event]
  closeAutoFocus: [event: Event]
  escapeKeyDown: [event: Event]
  pointerDownOutside: [event: Event]
  focusOutside: [event: Event]
  interactOutside: [event: Event]
}

export interface AlertDialogSlotProps {
  open: boolean
  close: () => void
}

export interface AlertDialogSlots {
  default?(props: AlertDialogSlotProps): unknown
  content?(props: AlertDialogSlotProps): unknown
  header?(props: AlertDialogSlotProps): unknown
  label?(props: AlertDialogSlotProps): unknown
  description?(props: AlertDialogSlotProps): unknown
  footer?(props: AlertDialogSlotProps): unknown
  action?(props: AlertDialogSlotProps): unknown
  cancel?(props: AlertDialogSlotProps): unknown
}
