import type { Component, HTMLAttributes } from 'vue'
import type { NormalizedButtonProps, NormalizeButtonProps } from '@/components/app/Button'
import type { NormalizeIconProps, NormalizedIconProps } from '@/components/app/Icon'

export { default as AlertDialog } from './AlertDialog.vue'

export type AlertDialogNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

// UI
export interface AlertDialogUI {
  trigger?: AlertDialogNodeUI
  content?: AlertDialogNodeUI
  header?: HTMLAttributes
  label?: AlertDialogNodeUI
  icon?: NormalizedIconProps
  description?: AlertDialogNodeUI
  body?: HTMLAttributes
  footer?: HTMLAttributes
  action?: NormalizedButtonProps
  cancel?: NormalizedButtonProps
}

// Props
export interface AlertDialogProps {
  open?: boolean
  defaultOpen?: boolean
  unmountOnHide?: boolean
  label?: string
  description?: string
  icon?: NormalizeIconProps
  actionButton?: NormalizeButtonProps
  cancelButton?: NormalizeButtonProps
  forceMount?: boolean
  disableOutsidePointerEvents?: boolean
  ui?: AlertDialogUI
}

// Events
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

// SlotProps
export interface AlertDialogSlotProps {
  open: boolean
  close: () => void
}

// Slots
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
