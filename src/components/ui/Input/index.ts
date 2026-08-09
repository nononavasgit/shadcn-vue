import type { HTMLAttributes } from 'vue'
import type { PrimitiveProps } from 'reka-ui'
import type { EmitsAsProps } from '@/types/emits'

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

// Normalize
export type NormalizeInputProps = InputProps & EmitsAsProps<InputEmits>

export function normalizeInputProps(
  source: NormalizeInputProps | null | undefined,
): NormalizeInputProps | undefined {
  if (!source) return undefined

  const {
    as,
    asChild,
    value,
    ui,
    'onUpdate:value': onUpdateValue,
    onValueChange,
    id,
    disabled,
    readonly,
    name,
    placeholder,
  } = source

  return {
    id,
    disabled,
    readonly,
    name,
    placeholder,
    as,
    asChild,
    value,
    ui,
    'onUpdate:value': onUpdateValue,
    onValueChange,
  }
}
