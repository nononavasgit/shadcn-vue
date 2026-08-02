import type { HTMLAttributes } from 'vue'
import type { CheckboxRootEmits, CheckboxRootProps } from 'reka-ui'

export { default as Checkbox } from './Checkbox.vue'

export type CheckboxValue = boolean | string | number | bigint | Record<string, unknown>
export type CheckboxState = boolean | 'indeterminate'

export interface CheckboxUI {
  root?: HTMLAttributes
}

export interface CheckboxProps extends CheckboxRootProps<CheckboxValue> {
  ui?: CheckboxUI
}

export type CheckboxEmits = CheckboxRootEmits<CheckboxValue>

export interface CheckboxSlotProps {
  value: CheckboxValue | 'indeterminate'
  state: CheckboxState
}

export interface CheckboxSlots {
  indicator?(props: CheckboxSlotProps): unknown
}
