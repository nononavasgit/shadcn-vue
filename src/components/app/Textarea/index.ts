export { default as Textarea } from './Textarea.vue'

export interface TextareaProps {
  modelValue?: string | number
  valorPredeterminado?: string | number
}

export interface TextareaEmits {
  'update:modelValue': [valor: string | number]
}
