import type { Component, HTMLAttributes } from 'vue'

export { default as HoverCard } from './HoverCard.vue'

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

export type HoverCardSide = keyof typeof SIDES
export type HoverCardAlign = keyof typeof ALIGNS
export type HoverCardSticky = keyof typeof STICKY_VALUES
export type HoverCardPositionStrategy = keyof typeof POSITION_STRATEGIES
export type HoverCardUpdatePositionStrategy = keyof typeof UPDATE_POSITION_STRATEGIES

export interface HoverCardTriggerProps {
  as?: string | Component
  asChild?: boolean
}

export interface HoverCardContentProps {
  as?: string | Component
  asChild?: boolean
  forceMount?: boolean
  side?: HoverCardSide
  sideOffset?: number
  align?: HoverCardAlign
  alignOffset?: number
  avoidCollisions?: boolean
  collisionPadding?: number | Partial<Record<HoverCardSide, number>>
  arrowPadding?: number
  sticky?: HoverCardSticky
  hideWhenDetached?: boolean
  positionStrategy?: HoverCardPositionStrategy
  updatePositionStrategy?: HoverCardUpdatePositionStrategy
}

export function normalizeHoverCardTriggerProps(
  source: HoverCardTriggerProps | null | undefined,
): HoverCardTriggerProps | undefined {
  if (!source) return undefined

  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeHoverCardContentProps(
  source: HoverCardContentProps | null | undefined,
): HoverCardContentProps | undefined {
  if (!source) return undefined

  const {
    as,
    asChild,
    forceMount,
    side,
    sideOffset,
    align,
    alignOffset,
    avoidCollisions,
    collisionPadding,
    arrowPadding,
    sticky,
    hideWhenDetached,
    positionStrategy,
    updatePositionStrategy,
  } = source

  return {
    as,
    asChild,
    forceMount,
    side,
    sideOffset,
    align,
    alignOffset,
    avoidCollisions,
    collisionPadding,
    arrowPadding,
    sticky,
    hideWhenDetached,
    positionStrategy,
    updatePositionStrategy,
  }
}
export interface HoverCardUI {
  root?: HTMLAttributes
  trigger?: HTMLAttributes
  content?: HTMLAttributes
}

export interface HoverCardProps {
  open?: boolean
  defaultOpen?: boolean
  label?: string
  openDelay?: number
  closeDelay?: number
  enableTouch?: boolean
  trigger?: HoverCardTriggerProps
  content?: HoverCardContentProps
  ui?: HoverCardUI
}

export interface HoverCardEmits {
  'update:open': [value: boolean]
}

export interface HoverCardSlotProps {
  open: boolean
}

export interface HoverCardSlots {
  default?(props: HoverCardSlotProps): unknown
  content?(props: HoverCardSlotProps): unknown
}

export function mapCollisionPadding(
  padding: number | Partial<Record<HoverCardSide, number>> | undefined,
) {
  if (padding === undefined || typeof padding === 'number') return padding

  return Object.fromEntries(
    Object.entries(padding).map(([side, value]) => [SIDES[side as HoverCardSide], value]),
  ) as Partial<Record<(typeof SIDES)[HoverCardSide], number>>
}
