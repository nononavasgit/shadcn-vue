import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'reka-ui'

export { default as Textarea } from './Textarea.vue'

export type TextareaValue = string | number

// Fn
export type TextareaFn<T> = T | ((context: TextareaContext) => T)

// UI
export interface TextareaUI {
  root?: TextareaFn<HTMLAttributes>
}

// Props
export interface TextareaProps extends PrimitiveProps {
  value?: TextareaValue
  ui?: TextareaUI
}

// Context
export interface TextareaContext {
  props: Omit<TextareaProps, 'ui'>
  value: TextareaValue
}

// Emits
export interface TextareaEmits {
  'update:value': [value: TextareaValue]
  valueChange: [value: TextareaValue]
}
