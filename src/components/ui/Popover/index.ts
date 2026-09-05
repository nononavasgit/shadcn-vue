import type { HTMLAttributes } from 'vue'
import type {
  PopoverArrowProps as RekaPopoverArrowProps,
  PopoverContentEmits as RekaPopoverContentEmits,
  PopoverContentProps as RekaPopoverContentProps,
  PopoverRootEmits as RekaPopoverRootEmits,
  PopoverRootProps as RekaPopoverRootProps,
} from 'reka-ui'

export { default as Popover } from './Popover.vue'

// Props Reka
export type PopoverRootProps = Pick<RekaPopoverRootProps, 'modal'>
export type PopoverContentProps = Pick<
  RekaPopoverContentProps,
  | 'align'
  | 'alignFlip'
  | 'alignOffset'
  | 'arrowPadding'
  | 'avoidCollisions'
  | 'collisionPadding'
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
>
export type PopoverArrowProps = Pick<RekaPopoverArrowProps, 'width' | 'height' | 'rounded'>

// Fn
export type PopoverFn<T> = (context: PopoverContext) => T

// UI
export interface PopoverUI {
  content?: PopoverFn<HTMLAttributes>
  arrow?: PopoverFn<HTMLAttributes>
}

// Props
export interface PopoverProps extends PopoverRootProps, PopoverContentProps {
  open?: boolean
  showArrow?: boolean
  arrowWidth?: PopoverArrowProps['width']
  arrowHeight?: PopoverArrowProps['height']
  arrowRounded?: PopoverArrowProps['rounded']
  ui?: PopoverUI
}

// Context
export interface PopoverContext {
  open: boolean
  close: () => void
}

// Emits
export type PopoverEmits = RekaPopoverRootEmits &
  RekaPopoverContentEmits & {
    show: []
    close: []
  }

// Slots
export interface PopoverSlots {
  default?(props: PopoverContext): unknown
  content?(props: PopoverContext): unknown
}
