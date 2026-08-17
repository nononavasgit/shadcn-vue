import type { HTMLAttributes } from 'vue'
import type { CheckboxRootProps } from 'reka-ui'

export { default as Checkbox } from './Checkbox.vue'

export type CheckboxValue = boolean | string | number | bigint | Record<string, unknown>
export type CheckboxModelValue = CheckboxValue | 'indeterminate'
export type CheckboxState = boolean | 'indeterminate'

// Fn
export type CheckboxFn<T> = (context: CheckboxContext) => T

// UI
export interface CheckboxUI {
  indicator?: CheckboxFn<HTMLAttributes>
}

// Props
export interface CheckboxProps extends Pick<
  CheckboxRootProps<CheckboxValue>,
  'trueValue' | 'falseValue'
> {
  value?: CheckboxModelValue
  ui?: CheckboxUI
}

// Context
export interface CheckboxContext {
  value: CheckboxModelValue
  state: CheckboxState
}

export function createCheckboxContext(
  value: CheckboxModelValue,
  trueValue: CheckboxProps['trueValue'] = true,
): CheckboxContext {
  return {
    value,
    state: value === 'indeterminate' ? 'indeterminate' : value === trueValue,
  }
}

// Emits
export interface CheckboxEmits {
  'update:value': [value: CheckboxModelValue]
}

// Slots
export interface CheckboxSlots {
  indicator?(props: CheckboxContext): unknown
}
