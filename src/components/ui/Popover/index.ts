import type { HTMLAttributes } from 'vue'
import type {
  PopoverArrowProps as RekaPopoverArrowProps,
  PopoverContentEmits as RekaPopoverContentEmits,
  PopoverContentProps as RekaPopoverContentProps,
  PopoverPortalProps as RekaPopoverPortalProps,
  PopoverRootEmits as RekaPopoverRootEmits,
  PopoverRootProps as RekaPopoverRootProps,
  PopoverTriggerProps as RekaPopoverTriggerProps,
} from 'reka-ui'
import type { EmitsAsProps } from '@/types/emits'

export { default as Popover } from './Popover.vue'

// Props Reka
export type PopoverRootProps = Pick<RekaPopoverRootProps, 'open' | 'defaultOpen' | 'modal'>
export type PopoverTriggerProps = Pick<RekaPopoverTriggerProps, 'as' | 'asChild'>
export type PopoverContentProps = Pick<
  RekaPopoverContentProps,
  | 'as'
  | 'asChild'
  | 'align'
  | 'alignFlip'
  | 'alignOffset'
  | 'arrowPadding'
  | 'avoidCollisions'
  | 'collisionBoundary'
  | 'collisionPadding'
  | 'dir'
  | 'disableOutsidePointerEvents'
  | 'disableUpdateOnLayoutShift'
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
> &
  EmitsAsProps<RekaPopoverContentEmits>

export type PopoverPortalProps = Pick<
  RekaPopoverPortalProps,
  'defer' | 'disabled' | 'to' | 'forceMount'
>
export type PopoverArrowProps = Pick<
  RekaPopoverArrowProps,
  'as' | 'asChild' | 'width' | 'height' | 'rounded'
>

export function normalizePopoverRootProps(
  source: PopoverRootProps | null | undefined,
): PopoverRootProps | undefined {
  if (!source) return undefined
  const { defaultOpen, modal, open } = source
  return { defaultOpen, modal, open }
}

export function normalizePopoverTriggerProps(
  source: PopoverTriggerProps | null | undefined,
): PopoverTriggerProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizePopoverContentProps(
  source: PopoverContentProps | null | undefined,
): PopoverContentProps | undefined {
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
    dir,
    disableOutsidePointerEvents,
    disableUpdateOnLayoutShift,
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
    onCloseAutoFocus,
    onEscapeKeyDown,
    onFocusOutside,
    onInteractOutside,
    onOpenAutoFocus,
    onPointerDownOutside,
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
    dir,
    disableOutsidePointerEvents,
    disableUpdateOnLayoutShift,
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
    onCloseAutoFocus,
    onEscapeKeyDown,
    onFocusOutside,
    onInteractOutside,
    onOpenAutoFocus,
    onPointerDownOutside,
  }
}

export function normalizePopoverPortalProps(
  source: PopoverPortalProps | null | undefined,
): PopoverPortalProps | undefined {
  if (!source) return undefined
  const { defer, disabled, to, forceMount } = source
  return { defer, disabled, to, forceMount }
}

export function normalizePopoverArrowProps(
  source: PopoverArrowProps | null | undefined,
): PopoverArrowProps | undefined {
  if (!source) return undefined
  const { as, asChild, width, height, rounded } = source
  return { as, asChild, width, height, rounded }
}

// Fn
export type PopoverFn<T> = T | ((context: PopoverContext) => T)

// UI
export interface PopoverUI {
  root?: PopoverFn<HTMLAttributes>
  trigger?: PopoverFn<HTMLAttributes>
  content?: PopoverFn<HTMLAttributes>
  arrow?: PopoverFn<HTMLAttributes>
}

// Props
export interface PopoverProps extends PopoverRootProps {
  trigger?: PopoverTriggerProps
  content?: PopoverContentProps
  portal?: PopoverPortalProps
  arrow?: PopoverArrowProps
  showArrow?: boolean
  ui?: PopoverUI
}

// Context
export interface PopoverContext {
  props: Omit<PopoverProps, 'ui'>
  open: boolean
  close: () => void
}

// Emits
export type PopoverEmits = RekaPopoverRootEmits

// Slots
export interface PopoverSlots {
  default?(props: PopoverContext): unknown
  content?(props: PopoverContext): unknown
  arrow?(props: PopoverContext): unknown
}
