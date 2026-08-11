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
  'trueValue' | 'falseValue'
> {
  value?: CheckboxModelValue
  ui?: CheckboxUI
}

// Context
export interface CheckboxContext {
  trueValue: CheckboxProps['trueValue']
  falseValue: CheckboxProps['falseValue']
  value: CheckboxModelValue
  state: CheckboxState
}

export function createCheckboxContext(
  props: CheckboxProps,
  value: CheckboxModelValue,
): CheckboxContext {
  return {
    trueValue: props.trueValue,
    falseValue: props.falseValue,
    value,
    state: value === 'indeterminate' ? 'indeterminate' : value === props.trueValue,
  }
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
