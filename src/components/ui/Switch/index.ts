import type { Component } from 'vue'

export { default as Switch } from './Switch.vue'

export type SwitchValue = boolean | null

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
