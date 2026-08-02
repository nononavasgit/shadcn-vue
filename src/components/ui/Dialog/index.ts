import type { HTMLAttributes } from 'vue'
import type {
  DialogCloseProps as RekaDialogCloseProps,
  DialogContentProps as RekaDialogContentProps,
  DialogRootEmits,
  DialogRootProps,
  DialogTriggerProps as RekaDialogTriggerProps,
} from 'reka-ui'
import type { IconName, IconProps } from '@/components/ui/Icon'

export { default as Dialog } from './Dialog.vue'

export type DialogTriggerProps = RekaDialogTriggerProps
export type DialogContentProps = Pick<RekaDialogContentProps, 'as' | 'asChild'>
export type DialogCloseProps = RekaDialogCloseProps

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
  const { as, asChild } = source
  return { as, asChild }
}

export function normalizeDialogCloseProps(
  source: DialogCloseProps | null | undefined,
): DialogCloseProps | undefined {
  if (!source) return undefined
  const { as, asChild } = source
  return { as, asChild }
}

export interface DialogUI {
  root?: HTMLAttributes
  trigger?: HTMLAttributes
  content?: HTMLAttributes
  header?: HTMLAttributes
  title?: HTMLAttributes
  icon?: HTMLAttributes
  description?: HTMLAttributes
  body?: HTMLAttributes
  footer?: HTMLAttributes
  close?: HTMLAttributes
}

export interface DialogProps extends DialogRootProps {
  forceMount?: boolean
  disableOutsidePointerEvents?: boolean
  block?: boolean
  label?: string
  description?: string
  icon?: IconName | IconProps
  showCloseButton?: boolean
  trigger?: DialogTriggerProps
  content?: DialogContentProps
  close?: DialogCloseProps
  ui?: DialogUI
}

export type DialogEmits = DialogRootEmits

export interface DialogSlotProps {
  open: boolean
  close: () => void
}

export interface DialogSlots {
  default?(props: DialogSlotProps): unknown
  content?(props: DialogSlotProps): unknown
  header?(props: DialogSlotProps): unknown
  title?(props: DialogSlotProps): unknown
  description?(props: DialogSlotProps): unknown
  footer?(props: DialogSlotProps): unknown
  close?(props: DialogSlotProps): unknown
  closeIcon?(props: DialogSlotProps): unknown
}
