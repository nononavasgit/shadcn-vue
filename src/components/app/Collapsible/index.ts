import type { Component, HTMLAttributes } from 'vue'

export { default as Collapsible } from './Collapsible.vue'

export type CollapsibleNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type CollapsibleContentUI = CollapsibleNodeUI & {
  forceMount?: boolean
}

export interface CollapsibleUI {
  trigger?: CollapsibleNodeUI
  content?: CollapsibleContentUI
}

export interface CollapsibleProps {
  open?: boolean
  defaultOpen?: boolean
  disabled?: boolean
  unmountOnHide?: boolean
  forceMount?: boolean
  as?: string | Component
  asChild?: boolean
  ui?: CollapsibleUI
}

export interface CollapsibleEmits {
  'update:open': [value: boolean]
}

export interface CollapsibleSlotProps {
  open: boolean
}
