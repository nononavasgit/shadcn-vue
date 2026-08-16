export { default as Textarea } from './Textarea.vue'

export type TextareaValue = string | number

// Props
export interface TextareaProps {
  value?: TextareaValue
}

// Emits
export interface TextareaEmits {
  'update:value': [value: TextareaValue]
  valueChange: [value: TextareaValue]
}
