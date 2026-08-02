import type { HTMLAttributes } from 'vue'
import type { TooltipArrowProps as RekaTooltipArrowProps, TooltipContentEmits, TooltipContentProps as RekaTooltipContentProps, TooltipRootEmits, TooltipRootProps, TooltipTriggerProps as RekaTooltipTriggerProps } from 'reka-ui'

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

export type TooltipTriggerProps = RekaTooltipTriggerProps

export interface TooltipContentProps extends RekaTooltipContentProps {
  side?: TooltipSide
  align?: TooltipAlign
  collisionPadding?: number | Partial<Record<TooltipSide, number>>
  sticky?: TooltipSticky
  positionStrategy?: TooltipPositionStrategy
  updatePositionStrategy?: TooltipUpdatePositionStrategy
}

export type TooltipArrowProps = RekaTooltipArrowProps

export interface TooltipUI {
  root?: HTMLAttributes
  trigger?: HTMLAttributes
  content?: HTMLAttributes
  arrow?: HTMLAttributes
}

export interface TooltipProps extends TooltipRootProps {
  label?: string
  skipDelayDuration?: number
  trigger?: TooltipTriggerProps
  content?: TooltipContentProps
  arrow?: TooltipArrowProps
  ui?: TooltipUI
}

export type TooltipEmits = TooltipRootEmits & TooltipContentEmits

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
