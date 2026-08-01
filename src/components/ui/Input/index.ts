import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'reka-ui'

export { default as Input } from './Input.vue'

export type InputValue = string | number

export interface InputUI {
  root?: HTMLAttributes
}

export interface InputProps extends PrimitiveProps {
  modelValue?: InputValue
  defaultValue?: InputValue
  ui?: InputUI
}

export interface InputEmits {
  'update:modelValue': [value: InputValue]
}
