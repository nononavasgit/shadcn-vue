import type { HTMLAttributes } from 'vue'
import type {
  TooltipArrowProps as RekaTooltipArrowProps,
  TooltipContentEmits as RekaTooltipContentEmits,
  TooltipContentProps as RekaTooltipContentProps,
  TooltipRootProps as RekaTooltipRootProps,
  TooltipTriggerProps as RekaTooltipTriggerProps,
} from 'reka-ui'
import type { EmitsAsProps } from '@/types/emits'

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
export type TooltipTriggerProps = Pick<RekaTooltipTriggerProps, 'as' | 'asChild' | 'reference'>
export type TooltipContentProps = Pick<
  RekaTooltipContentProps,
  | 'as'
  | 'asChild'
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
  EmitsAsProps<RekaTooltipContentEmits>
export type TooltipArrowProps = Pick<RekaTooltipArrowProps, 'as' | 'asChild' | 'width' | 'height'>

// Fn
export type TooltipFn<T> = (context: TooltipContext) => T

// UI
export interface TooltipUI {
  root?: TooltipFn<HTMLAttributes>
  trigger?: TooltipFn<HTMLAttributes>
  content?: TooltipFn<HTMLAttributes>
  arrow?: TooltipFn<HTMLAttributes>
}

// Props
export interface TooltipProps extends TooltipRootProps {
  open?: boolean
  label?: string
  withArrow?: boolean
  triggerAs?: TooltipTriggerProps['as']
  triggerAsChild?: TooltipTriggerProps['asChild']
  triggerReference?: TooltipTriggerProps['reference']
  contentAs?: TooltipContentProps['as']
  contentAsChild?: TooltipContentProps['asChild']
  align?: TooltipContentProps['align']
  alignOffset?: TooltipContentProps['alignOffset']
  ariaLabel?: TooltipContentProps['ariaLabel']
  arrowPadding?: TooltipContentProps['arrowPadding']
  avoidCollisions?: TooltipContentProps['avoidCollisions']
  collisionBoundary?: TooltipContentProps['collisionBoundary']
  collisionPadding?: TooltipContentProps['collisionPadding']
  forceMount?: TooltipContentProps['forceMount']
  hideWhenDetached?: TooltipContentProps['hideWhenDetached']
  positionStrategy?: TooltipContentProps['positionStrategy']
  side?: TooltipContentProps['side']
  sideOffset?: TooltipContentProps['sideOffset']
  sticky?: TooltipContentProps['sticky']
  updatePositionStrategy?: TooltipContentProps['updatePositionStrategy']
  onEscapeKeyDown?: TooltipContentProps['onEscapeKeyDown']
  onPointerDownOutside?: TooltipContentProps['onPointerDownOutside']
  arrowAs?: TooltipArrowProps['as']
  arrowAsChild?: TooltipArrowProps['asChild']
  arrowWidth?: TooltipArrowProps['width']
  arrowHeight?: TooltipArrowProps['height']
  ui?: TooltipUI
}

// Context
export interface TooltipContext {
  open: boolean
  close: () => void
}

export function createTooltipContext(
  open: TooltipProps['open'],
  close: () => void,
): TooltipContext {
  return {
    open: open ?? false,
    close,
  }
}

// Emits
export interface TooltipEmits {
  'update:open': [value: TooltipProps['open']]
}

// Slots
export interface TooltipSlots {
  default?(props: TooltipContext): unknown
  content?(props: TooltipContext): unknown
}
