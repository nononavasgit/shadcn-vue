import type { NumberFieldRootProps as RekaNumberFieldRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { IconConfig } from '@/components/ui/Icon'

export { default as NumberField } from './NumberField.vue'
export { numberFieldDefaults } from './defaults'

export type NumberFieldValue = RekaNumberFieldRootProps['modelValue']

export type NumberFieldFn<T> = () => T

export interface NumberFieldUI {
  input?: NumberFieldFn<HTMLAttributes>
  increment?: NumberFieldFn<HTMLAttributes>
  decrement?: NumberFieldFn<HTMLAttributes>
}

export interface NumberFieldProps extends Pick<
  RekaNumberFieldRootProps,
  | 'min'
  | 'max'
  | 'disabled'
  | 'disableWheelChange'
  | 'focusOnChange'
  | 'formatOptions'
  | 'id'
  | 'locale'
  | 'name'
  | 'readonly'
  | 'required'
  | 'step'
  | 'stepSnapping'
> {
  iconDecrement?: IconConfig
  iconIncrement?: IconConfig
  ui?: NumberFieldUI
}

export interface NumberFieldSlots {
  decrement?(): unknown
  increment?(): unknown
}
