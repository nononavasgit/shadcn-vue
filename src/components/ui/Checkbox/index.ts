import type { HTMLAttributes } from 'vue'
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'

export { default as Checkbox } from './Checkbox.vue'

export type CheckboxValue = boolean | string | number | bigint | Record<string, unknown>
export type CheckboxState = boolean | 'indeterminate'

// Fn
export type CheckboxFn<T> = T | ((context: CheckboxContext) => T)

// UI
export interface CheckboxUI {
  root?: CheckboxFn<HTMLAttributes>
}

// Props
export interface CheckboxProps extends Pick<
  CheckboxRootProps<CheckboxValue>,
  | 'as'
  | 'asChild'
  | 'defaultValue'
  | 'modelValue'
  | 'disabled'
  | 'id'
  | 'name'
  | 'value'
  | 'trueValue'
  | 'falseValue'
  | 'required'
> {
  ui?: CheckboxUI
}

// Context
export interface CheckboxContext {
  props: Omit<CheckboxProps, 'ui'>
  value: CheckboxValue | 'indeterminate'
  state: CheckboxState
}

// Emits
export type CheckboxEmits = CheckboxRootEmits<CheckboxValue>

// Slots
export interface CheckboxSlots {
  indicator?(props: CheckboxContext): unknown
}
