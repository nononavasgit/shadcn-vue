import type { HTMLAttributes } from 'vue'
import type {
  HoverCardContentProps as RekaHoverCardContentProps,
  HoverCardRootEmits,
  HoverCardRootProps as RekaHoverCardRootProps,
  HoverCardTriggerProps as RekaHoverCardTriggerProps,
} from 'reka-ui'

export { default as HoverCard } from './HoverCard.vue'

// Types
export type HoverCardRootProps = Pick<
  RekaHoverCardRootProps,
  'open' | 'defaultOpen' | 'openDelay' | 'closeDelay' | 'enableTouch'
>
export type HoverCardTriggerProps = Pick<RekaHoverCardTriggerProps, 'as' | 'asChild'>
export type HoverCardContentProps = Pick<
  RekaHoverCardContentProps,
  | 'as'
  | 'asChild'
  | 'forceMount'
  | 'side'
  | 'sideOffset'
  | 'align'
  | 'alignOffset'
  | 'avoidCollisions'
  | 'collisionPadding'
  | 'arrowPadding'
  | 'sticky'
  | 'hideWhenDetached'
  | 'positionStrategy'
  | 'updatePositionStrategy'
>

export function normalizeRootProps(
  source: HoverCardRootProps | null | undefined,
): HoverCardRootProps | undefined {
  if (!source) return undefined

  const { defaultOpen, open, openDelay, closeDelay, enableTouch } = source
  return { defaultOpen, open, openDelay, closeDelay, enableTouch }
}

export function normalizeTriggerProps(
  source: HoverCardTriggerProps | null | undefined,
): HoverCardTriggerProps | undefined {
  if (!source) return undefined

  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeContentProps(
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

// Props
export interface HoverCardProps extends HoverCardRootProps {
  label?: string
  trigger?: HoverCardTriggerProps
  content?: HoverCardContentProps
  ui?: HoverCardUI
}

// Emits
export type HoverCardEmits = HoverCardRootEmits

// SlotProps
export interface HoverCarcUIContext {
  open: boolean
}

// Slots
export interface HoverCardSlots {
  default?(props: HoverCarcUIContext): unknown
  content?(props: HoverCarcUIContext): unknown
}
