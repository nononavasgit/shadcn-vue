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

export { default as Dialog } from './Dialog.vue'

// Props Reka
export type DialogRootProps = Pick<RekaDialogRootProps, 'open' | 'modal' | 'unmountOnHide'>
export type DialogTriggerProps = Pick<RekaDialogTriggerProps, 'as' | 'asChild'>
export type DialogContentProps = Pick<
  RekaDialogContentProps,
  'as' | 'asChild' | 'forceMount' | 'disableOutsidePointerEvents'
> &
  EmitsAsProps<RekaDialogContentEmits>
export type DialogCloseProps = Pick<RekaDialogCloseProps, 'as' | 'asChild'>

export function normalizeDialogRootProps(
  source: DialogRootProps | null | undefined,
): DialogRootProps | undefined {
  if (!source) return undefined
  const { open, modal, unmountOnHide } = source
  return { open, modal, unmountOnHide }
}

export function normalizeDialogTriggerProps(
  source: DialogTriggerProps | null | undefined,
): DialogTriggerProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeDialogContentProps(
  source: DialogContentProps | null | undefined,
): DialogContentProps | undefined {
  if (!source) return undefined
  const {
    as,
    asChild,
    forceMount,
    disableOutsidePointerEvents,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
  } = source
  return {
    as,
    asChild,
    forceMount,
    disableOutsidePointerEvents,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onEscapeKeyDown,
    onPointerDownOutside,
    onFocusOutside,
    onInteractOutside,
  }
}

export function normalizeDialogCloseProps(
  source: DialogCloseProps | null | undefined,
): DialogCloseProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

// Fn
export type DialogFn<T> = T | ((context: DialogContext) => T)

// UI
export interface DialogUI {
  root?: DialogFn<HTMLAttributes>
  trigger?: DialogFn<HTMLAttributes>
  overlay?: DialogFn<HTMLAttributes>
  content?: DialogFn<HTMLAttributes>
  header?: DialogFn<HTMLAttributes>
  label?: DialogFn<HTMLAttributes>
  description?: DialogFn<HTMLAttributes>
  body?: DialogFn<HTMLAttributes>
  footer?: DialogFn<HTMLAttributes>
  close?: DialogFn<HTMLAttributes>
}

// Props
export interface DialogProps extends DialogRootProps {
  block?: boolean
  label?: string
  description?: string
  icon?: NormalizeIconProps
  closeIcon?: NormalizeIconProps
  showCloseButton?: boolean
  trigger?: DialogTriggerProps
  content?: DialogContentProps
  close?: DialogCloseProps
  ui?: DialogUI
}

// Context
export interface DialogContext {
  props: Omit<DialogProps, 'ui'>
  open: boolean
  close: () => void
}

// Emits
export type DialogEmits = RekaDialogRootEmits & {
  show: []
  close: []
}

// Slots
export interface DialogSlots {
  default?(props: DialogContext): unknown
  content?(props: DialogContext): unknown
  header?(props: DialogContext): unknown
  label?(props: DialogContext): unknown
  description?(props: DialogContext): unknown
  footer?(props: DialogContext): unknown
  close?(props: DialogContext): unknown
  closeIcon?(props: DialogContext): unknown
}
