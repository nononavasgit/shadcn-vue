import type { HTMLAttributes } from 'vue'

export { default as Textarea } from './Textarea.vue'

export type TextareaValue = string | number

// Fn
export type TextareaFn<T> = (context: TextareaContext) => T

// UI
export interface TextareaUI {
  root?: TextareaFn<HTMLAttributes>
}

// Props
export interface TextareaProps {
  value?: TextareaValue
  ui?: TextareaUI
}

// Context
export interface TextareaContext {
  value: TextareaValue
}

export function createTextareaContext(value: TextareaValue): TextareaContext {
  return {
    value,
  }
}

// Emits
export interface TextareaEmits {
  'update:value': [value: TextareaValue]
  valueChange: [value: TextareaValue]
}
