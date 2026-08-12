import type { HTMLAttributes } from 'vue'

export { default as Kbd } from './Kbd.vue'
export { default as KbdGroup } from './KbdGroup.vue'

export interface KbdProps {
  label?: string
  ui?: KbdUI
}

export type KbdFn<T> = (context: KbdContext) => T

export interface KbdUI {
  root?: KbdFn<HTMLAttributes>
}

export interface KbdContext {
  label: KbdProps['label']
}

export function createKbdContext(props: KbdProps): KbdContext {
  return {
    label: props.label,
  }
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

export type KbdGroupFn<T> = (context: KbdGroupContext) => T

export type KbdGroupContext = Record<string, never>

export function createKbdGroupContext(): KbdGroupContext {
  return {}
}

export interface KbdGroupSlots {
  default?(props: KbdGroupContext): unknown
}
