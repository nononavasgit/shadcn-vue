import type { HTMLAttributes, EmitsToProps } from 'vue'
import type {
  PopoverContentEmits,
  PopoverContentProps as RekaPopoverContentProps,
  PopoverRootProps as RekaPopoverRootProps,
  PopoverPortalProps as RekaPopoverPortalProps,
  PopoverArrowProps as RekaPopoverArrowProps,
  PopoverRootEmits,
} from 'reka-ui'

export { default as Popover } from './Popover.vue'

// Types
export type PopoverRootProps = Pick<RekaPopoverRootProps, 'open' | 'defaultOpen' | 'modal'>
export type PopoverContentProps = Pick<
  RekaPopoverContentProps,
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
  Partial<
    EmitsToProps<
      Pick<
        PopoverContentEmits,
        | 'openAutoFocus'
        | 'closeAutoFocus'
        | 'escapeKeyDown'
        | 'pointerDownOutside'
        | 'focusOutside'
        | 'interactOutside'
      >
    >
  >

export type PopoverPortalProps = Pick<
  RekaPopoverPortalProps,
  'defer' | 'disabled' | 'to' | 'forceMount'
>
export type PopoverArrowProps = Pick<RekaPopoverArrowProps, 'width' | 'height' | 'rounded'>

export function normalizeRootProps(
  source: PopoverRootProps | null | undefined,
): PopoverRootProps | undefined {
  if (!source) return undefined

  const { defaultOpen, modal, open } = source
  return { defaultOpen, modal, open }
}

export function normalizeContentProps(
  source: PopoverContentProps | null | undefined,
): PopoverContentProps | undefined {
  if (!source) return undefined

  const {
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

export function normalizePortalProps(
  source: PopoverPortalProps | null | undefined,
): PopoverPortalProps | undefined {
  if (!source) return undefined

  const { defer, disabled, to, forceMount } = source
  return { defer, disabled, to, forceMount }
}

export function normalizeArrowProps(
  source: PopoverArrowProps | null | undefined,
): PopoverArrowProps | undefined {
  if (!source) return undefined

  const { width, height, rounded } = source
  return { width, height, rounded }
}

// UI
export interface PopoverUI {
  root?: HTMLAttributes
  trigger?: HTMLAttributes
  portal?: HTMLAttributes
  content?: HTMLAttributes
  arrow?: HTMLAttributes
}

// Props
export interface PopoverProps extends PopoverRootProps {
  arrow?: PopoverArrowProps
  content?: PopoverContentProps
  portal?: PopoverPortalProps
  showArrow?: boolean
  ui?: PopoverUI
}

// Emits
export type PopoverEmits = PopoverRootEmits

// SlotProps
export interface PopoverSlotProps {
  open: boolean
  close: () => void
}

// Slots
export interface PopoverSlots {
  default?(props: PopoverSlotProps): unknown
  content?(props: PopoverSlotProps): unknown
}
