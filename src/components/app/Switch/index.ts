import type { Component } from 'vue'

export { default as Switch } from './Switch.vue'

export interface SwitchProps {
  modelValue?: boolean | null
  defaultValue?: boolean
  value?: string
  trueValue?: boolean
  falseValue?: boolean
  as?: string | Component
  asChild?: boolean
  required?: boolean
}

export interface SwitchEmits {
  'update:modelValue': [value: boolean]
}
