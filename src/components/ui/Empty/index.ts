import type { HTMLAttributes } from 'vue'

export { default as Empty } from './Empty.vue'

export type EmptyFn<T> = () => T

export interface EmptyUI {
  header?: EmptyFn<HTMLAttributes>
  media?: EmptyFn<HTMLAttributes>
  label?: EmptyFn<HTMLAttributes>
  description?: EmptyFn<HTMLAttributes>
  content?: EmptyFn<HTMLAttributes>
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
