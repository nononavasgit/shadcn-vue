import type { HTMLAttributes } from 'vue'
import type {
  DialogContentEmits as RekaDialogContentEmits,
  DialogContentProps as RekaDialogContentProps,
  DialogRootEmits as RekaDialogRootEmits,
  DialogRootProps as RekaDialogRootProps,
} from 'reka-ui'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Dialog } from './Dialog.vue'

// Props Reka
export type DialogRootProps = Pick<RekaDialogRootProps, 'modal' | 'unmountOnHide'>
export type DialogContentProps = Pick<
  RekaDialogContentProps,
  'forceMount' | 'disableOutsidePointerEvents'
>

// Fn
export type DialogFn<T> = (context: DialogContext) => T

// UI
export interface DialogUI {
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
  open?: boolean
  forceMount?: DialogContentProps['forceMount']
  disableOutsidePointerEvents?: DialogContentProps['disableOutsidePointerEvents']
  block?: boolean
  label?: string
  description?: string
  icon?: IconConfig
  closeIcon?: IconConfig
  showCloseButton?: boolean
  ui?: DialogUI
}

// Context
export interface DialogContext {
  open: boolean
  close: () => void
}

// Emits
export type DialogEmits = RekaDialogRootEmits &
  RekaDialogContentEmits & {
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
