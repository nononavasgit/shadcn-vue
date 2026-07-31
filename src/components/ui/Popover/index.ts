import type { Component, HTMLAttributes } from 'vue'

export { default as Popover } from './Popover.vue'

export const SIDES = {
  top: 'top',
  right: 'right',
  bottom: 'bottom',
  left: 'left',
} as const

export const ALIGNS = {
  start: 'start',
  center: 'center',
  end: 'end',
} as const

export const STICKY_VALUES = {
  partial: 'partial',
  always: 'always',
} as const

export const POSITION_STRATEGIES = {
  absolute: 'absolute',
  fixed: 'fixed',
} as const

export const UPDATE_POSITION_STRATEGIES = {
  optimized: 'optimized',
  always: 'always',
} as const

export type PopoverSide = keyof typeof SIDES
export type PopoverAlign = keyof typeof ALIGNS
export type PopoverSticky = keyof typeof STICKY_VALUES
export type PopoverPositionStrategy = keyof typeof POSITION_STRATEGIES
export type PopoverUpdatePositionStrategy = keyof typeof UPDATE_POSITION_STRATEGIES

export interface PopoverTriggerProps {
  as?: string | Component
  asChild?: boolean
}

export interface PopoverContentProps {
  as?: string | Component
  asChild?: boolean
  forceMount?: boolean
  side?: PopoverSide
  sideOffset?: number
  sideFlip?: boolean
  align?: PopoverAlign
  alignOffset?: number
  alignFlip?: boolean
  avoidCollisions?: boolean
  collisionPadding?: number | Partial<Record<PopoverSide, number>>
  sticky?: PopoverSticky
  hideWhenDetached?: boolean
  positionStrategy?: PopoverPositionStrategy
  updatePositionStrategy?: PopoverUpdatePositionStrategy
}

export interface PopoverUI {
  root?: HTMLAttributes
  trigger?: HTMLAttributes
  content?: HTMLAttributes
}

export interface PopoverProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
  trigger?: PopoverTriggerProps
  content?: PopoverContentProps
  ui?: PopoverUI
}

export interface PopoverEmits {
  'update:open': [value: boolean]
}

export interface PopoverSlotProps {
  open: boolean
  close: () => void
}

export interface PopoverSlots {
  default?(props: PopoverSlotProps): unknown
  content?(props: PopoverSlotProps): unknown
}

export function mapCollisionPadding(
  padding: number | Partial<Record<PopoverSide, number>> | undefined,
) {
  if (padding === undefined || typeof padding === 'number') return padding

  return Object.fromEntries(
    Object.entries(padding).map(([side, value]) => [SIDES[side as PopoverSide], value]),
  ) as Partial<Record<(typeof SIDES)[PopoverSide], number>>
}
