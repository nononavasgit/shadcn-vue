import type { Component, HTMLAttributes } from 'vue'

export { default as Dialog } from './Dialog.vue'

export type DialogNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type DialogContentEvent = Event

export type DialogContentUI = DialogNodeUI & {
  forceMount?: boolean
  disableOutsidePointerEvents?: boolean
  onOpenAutoFocus?: (event: DialogContentEvent) => void
  onCloseAutoFocus?: (event: DialogContentEvent) => void
  onEscapeKeyDown?: (event: KeyboardEvent) => void
  onPointerDownOutside?: (event: DialogContentEvent) => void
  onFocusOutside?: (event: DialogContentEvent) => void
  onInteractOutside?: (event: DialogContentEvent) => void
}

export interface DialogUI {
  trigger?: DialogNodeUI
  content?: DialogContentUI
  header?: HTMLAttributes
  title?: DialogNodeUI
  description?: DialogNodeUI
  body?: HTMLAttributes
  footer?: HTMLAttributes
}

export interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
  unmountOnHide?: boolean
  label?: string
  description?: string
  scrollable?: boolean
  showCloseButton?: boolean
  closeLabel?: string
  forceMount?: boolean
  ui?: DialogUI
}

export interface DialogEmits {
  'update:open': [value: boolean]
}

export interface DialogSlotProps {
  open: boolean
  close: () => void
}
