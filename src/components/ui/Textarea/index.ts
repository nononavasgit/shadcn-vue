export { default as Textarea } from './Textarea.vue'

export type TextareaValue = string | number

export interface TextareaProps {
  modelValue?: TextareaValue
  defaultValue?: TextareaValue
}

export interface TextareaEmits {
  'update:modelValue': [value: TextareaValue]
}
