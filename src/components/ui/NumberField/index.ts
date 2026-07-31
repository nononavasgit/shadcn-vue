import type { Component, HTMLAttributes } from 'vue'

export { default as NumberField } from './NumberField.vue'

export interface NumberFieldIncrementProps {
  as?: string | Component
  asChild?: boolean
  disabled?: boolean
}

export interface NumberFieldDecrementProps {
  as?: string | Component
  asChild?: boolean
  disabled?: boolean
}

export function normalizeNumberFieldIncrementProps(
  source: NumberFieldIncrementProps | null | undefined,
): NumberFieldIncrementProps | undefined {
  if (!source) return undefined

  const { as, asChild, disabled } = source
  return { as, asChild, disabled }
}

export function normalizeNumberFieldDecrementProps(
  source: NumberFieldDecrementProps | null | undefined,
): NumberFieldDecrementProps | undefined {
  if (!source) return undefined

  const { as, asChild, disabled } = source
  return { as, asChild, disabled }
}
export interface NumberFieldUI {
  root?: HTMLAttributes
  content?: HTMLAttributes
  decrement?: HTMLAttributes
  input?: HTMLAttributes
  increment?: HTMLAttributes
}

export interface NumberFieldProps {
  modelValue?: number | null
  placeholder?: string
  showDecrement?: boolean
  showIncrement?: boolean
  decrement?: NumberFieldDecrementProps
  increment?: NumberFieldIncrementProps
  ui?: NumberFieldUI
}

export interface NumberFieldEmits {
  'update:modelValue': [value: number]
}

export interface NumberFieldSlotProps {
  modelValue: number | undefined
  textValue: string
  readonly: boolean
}

export interface NumberFieldSlots {
  default?(props: NumberFieldSlotProps): unknown
  decrement?(props: NumberFieldSlotProps): unknown
  input?(props: NumberFieldSlotProps): unknown
  increment?(props: NumberFieldSlotProps): unknown
}
