import type { Component, HTMLAttributes } from 'vue'

export { default as RadioGroup } from './RadioGroup.vue'
export { default as RadioGroupItem } from './RadioGroupItem.vue'

export type RadioGroupValue = string | number

export interface RadioGroupItemProps {
  value: RadioGroupValue
  disabled?: boolean
  id?: string
  name?: string
  required?: boolean
  as?: string | Component
  asChild?: boolean
}

export function normalizeRadioGroupItemProps(source: RadioGroupItemProps): RadioGroupItemProps {
  const { value, disabled, id, name, required, as, asChild } = source
  return { value, disabled, id, name, required, as, asChild }
}

export interface RadioGroupOption extends RadioGroupItemProps {
  label: string
  description?: string
}

export type RadioGroupItem = RadioGroupOption

// Context RadioGroup
export interface RadioGroupUIContext {
  item: RadioGroupOption
  index: number
  selected: boolean
}

export type RadioGroupUIValue<T> = T | ((context: RadioGroupUIContext) => T)

export interface RadioGroupUI {
  root?: HTMLAttributes
  item?: RadioGroupUIValue<HTMLAttributes>
  radio?: RadioGroupUIValue<HTMLAttributes>
  content?: RadioGroupUIValue<HTMLAttributes>
  label?: RadioGroupUIValue<HTMLAttributes>
  description?: RadioGroupUIValue<HTMLAttributes>
}

export interface RadioGroupProps {
  modelValue?: RadioGroupValue
  defaultValue?: RadioGroupValue
  disabled?: boolean
  name?: string
  required?: boolean
  orientation?: 'horizontal' | 'vertical'
  grouped?: boolean
  radioPosition?: 'left' | 'right'
  dir?: 'ltr' | 'rtl'
  loop?: boolean
  rovingFocus?: boolean
  as?: string | Component
  asChild?: boolean
  items?: RadioGroupOption[]
  ui?: RadioGroupUI
}

export interface RadioGroupEmits {
  'update:modelValue': [value: RadioGroupValue]
}

export interface RadioGroupSlots {
  default?(props: { modelValue: RadioGroupValue | undefined }): unknown
  item?(props: RadioGroupUIContext): unknown
  leading?(props: RadioGroupUIContext): unknown
  trailing?(props: RadioGroupUIContext): unknown
  [name: `leading-${string}`]: ((props: RadioGroupUIContext) => unknown) | undefined
  [name: `trailing-${string}`]: ((props: RadioGroupUIContext) => unknown) | undefined
}

export interface RadioGroupItemSlots {
  default?(props: { checked: boolean; value: RadioGroupValue }): unknown
}
