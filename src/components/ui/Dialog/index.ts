import type { Component, HTMLAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/ui/Icon'

export { default as Dialog } from './Dialog.vue'

export interface DialogTriggerProps {
  as?: string | Component
  asChild?: boolean
}

export interface DialogContentProps {
  as?: string | Component
  asChild?: boolean
  forceMount?: boolean
  disableOutsidePointerEvents?: boolean
}

export interface DialogCloseProps {
  as?: string | Component
  asChild?: boolean
}

export function normalizeDialogTriggerProps(
  source: DialogTriggerProps | null | undefined,
): DialogTriggerProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeDialogContentProps(
  source: DialogContentProps | null | undefined,
): DialogContentProps | undefined {
  if (!source) return undefined
  const { as, asChild, forceMount, disableOutsidePointerEvents } = source
  return { as, asChild, forceMount, disableOutsidePointerEvents }
}

export function normalizeDialogCloseProps(
  source: DialogCloseProps | null | undefined,
): DialogCloseProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export interface DialogUI {
  root?: HTMLAttributes
  trigger?: HTMLAttributes
  content?: HTMLAttributes
  header?: HTMLAttributes
  title?: HTMLAttributes
  icon?: HTMLAttributes
  description?: HTMLAttributes
  body?: HTMLAttributes
  footer?: HTMLAttributes
  close?: HTMLAttributes
}

export interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
  block?: boolean
  unmountOnHide?: boolean
  label?: string
  description?: string
  icon?: IconName | IconProps
  showCloseButton?: boolean
  trigger?: DialogTriggerProps
  content?: DialogContentProps
  close?: DialogCloseProps
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
