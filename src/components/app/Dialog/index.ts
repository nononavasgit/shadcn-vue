import type { ButtonHTMLAttributes, Component, HTMLAttributes, SVGAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/app/Icon'

export { default as Dialog } from './Dialog.vue'

export type DialogNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type DialogIcon = IconName | (IconProps & SVGAttributes)
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
  container?: DialogContentUI
  header?: HTMLAttributes
  title?: DialogNodeUI
  icon?: SVGAttributes
  description?: DialogNodeUI
  content?: HTMLAttributes
  footer?: HTMLAttributes
  close?: HTMLAttributes & ButtonHTMLAttributes
}

export interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
  unmountOnHide?: boolean
  label?: string
  description?: string
  icon?: DialogIcon
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
  icon?: DialogIcon
}
