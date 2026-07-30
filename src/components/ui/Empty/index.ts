import type { HTMLAttributes } from 'vue'

export { default as Empty } from './Empty.vue'

export interface EmptyUI {
  root?: HTMLAttributes
  header?: HTMLAttributes
  media?: HTMLAttributes
  label?: HTMLAttributes
  description?: HTMLAttributes
  content?: HTMLAttributes
}

export interface EmptyProps {
  label?: string
  description?: string
  mediaVariant?: 'default' | 'icon'
  ui?: EmptyUI
}

export interface EmptySlots {
  default?(): unknown
  media?(): unknown
  label?(): unknown
  description?(): unknown
}
