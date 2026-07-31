import type { Component, HTMLAttributes } from 'vue'

export { default as Switch } from './Switch.vue'

export type SwitchValue = boolean | null

export interface SwitchUI {
  root?: HTMLAttributes
}

export interface SwitchProps {
  modelValue?: SwitchValue
  defaultValue?: boolean
  disabled?: boolean
  id?: string
  name?: string
  value?: string
  as?: string | Component
  asChild?: boolean
  required?: boolean
  ui?: SwitchUI
}

export interface SwitchEmits {
  'update:modelValue': [value: boolean]
}

export interface SwitchSlotProps {
  value: SwitchValue
  checked: boolean
}

export interface SwitchSlots {
  thumb?(props: SwitchSlotProps): unknown
}
