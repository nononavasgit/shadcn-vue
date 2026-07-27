export { default as Input } from './Input.vue'

export interface InputProps {
  modelValue?: string
  valorPredeterminado?: string
}

export interface InputEmits {
  'update:modelValue': [valor: string]
}
