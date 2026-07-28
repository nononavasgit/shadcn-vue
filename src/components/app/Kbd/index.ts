export { default as Kbd } from './Kbd.vue'
export { default as KbdGroup } from './KbdGroup.vue'

export interface KbdProps {
  label?: string
}

export interface KbdSlots {
  default?(): unknown
}

export interface KbdGroupSlots {
  default?(): unknown
}
