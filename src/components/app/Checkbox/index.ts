import type { Component } from 'vue'

export { default as Checkbox } from './Checkbox.vue'

export type CheckboxValue = boolean | string | number | bigint | Record<string, unknown>
export type CheckboxState = boolean | 'indeterminate'

export interface CheckboxProps {
  modelValue?: CheckboxValue | 'indeterminate' | null
  defaultValue?: CheckboxValue | 'indeterminate'
  trueValue?: CheckboxValue
  falseValue?: CheckboxValue
  as?: string | Component
  asChild?: boolean
}

export interface CheckboxEmits {
  'update:modelValue': [value: CheckboxValue | 'indeterminate']
}

export interface CheckboxSlotProps {
  modelValue: CheckboxValue | 'indeterminate'
  state: CheckboxState
}
