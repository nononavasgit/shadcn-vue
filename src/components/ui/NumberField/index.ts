import type { NumberFieldRootProps as RekaNumberFieldRootProps } from 'reka-ui'

export { default as NumberField } from './NumberField.vue'
export { numberFieldDefaults } from './defaults'

export type NumberFieldProps = Pick<
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
>

export type NumberFieldValue = RekaNumberFieldRootProps['modelValue']
