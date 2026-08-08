import type { HTMLAttributes } from 'vue'
import type {
  TooltipArrowProps as RekaTooltipArrowProps,
  TooltipContentEmits as RekaTooltipContentEmits,
  TooltipContentProps as RekaTooltipContentProps,
  TooltipRootEmits as RekaTooltipRootEmits,
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
export type TooltipFn<T> = T | ((context: TooltipContext) => T)

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
  trigger?: TooltipTriggerProps
  content?: TooltipContentProps
  arrow?: TooltipArrowProps
  ui?: TooltipUI
}

// Context
export interface TooltipContext {
  props: Omit<TooltipProps, 'ui'>
  open: boolean
  close: () => void
}

// Emits
export type TooltipEmits = RekaTooltipRootEmits

// Slots
export interface TooltipSlots {
  default?(props: TooltipContext): unknown
  content?(props: TooltipContext): unknown
  arrow?(props: TooltipContext): unknown
}
