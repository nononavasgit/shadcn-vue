import type { HTMLAttributes } from 'vue'

export { default as Input } from './Input.vue'

export type InputValue = string | number

export interface InputUI {
  root?: HTMLAttributes
}

export interface InputProps {
  modelValue?: InputValue
  defaultValue?: InputValue
  ui?: InputUI
}

export interface InputEmits {
  'update:modelValue': [value: InputValue]
}
