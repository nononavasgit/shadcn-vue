import type { ButtonHTMLAttributes, Component, HTMLAttributes, InputHTMLAttributes } from 'vue'

export { default as NumberField } from './NumberField.vue'

export type NumberFieldButtonUI = ButtonHTMLAttributes & {
  as?: string | Component
  asChild?: boolean
}

export type NumberFieldInputUI = InputHTMLAttributes & {
  as?: string | Component
  asChild?: boolean
}

export interface NumberFieldUI {
  content?: HTMLAttributes
  decrement?: NumberFieldButtonUI
  input?: NumberFieldInputUI
  increment?: NumberFieldButtonUI
}

export interface NumberFieldProps {
  modelValue?: number | null
  placeholder?: string
  showDecrement?: boolean
  showIncrement?: boolean
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
