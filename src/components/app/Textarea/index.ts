export { default as Textarea } from './Textarea.vue'

export interface TextareaProps {
  modelValue?: string | number
  defaultValue?: string | number
}

export interface TextareaEmits {
  'update:modelValue': [value: string | number]
}
