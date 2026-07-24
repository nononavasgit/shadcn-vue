import type { Component, HTMLAttributes } from 'vue'

export { default as HoverCard } from './HoverCard.vue'

export type HoverCardSide = 'top' | 'right' | 'bottom' | 'left'
export type HoverCardAlign = 'start' | 'center' | 'end'

export type HoverCardNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type HoverCardContentUI = HoverCardNodeUI & {
  forceMount?: boolean
}

export interface HoverCardUI {
  trigger?: HoverCardNodeUI
  content?: HoverCardContentUI
}

export interface HoverCardProps {
  open?: boolean
  defaultOpen?: boolean
  content?: string
  openDelay?: number
  closeDelay?: number
  enableTouch?: boolean
  side?: HoverCardSide
  sideOffset?: number
  align?: HoverCardAlign
  alignOffset?: number
  avoidCollisions?: boolean
  collisionPadding?: number | Partial<Record<HoverCardSide, number>>
  arrowPadding?: number
  sticky?: 'partial' | 'always'
  hideWhenDetached?: boolean
  positionStrategy?: 'absolute' | 'fixed'
  updatePositionStrategy?: 'optimized' | 'always'
  forceMount?: boolean
  ui?: HoverCardUI
}

export interface HoverCardEmits {
  'update:open': [value: boolean]
}

export interface HoverCardSlotProps {
  open: boolean
}
