import type { HTMLAttributes } from 'vue'

export { default as Kbd } from './Kbd.vue'
export { default as KbdGroup } from './KbdGroup.vue'

export interface KbdProps {
  label?: string
  ui?: KbdUI
}

export type KbdFn<T> = T | ((context: KbdContext) => T)

export interface KbdUI {
  root?: KbdFn<HTMLAttributes>
}

export interface KbdContext {
  props: Omit<KbdProps, 'ui'>
}

export interface KbdSlots {
  default?(props: KbdContext): unknown
}

export interface KbdGroupUI {
  root?: KbdGroupFn<HTMLAttributes>
}

export interface KbdGroupProps {
  ui?: KbdGroupUI
}

export type KbdGroupFn<T> = T | ((context: KbdGroupContext) => T)

export interface KbdGroupContext {
  props: Omit<KbdGroupProps, 'ui'>
}

export interface KbdGroupSlots {
  default?(props: KbdGroupContext): unknown
}
