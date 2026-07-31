import type { Component, HTMLAttributes } from 'vue'

export { default as Collapsible } from './Collapsible.vue'

export interface CollapsibleTriggerProps {
  as?: string | Component
  asChild?: boolean
}

export interface CollapsibleContentProps extends CollapsibleTriggerProps {
  forceMount?: boolean
}

export function normalizeCollapsibleTriggerProps(
  source: CollapsibleTriggerProps | null | undefined,
): CollapsibleTriggerProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeCollapsibleContentProps(
  source: CollapsibleContentProps | null | undefined,
): CollapsibleContentProps | undefined {
  if (!source) return undefined
  const { as, asChild, forceMount } = source
  return { as, asChild, forceMount }
}

export interface CollapsibleUI {
  root?: HTMLAttributes
  trigger?: HTMLAttributes
  content?: HTMLAttributes
}

export interface CollapsibleProps {
  open?: boolean
  disabled?: boolean
  unmountOnHide?: boolean
  as?: string | Component
  asChild?: boolean
  trigger?: CollapsibleTriggerProps
  content?: CollapsibleContentProps
  ui?: CollapsibleUI
}

export interface CollapsibleEmits {
  'update:open': [value: boolean]
}
export interface CollapsibleSlotProps {
  open: boolean
}
export interface CollapsibleSlots {
  default?(props: CollapsibleSlotProps): unknown
  content?(props: CollapsibleSlotProps): unknown
}
