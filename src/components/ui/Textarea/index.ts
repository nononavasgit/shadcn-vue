import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'reka-ui'

export { default as Textarea } from './Textarea.vue'

export type TextareaValue = string | number

export interface TextareaUI {
  root?: HTMLAttributes
}

export interface TextareaProps extends PrimitiveProps {
  modelValue?: TextareaValue
  defaultValue?: TextareaValue
  ui?: TextareaUI
}

export interface TextareaEmits {
  'update:modelValue': [value: TextareaValue]
}
