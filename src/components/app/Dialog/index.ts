import type { ButtonHTMLAttributes, Component, HTMLAttributes } from 'vue'
import type { NormalizeIconProps, NormalizedIconProps } from '@/components/app/Icon'

export { default as Dialog } from './Dialog.vue'

export type DialogNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export interface DialogUI {
  trigger?: DialogNodeUI
  content?: DialogNodeUI
  header?: HTMLAttributes
  title?: DialogNodeUI
  icon?: NormalizedIconProps
  description?: DialogNodeUI
  body?: HTMLAttributes
  footer?: HTMLAttributes
  close?: HTMLAttributes & ButtonHTMLAttributes
}

export interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
  block?: boolean
  unmountOnHide?: boolean
  label?: string
  description?: string
  icon?: NormalizeIconProps
  showCloseButton?: boolean
  forceMount?: boolean
  disableOutsidePointerEvents?: boolean
  ui?: DialogUI
}

export interface DialogEmits {
  'update:open': [value: boolean]
  openAutoFocus: [event: Event]
  closeAutoFocus: [event: Event]
  escapeKeyDown: [event: Event]
  pointerDownOutside: [event: Event]
  focusOutside: [event: Event]
  interactOutside: [event: Event]
}

export interface DialogSlotProps {
  open: boolean
  close: () => void
}

export interface DialogSlots {
  default?(props: DialogSlotProps): unknown
  content?(props: DialogSlotProps): unknown
  header?(props: DialogSlotProps): unknown
  title?(props: DialogSlotProps): unknown
  description?(props: DialogSlotProps): unknown
  footer?(props: DialogSlotProps): unknown
  close?(props: DialogSlotProps): unknown
  closeIcon?(props: DialogSlotProps): unknown
}
