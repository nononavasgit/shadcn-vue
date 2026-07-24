export { default as Input } from './Input.vue'

export interface InputProps {
  modelValue?: string | number
  defaultValue?: string | number
}

export interface InputEmits {
  'update:modelValue': [value: string | number]
}
