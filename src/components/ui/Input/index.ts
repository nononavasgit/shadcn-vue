import type { EmitsAsProps } from '@/types/emits'

export { default as Input } from './Input.vue'

export type InputValue = string

// Props
export interface InputProps {
  value?: InputValue
}

// Emits
export interface InputEmits {
  'update:value': [value: InputValue]
}

// Normalize
export type NormalizeInputProps = InputProps & EmitsAsProps<InputEmits>
