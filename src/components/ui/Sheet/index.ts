import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type {
  DialogCloseProps as RekaDialogCloseProps,
  DialogContentEmits as RekaDialogContentEmits,
  DialogContentProps as RekaDialogContentProps,
  DialogRootEmits as RekaDialogRootEmits,
  DialogRootProps as RekaDialogRootProps,
  DialogTriggerProps as RekaDialogTriggerProps,
} from 'reka-ui'
import type { NormalizeIconProps } from '@/components/ui/Icon'
import type { EmitsAsProps } from '@/types/emits'

export { default as Sheet } from './Sheet.vue'

export const sheetVariants = cva(
  'data-[state=open]:animate-in data-[state=closed]:animate-out pointer-events-auto fixed z-50 grid grid-rows-[auto_minmax(0,1fr)_auto] gap-4 overflow-hidden bg-background shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        right:
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
        left: 'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
        top: 'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 max-h-[90dvh] w-full border-b',
        bottom:
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 max-h-[90dvh] w-full border-t',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)

export type SheetVariants = VariantProps<typeof sheetVariants>
export type SheetSide = NonNullable<SheetVariants['side']>

// Props Reka
export type SheetRootProps = Pick<RekaDialogRootProps, 'open' | 'modal' | 'unmountOnHide'>
export type SheetTriggerProps = Pick<RekaDialogTriggerProps, 'as' | 'asChild'>
export type SheetContentProps = Pick<
  RekaDialogContentProps,
  'as' | 'asChild' | 'forceMount' | 'disableOutsidePointerEvents'
> &
  EmitsAsProps<RekaDialogContentEmits> & {
    side?: SheetSide
  }
export type SheetCloseProps = Pick<RekaDialogCloseProps, 'as' | 'asChild'>

// Fn
export type SheetFn<T> = (context: SheetContext) => T

// UI
export interface SheetUI {
  root?: SheetFn<HTMLAttributes>
  trigger?: SheetFn<HTMLAttributes>
  overlay?: SheetFn<HTMLAttributes>
  content?: SheetFn<HTMLAttributes>
  header?: SheetFn<HTMLAttributes>
  label?: SheetFn<HTMLAttributes>
  description?: SheetFn<HTMLAttributes>
  body?: SheetFn<HTMLAttributes>
  footer?: SheetFn<HTMLAttributes>
  close?: SheetFn<HTMLAttributes>
}

// Props
export interface SheetProps extends SheetRootProps {
  block?: boolean
  label?: string
  description?: string
  icon?: NormalizeIconProps
  closeIcon?: NormalizeIconProps
  showCloseButton?: boolean
  trigger?: SheetTriggerProps
  content?: SheetContentProps
  close?: SheetCloseProps
  ui?: SheetUI
}

// Context
export interface SheetContext {
  props: Omit<SheetProps, 'ui'>
  open: boolean
  close: () => void
}

// Emits
export type SheetEmits = RekaDialogRootEmits & {
  show: []
  close: []
}

// Slots
export interface SheetSlots {
  default?(props: SheetContext): unknown
  content?(props: SheetContext): unknown
  header?(props: SheetContext): unknown
  label?(props: SheetContext): unknown
  description?(props: SheetContext): unknown
  footer?(props: SheetContext): unknown
  close?(props: SheetContext): unknown
  closeIcon?(props: SheetContext): unknown
}
