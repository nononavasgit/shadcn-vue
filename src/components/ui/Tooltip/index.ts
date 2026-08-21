import type { HTMLAttributes } from 'vue'
import type {
  TooltipArrowProps as RekaTooltipArrowProps,
  TooltipContentEmits as RekaTooltipContentEmits,
  TooltipContentProps as RekaTooltipContentProps,
  TooltipRootEmits as RekaTooltipRootEmits,
  TooltipRootProps as RekaTooltipRootProps,
} from 'reka-ui'

export { default as Tooltip } from './Tooltip.vue'

// Props Reka
export type TooltipRootProps = Pick<
  RekaTooltipRootProps,
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
  | 'collisionPadding'
  | 'forceMount'
  | 'hideWhenDetached'
  | 'positionStrategy'
  | 'side'
  | 'sideOffset'
  | 'sticky'
  | 'updatePositionStrategy'
>
export type TooltipArrowProps = Pick<RekaTooltipArrowProps, 'width' | 'height'>

// Fn
export type TooltipFn<T> = (context: TooltipContext) => T

// UI
export interface TooltipUI {
  content?: TooltipFn<HTMLAttributes>
  arrow?: TooltipFn<HTMLAttributes>
}

// Props
export interface TooltipProps extends TooltipRootProps {
  open?: boolean
  label?: string
  withArrow?: boolean
  align?: TooltipContentProps['align']
  alignOffset?: TooltipContentProps['alignOffset']
  ariaLabel?: TooltipContentProps['ariaLabel']
  arrowPadding?: TooltipContentProps['arrowPadding']
  avoidCollisions?: TooltipContentProps['avoidCollisions']
  collisionPadding?: TooltipContentProps['collisionPadding']
  forceMount?: TooltipContentProps['forceMount']
  hideWhenDetached?: TooltipContentProps['hideWhenDetached']
  positionStrategy?: TooltipContentProps['positionStrategy']
  side?: TooltipContentProps['side']
  sideOffset?: TooltipContentProps['sideOffset']
  sticky?: TooltipContentProps['sticky']
  updatePositionStrategy?: TooltipContentProps['updatePositionStrategy']
  arrowWidth?: TooltipArrowProps['width']
  arrowHeight?: TooltipArrowProps['height']
  ui?: TooltipUI
}

// Context
export interface TooltipContext {
  open: boolean
  close: () => void
}

// Emits
export type TooltipEmits = RekaTooltipRootEmits & RekaTooltipContentEmits

// Slots
export interface TooltipSlots {
  default?(props: TooltipContext): unknown
  content?(props: TooltipContext): unknown
}
