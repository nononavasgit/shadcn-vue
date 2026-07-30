import type { ButtonHTMLAttributes, Component, HTMLAttributes } from 'vue'
import type { NormalizeIconProps, NormalizedIconProps } from '@/components/ui/Icon'

export { default as Sheet } from './Sheet.vue'

export type SheetSide = 'top' | 'right' | 'bottom' | 'left'

export type SheetNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

// UI
export interface SheetUI {
  trigger?: SheetNodeUI
  content?: SheetNodeUI
  header?: HTMLAttributes
  label?: SheetNodeUI
  icon?: NormalizedIconProps
  description?: SheetNodeUI
  body?: HTMLAttributes
  footer?: HTMLAttributes
  close?: HTMLAttributes & ButtonHTMLAttributes
}

// Props
export interface SheetProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
  block?: boolean
  unmountOnHide?: boolean
  side?: SheetSide
  label?: string
  description?: string
  icon?: NormalizeIconProps
  showCloseButton?: boolean
  forceMount?: boolean
  disableOutsidePointerEvents?: boolean
  ui?: SheetUI
}

// Emits
export interface SheetEmits {
  'update:open': [value: boolean]
  openAutoFocus: [event: Event]
  closeAutoFocus: [event: Event]
  escapeKeyDown: [event: Event]
  pointerDownOutside: [event: Event]
  focusOutside: [event: Event]
  interactOutside: [event: Event]
}

// SlotProps
export interface SheetSlotProps {
  open: boolean
  close: () => void
}

// Slots
export interface SheetSlots {
  default?(props: SheetSlotProps): unknown
  content?(props: SheetSlotProps): unknown
  header?(props: SheetSlotProps): unknown
  label?(props: SheetSlotProps): unknown
  description?(props: SheetSlotProps): unknown
  footer?(props: SheetSlotProps): unknown
  close?(props: SheetSlotProps): unknown
  closeIcon?(props: SheetSlotProps): unknown
}
