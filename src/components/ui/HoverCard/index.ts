import type { HTMLAttributes } from 'vue'
import type {
  HoverCardArrowProps as RekaHoverCardArrowProps,
  HoverCardContentProps as RekaHoverCardContentProps,
  HoverCardPortalProps as RekaHoverCardPortalProps,
  HoverCardRootEmits as RekaHoverCardRootEmits,
  HoverCardRootProps as RekaHoverCardRootProps,
  HoverCardTriggerProps as RekaHoverCardTriggerProps,
} from 'reka-ui'

export { default as HoverCard } from './HoverCard.vue'

export type HoverCardRootProps = Pick<
  RekaHoverCardRootProps,
  'open' | 'defaultOpen' | 'openDelay' | 'closeDelay' | 'enableTouch'
>
export type HoverCardTriggerProps = Pick<RekaHoverCardTriggerProps, 'as' | 'asChild' | 'reference'>
export type HoverCardContentProps = Pick<
  RekaHoverCardContentProps,
  | 'as'
  | 'asChild'
  | 'align'
  | 'alignFlip'
  | 'alignOffset'
  | 'arrowPadding'
  | 'avoidCollisions'
  | 'collisionBoundary'
  | 'collisionPadding'
  | 'forceMount'
  | 'hideShiftedArrow'
  | 'hideWhenDetached'
  | 'positionStrategy'
  | 'prioritizePosition'
  | 'side'
  | 'sideFlip'
  | 'sideOffset'
  | 'sticky'
  | 'updatePositionStrategy'
>
export type HoverCardPortalProps = Pick<
  RekaHoverCardPortalProps,
  'defer' | 'disabled' | 'to' | 'forceMount'
>
export type HoverCardArrowProps = Pick<
  RekaHoverCardArrowProps,
  'as' | 'asChild' | 'width' | 'height' | 'rounded'
>

export function normalizeHoverCardRootProps(
  source: HoverCardRootProps | null | undefined,
): HoverCardRootProps | undefined {
  if (!source) return undefined
  const { defaultOpen, open, openDelay, closeDelay, enableTouch } = source
  return { defaultOpen, open, openDelay, closeDelay, enableTouch }
}

export function normalizeHoverCardTriggerProps(
  source: HoverCardTriggerProps | null | undefined,
): HoverCardTriggerProps | undefined {
  if (!source) return undefined
  const { as, asChild, reference } = source
  return { as, asChild, reference }
}

export function normalizeHoverCardContentProps(
  source: HoverCardContentProps | null | undefined,
): HoverCardContentProps | undefined {
  if (!source) return undefined
  const {
    as,
    asChild,
    align,
    alignFlip,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    forceMount,
    hideShiftedArrow,
    hideWhenDetached,
    positionStrategy,
    prioritizePosition,
    side,
    sideFlip,
    sideOffset,
    sticky,
    updatePositionStrategy,
  } = source
  return {
    as,
    asChild,
    align,
    alignFlip,
    alignOffset,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    forceMount,
    hideShiftedArrow,
    hideWhenDetached,
    positionStrategy,
    prioritizePosition,
    side,
    sideFlip,
    sideOffset,
    sticky,
    updatePositionStrategy,
  }
}

export function normalizeHoverCardPortalProps(
  source: HoverCardPortalProps | null | undefined,
): HoverCardPortalProps | undefined {
  if (!source) return undefined
  const { defer, disabled, to, forceMount } = source
  return { defer, disabled, to, forceMount }
}

export function normalizeHoverCardArrowProps(
  source: HoverCardArrowProps | null | undefined,
): HoverCardArrowProps | undefined {
  if (!source) return undefined
  const { as, asChild, width, height, rounded } = source
  return { as, asChild, width, height, rounded }
}

export type HoverCardFn<T> = T | ((context: HoverCardContext) => T)

export interface HoverCardUI {
  root?: HoverCardFn<HTMLAttributes>
  trigger?: HoverCardFn<HTMLAttributes>
  content?: HoverCardFn<HTMLAttributes>
  arrow?: HoverCardFn<HTMLAttributes>
}

export interface HoverCardProps extends HoverCardRootProps {
  label?: string
  trigger?: HoverCardTriggerProps
  content?: HoverCardContentProps
  portal?: HoverCardPortalProps
  arrow?: HoverCardArrowProps
  showArrow?: boolean
  ui?: HoverCardUI
}

export interface HoverCardContext {
  props: Omit<HoverCardProps, 'ui'>
  open: boolean
  close: () => void
}

export type HoverCardEmits = RekaHoverCardRootEmits

export interface HoverCardSlots {
  default?(props: HoverCardContext): unknown
  content?(props: HoverCardContext): unknown
  arrow?(props: HoverCardContext): unknown
}
