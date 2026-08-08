import type { HTMLAttributes } from 'vue'
import type {
  NumberFieldDecrementProps as RekaNumberFieldDecrementProps,
  NumberFieldIncrementProps as RekaNumberFieldIncrementProps,
  NumberFieldRootProps as RekaNumberFieldRootProps,
} from 'reka-ui'
import type { NormalizeIconProps } from '@/components/ui/Icon'

export { default as NumberField } from './NumberField.vue'

export type NumberFieldValue = number | null

// Props Reka
export type NumberFieldIncrementProps = Pick<
  RekaNumberFieldIncrementProps,
  'as' | 'asChild' | 'disabled'
>
export type NumberFieldDecrementProps = Pick<
  RekaNumberFieldDecrementProps,
  'as' | 'asChild' | 'disabled'
>
export type NumberFieldRootProps = Pick<
  RekaNumberFieldRootProps,
  | 'as'
  | 'asChild'
  | 'disabled'
  | 'disableWheelChange'
  | 'focusOnChange'
  | 'formatOptions'
  | 'id'
  | 'invertWheelChange'
  | 'locale'
  | 'min'
  | 'max'
  | 'name'
  | 'readonly'
  | 'required'
  | 'step'
  | 'stepSnapping'
>

// Props
export interface NumberFieldProps extends NumberFieldRootProps {
  value?: NumberFieldValue
  placeholder?: string
  showDecrement?: boolean
  showIncrement?: boolean
  decrement?: NumberFieldDecrementProps
  increment?: NumberFieldIncrementProps
  decrementIcon?: NormalizeIconProps
  incrementIcon?: NormalizeIconProps
  ui?: NumberFieldUI
}

// Fn
export type NumberFieldFn<T> = T | ((context: NumberFieldContext) => T)

// UI
export interface NumberFieldUI {
  root?: NumberFieldFn<HTMLAttributes>
  content?: NumberFieldFn<HTMLAttributes>
  decrement?: NumberFieldFn<HTMLAttributes>
  input?: NumberFieldFn<HTMLAttributes>
  increment?: NumberFieldFn<HTMLAttributes>
}

// Context
export interface NumberFieldContext {
  props: Omit<NumberFieldProps, 'ui' | 'decrementIcon' | 'incrementIcon'>
  value: NumberFieldValue
}

// Emits
export interface NumberFieldEmits {
  'update:value': [value: NumberFieldValue]
  valueChange: [value: NumberFieldValue]
}

// Slots
export interface NumberFieldSlots {
  default?(props: NumberFieldContext): unknown
  decrement?(props: NumberFieldContext): unknown
  input?(props: NumberFieldContext): unknown
  increment?(props: NumberFieldContext): unknown
}
