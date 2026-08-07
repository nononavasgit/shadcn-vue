import type { HTMLAttributes } from 'vue'

export { default as Empty } from './Empty.vue'

export type EmptyFn<T> = T | ((context: EmptyContext) => T)

export interface EmptyUI {
  root?: EmptyFn<HTMLAttributes>
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

export interface EmptyContext {
  props: Omit<EmptyProps, 'ui'>
}

export interface EmptySlots {
  default?(props: EmptyContext): unknown
  media?(props: EmptyContext): unknown
  label?(props: EmptyContext): unknown
  description?(props: EmptyContext): unknown
}
