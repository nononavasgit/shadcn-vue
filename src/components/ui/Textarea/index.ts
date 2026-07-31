import type { HTMLAttributes } from 'vue'

export { default as Textarea } from './Textarea.vue'

export type TextareaValue = string | number

export interface TextareaUI {
  root?: HTMLAttributes
}

export interface TextareaProps {
  modelValue?: TextareaValue
  defaultValue?: TextareaValue
  ui?: TextareaUI
}

export interface TextareaEmits {
  'update:modelValue': [value: TextareaValue]
}
