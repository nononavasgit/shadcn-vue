import type { HTMLAttributes } from 'vue'

export { default as Kbd } from './Kbd.vue'
export { default as KbdGroup } from './KbdGroup.vue'

export interface KbdUI {
  root?: HTMLAttributes
}

export interface KbdProps {
  label?: string
  ui?: KbdUI
}

export interface KbdSlots {
  default?(): unknown
}

export interface KbdGroupUI {
  root?: HTMLAttributes
}

export interface KbdGroupProps {
  ui?: KbdGroupUI
}

export interface KbdGroupSlots {
  default?(): unknown
}
