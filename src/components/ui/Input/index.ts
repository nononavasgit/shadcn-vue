import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'reka-ui'

export { default as Input } from './Input.vue'

export type InputValue = string

// Fn
export type InputFn<T> = T | ((context: InputContext) => T)

// UI
export interface InputUI {
  root?: InputFn<HTMLAttributes>
}

// Props
export interface InputProps extends PrimitiveProps {
  value?: InputValue
  ui?: InputUI
}

// Context
export interface InputContext {
  props: Omit<InputProps, 'ui'>
  value: InputValue
}

// Emits
export interface InputEmits {
  'update:value': [value: InputValue]
  valueChange: [value: InputValue]
}
