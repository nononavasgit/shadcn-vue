import type { Component, HTMLAttributes } from 'vue'

export { default as Popover } from './Popover.vue'

export type PopoverSide = 'top' | 'right' | 'bottom' | 'left'
export type PopoverAlign = 'start' | 'center' | 'end'

export type PopoverNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type PopoverContentUI = PopoverNodeUI & {
  forceMount?: boolean
}

export interface PopoverUI {
  trigger?: PopoverNodeUI
  content?: PopoverContentUI
}

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
  side?: PopoverSide
  sideOffset?: number
  sideFlip?: boolean
  align?: PopoverAlign
  alignOffset?: number
  alignFlip?: boolean
  avoidCollisions?: boolean
  collisionPadding?: number | Partial<Record<PopoverSide, number>>
  sticky?: 'partial' | 'always'
  hideWhenDetached?: boolean
  positionStrategy?: 'absolute' | 'fixed'
  updatePositionStrategy?: 'optimized' | 'always'
  forceMount?: boolean
  ui?: PopoverUI
}

export interface PopoverEmits {
  'update:open': [value: boolean]
}

export interface PopoverSlotProps {
  open: boolean
  close: () => void
}
