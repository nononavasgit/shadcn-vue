import type { EmitsToProps, HTMLAttributes } from 'vue'
import type {
  TooltipArrowProps as RekaTooltipArrowProps,
  TooltipContentEmits,
  TooltipContentProps as RekaTooltipContentProps,
  TooltipRootEmits,
  TooltipRootProps as RekaTooltipRootProps,
} from 'reka-ui'

export { default as Tooltip } from './Tooltip.vue'

// Types
export type TooltipRootProps = Pick<
  RekaTooltipRootProps,
  | 'open'
  | 'defaultOpen'
  | 'delayDuration'
  | 'disableHoverableContent'
  | 'disableClosingTrigger'
  | 'disabled'
  | 'ignoreNonKeyboardFocus'
>
export type TooltipContentProps = Pick<
  RekaTooltipContentProps,
  | 'align'
  | 'alignOffset'
  | 'ariaLabel'
  | 'arrowPadding'
  | 'avoidCollisions'
  | 'collisionBoundary'
  | 'collisionPadding'
  | 'forceMount'
  | 'hideWhenDetached'
  | 'positionStrategy'
  | 'side'
  | 'sideOffset'
  | 'sticky'
  | 'updatePositionStrategy'
> &
  Partial<EmitsToProps<Pick<TooltipContentEmits, 'escapeKeyDown' | 'pointerDownOutside'>>>
export type TooltipArrowProps = Pick<RekaTooltipArrowProps, 'width' | 'height'>

export function normalizeRootProps(
  source: TooltipRootProps | null | undefined,
): TooltipRootProps | undefined {
  if (!source) return undefined
  const {
    defaultOpen,
    delayDuration,
    disableClosingTrigger,
    disableHoverableContent,
    disabled,
    ignoreNonKeyboardFocus,
    open,
  } = source
  return {
    defaultOpen,
    delayDuration,
    disableClosingTrigger,
    disableHoverableContent,
    disabled,
    ignoreNonKeyboardFocus,
    open,
  }
}

export function normalizeContentProps(
  source: TooltipContentProps | null | undefined,
): TooltipContentProps | undefined {
  if (!source) return undefined
  const {
    align,
    alignOffset,
    ariaLabel,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    forceMount,
    hideWhenDetached,
    positionStrategy,
    side,
    sideOffset,
    sticky,
    updatePositionStrategy,
    onEscapeKeyDown,
    onPointerDownOutside,
  } = source
  return {
    align,
    alignOffset,
    ariaLabel,
    arrowPadding,
    avoidCollisions,
    collisionBoundary,
    collisionPadding,
    forceMount,
    hideWhenDetached,
    positionStrategy,
    side,
    sideOffset,
    sticky,
    updatePositionStrategy,
    onEscapeKeyDown,
    onPointerDownOutside,
  }
}

export function normalizeArrowProps(
  source: TooltipArrowProps | null | undefined,
): TooltipArrowProps | undefined {
  if (!source) return undefined
  const { width, height } = source
  return { width, height }
}

// UI
export interface TooltipUI {
  root?: HTMLAttributes
  trigger?: HTMLAttributes
  content?: HTMLAttributes
  arrow?: HTMLAttributes
}

// Props
export interface TooltipProps extends TooltipRootProps {
  label?: string
  content?: TooltipContentProps
  arrow?: TooltipArrowProps
  ui?: TooltipUI
}

// Emits
export type TooltipEmits = TooltipRootEmits

// SlotProps
export interface TooltipSlotProps {
  open: boolean
}

// Slots
export interface TooltipSlots {
  default?(props: TooltipSlotProps): unknown
  content?(props: TooltipSlotProps): unknown
}
