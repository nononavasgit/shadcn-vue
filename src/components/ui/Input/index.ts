export { default as Input } from './Input.vue'

export type InputValue = string | number

export interface InputProps {
  modelValue?: InputValue
  defaultValue?: InputValue
}

export interface InputEmits {
  'update:modelValue': [value: InputValue]
}
