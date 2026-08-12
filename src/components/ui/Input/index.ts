import type { HTMLAttributes } from 'vue'
import type { EmitsAsProps } from '@/types/emits'

export { default as Input } from './Input.vue'

export type InputValue = string

// Fn
export type InputFn<T> = (context: InputContext) => T

// UI
export interface InputUI {
  root?: InputFn<HTMLAttributes>
}

// Props
export interface InputProps {
  value?: InputValue
  ui?: InputUI
}

// Context
export interface InputContext {
  value: InputValue
}

export function createInputContext(value: InputValue): InputContext {
  return {
    value,
  }
}

// Emits
export interface InputEmits {
  'update:value': [value: InputValue]
  valueChange: [value: InputValue]
}

// Normalize
export type NormalizeInputProps = InputProps & EmitsAsProps<InputEmits>

export function normalizeInputProps(
  source: NormalizeInputProps | null | undefined,
): NormalizeInputProps | undefined {
  if (!source) return undefined

  const { value, ui, 'onUpdate:value': onUpdateValue, onValueChange } = source

  return {
    value,
    ui,
    'onUpdate:value': onUpdateValue,
    onValueChange,
  }
}
