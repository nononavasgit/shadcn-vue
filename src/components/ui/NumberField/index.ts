import type { NumberFieldRootProps as RekaNumberFieldRootProps } from 'reka-ui'
import type { IconConfig } from '@/components/ui/Icon'

export { default as NumberField } from './NumberField.vue'
export { numberFieldDefaults } from './defaults'

export type NumberFieldValue = RekaNumberFieldRootProps['modelValue']

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
}

export interface NumberFieldSlots {
  decrement?(): unknown
  increment?(): unknown
}
