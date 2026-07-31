import type { Component, HTMLAttributes } from 'vue'

export { default as Tooltip } from './Tooltip.vue'

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

export type TooltipSide = keyof typeof SIDES
export type TooltipAlign = keyof typeof ALIGNS
export type TooltipSticky = keyof typeof STICKY_VALUES
export type TooltipPositionStrategy = keyof typeof POSITION_STRATEGIES
export type TooltipUpdatePositionStrategy = keyof typeof UPDATE_POSITION_STRATEGIES

export interface TooltipTriggerProps {
  as?: string | Component
  asChild?: boolean
}

export interface TooltipContentProps {
  as?: string | Component
  asChild?: boolean
  forceMount?: boolean
  side?: TooltipSide
  sideOffset?: number
  align?: TooltipAlign
  alignOffset?: number
  avoidCollisions?: boolean
  collisionPadding?: number | Partial<Record<TooltipSide, number>>
  arrowPadding?: number
  sticky?: TooltipSticky
  hideWhenDetached?: boolean
  positionStrategy?: TooltipPositionStrategy
  updatePositionStrategy?: TooltipUpdatePositionStrategy
}

export interface TooltipArrowProps {
  as?: string | Component
  asChild?: boolean
  width?: number
  height?: number
}

export interface TooltipUI {
  root?: HTMLAttributes
  trigger?: HTMLAttributes
  content?: HTMLAttributes
  arrow?: HTMLAttributes
}

export interface TooltipProps {
  open?: boolean
  label?: string
  defaultOpen?: boolean
  delayDuration?: number
  skipDelayDuration?: number
  disableHoverableContent?: boolean
  disableClosingTrigger?: boolean
  disabled?: boolean
  ignoreNonKeyboardFocus?: boolean
  trigger?: TooltipTriggerProps
  content?: TooltipContentProps
  arrow?: TooltipArrowProps
  ui?: TooltipUI
}

export interface TooltipEmits {
  'update:open': [value: boolean]
}

export interface TooltipSlotProps {
  open: boolean
}

export interface TooltipSlots {
  default?(props: TooltipSlotProps): unknown
  content?(props: TooltipSlotProps): unknown
}

export function mapCollisionPadding(
  padding: number | Partial<Record<TooltipSide, number>> | undefined,
) {
  if (padding === undefined || typeof padding === 'number') return padding

  return Object.fromEntries(
    Object.entries(padding).map(([side, value]) => [SIDES[side as TooltipSide], value]),
  ) as Partial<Record<(typeof SIDES)[TooltipSide], number>>
}
