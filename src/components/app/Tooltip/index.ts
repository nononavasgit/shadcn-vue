import type { Component, HTMLAttributes } from 'vue'

export { default as Tooltip } from './Tooltip.vue'

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'
export type TooltipAlign = 'start' | 'center' | 'end'

export type TooltipNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type TooltipContentUI = TooltipNodeUI & {
  forceMount?: boolean
}

export type TooltipArrowUI = TooltipNodeUI & {
  width?: number
  height?: number
}

export interface TooltipUI {
  trigger?: TooltipNodeUI
  content?: TooltipContentUI
  arrow?: TooltipArrowUI
}

export interface TooltipProps {
  open?: boolean
  defaultOpen?: boolean
  content?: string
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
  disableClosingTrigger?: boolean
  disabled?: boolean
  ignoreNonKeyboardFocus?: boolean
  side?: TooltipSide
  sideOffset?: number
  align?: TooltipAlign
  alignOffset?: number
  avoidCollisions?: boolean
  collisionPadding?: number | Partial<Record<TooltipSide, number>>
  arrowPadding?: number
  sticky?: 'partial' | 'always'
  hideWhenDetached?: boolean
  positionStrategy?: 'absolute' | 'fixed'
  updatePositionStrategy?: 'optimized' | 'always'
  forceMount?: boolean
  ariaLabel?: string
  ui?: TooltipUI
}

export interface TooltipEmits {
  'update:open': [value: boolean]
}

export interface TooltipSlotProps {
  open: boolean
}
