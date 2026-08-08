import type { HTMLAttributes } from 'vue'
import type { CheckboxRootProps } from 'reka-ui'

export { default as Checkbox } from './Checkbox.vue'

export type CheckboxValue = boolean | string | number | bigint | Record<string, unknown>
export type CheckboxModelValue = CheckboxValue | 'indeterminate'
export type CheckboxState = boolean | 'indeterminate'

// Fn
export type CheckboxFn<T> = T | ((context: CheckboxContext) => T)

// UI
export interface CheckboxUI {
  root?: CheckboxFn<HTMLAttributes>
  indicator?: CheckboxFn<HTMLAttributes>
}

// Props
export interface CheckboxProps extends Pick<
  CheckboxRootProps<CheckboxValue>,
  'as' | 'asChild' | 'disabled' | 'id' | 'name' | 'trueValue' | 'falseValue' | 'required'
> {
  value?: CheckboxModelValue
  ui?: CheckboxUI
}

// Context
export interface CheckboxContext {
  props: Omit<CheckboxProps, 'ui'>
  value: CheckboxModelValue
  state: CheckboxState
}

// Emits
export interface CheckboxEmits {
  'update:value': [value: CheckboxModelValue]
  valueChange: [value: CheckboxModelValue]
}

// Slots
export interface CheckboxSlots {
  indicator?(props: CheckboxContext): unknown
}
