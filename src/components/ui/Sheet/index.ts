import type { Component, HTMLAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/ui/Icon'

export { default as Sheet } from './Sheet.vue'

export type SheetSide = 'top' | 'right' | 'bottom' | 'left'

export interface SheetTriggerProps {
  as?: string | Component
  asChild?: boolean
}

export interface SheetContentProps {
  as?: string | Component
  asChild?: boolean
  forceMount?: boolean
  disableOutsidePointerEvents?: boolean
  side?: SheetSide
}

export interface SheetCloseProps {
  as?: string | Component
  asChild?: boolean
}

export function normalizeSheetTriggerProps(
  source: SheetTriggerProps | null | undefined,
): SheetTriggerProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeSheetContentProps(
  source: SheetContentProps | null | undefined,
): SheetContentProps | undefined {
  if (!source) return undefined
  const { as, asChild, forceMount, disableOutsidePointerEvents, side } = source
  return { as, asChild, forceMount, disableOutsidePointerEvents, side }
}

export function normalizeSheetCloseProps(
  source: SheetCloseProps | null | undefined,
): SheetCloseProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export interface SheetUI {
  root?: HTMLAttributes
  trigger?: HTMLAttributes
  content?: HTMLAttributes
  header?: HTMLAttributes
  label?: HTMLAttributes
  icon?: HTMLAttributes
  description?: HTMLAttributes
  body?: HTMLAttributes
  footer?: HTMLAttributes
  close?: HTMLAttributes
}

export interface SheetProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
  block?: boolean
  unmountOnHide?: boolean
  label?: string
  description?: string
  icon?: IconName | IconProps
  showCloseButton?: boolean
  trigger?: SheetTriggerProps
  content?: SheetContentProps
  close?: SheetCloseProps
  ui?: SheetUI
}

export interface SheetEmits {
  'update:open': [value: boolean]
  openAutoFocus: [event: Event]
  closeAutoFocus: [event: Event]
  escapeKeyDown: [event: Event]
  pointerDownOutside: [event: Event]
  focusOutside: [event: Event]
  interactOutside: [event: Event]
}

export interface SheetSlotProps {
  open: boolean
  close: () => void
}

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
