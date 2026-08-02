import type { HTMLAttributes } from 'vue'
import type {
  NumberFieldDecrementProps as RekaNumberFieldDecrementProps,
  NumberFieldIncrementProps as RekaNumberFieldIncrementProps,
  NumberFieldRootEmits,
  NumberFieldRootProps as RekaNumberFieldRootProps,
} from 'reka-ui'

export { default as NumberField } from './NumberField.vue'

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
  | 'defaultValue'
  | 'disabled'
  | 'disableWheelChange'
  | 'focusOnChange'
  | 'formatOptions'
  | 'invertWheelChange'
  | 'min'
  | 'max'
  | 'modelValue'
  | 'name'
  | 'readonly'
  | 'required'
  | 'step'
  | 'stepSnapping'
>

export function normalizeNumberFieldIncrementProps(
  source: NumberFieldIncrementProps | null | undefined,
): NumberFieldIncrementProps | undefined {
  if (!source) return undefined

  const { as, asChild, disabled } = source
  return { as, asChild, disabled }
}

export function normalizeNumberFieldDecrementProps(
  source: NumberFieldDecrementProps | null | undefined,
): NumberFieldDecrementProps | undefined {
  if (!source) return undefined

  const { as, asChild, disabled } = source
  return { as, asChild, disabled }
}

export function normalizeNumberFieldRootProps(
  source: NumberFieldRootProps | null | undefined,
): NumberFieldRootProps | undefined {
  if (!source) return undefined

  const {
    as,
    asChild,
    defaultValue,
    disabled,
    disableWheelChange,
    focusOnChange,
    formatOptions,
    invertWheelChange,
    min,
    max,
    modelValue,
    name,
    readonly,
    required,
    step,
    stepSnapping,
  } = source

  return {
    as,
    asChild,
    defaultValue,
    disabled,
    disableWheelChange,
    focusOnChange,
    formatOptions,
    invertWheelChange,
    min,
    max,
    modelValue,
    name,
    readonly,
    required,
    step,
    stepSnapping,
  }
}

// UI
export interface NumberFieldUI {
  root?: HTMLAttributes
  content?: HTMLAttributes
  decrement?: HTMLAttributes
  input?: HTMLAttributes
  increment?: HTMLAttributes
}

// Props
export interface NumberFieldProps extends NumberFieldRootProps {
  placeholder?: string
  showDecrement?: boolean
  showIncrement?: boolean
  decrement?: NumberFieldDecrementProps
  increment?: NumberFieldIncrementProps
  ui?: NumberFieldUI
}

// Emits
export type NumberFieldEmits = NumberFieldRootEmits

// SlotProps
export interface NumberFieldSlotProps {
  modelValue: number | undefined
  textValue: string
  readonly: boolean
}

// Slots
export interface NumberFieldSlots {
  default?(props: NumberFieldSlotProps): unknown
  decrement?(props: NumberFieldSlotProps): unknown
  input?(props: NumberFieldSlotProps): unknown
  increment?(props: NumberFieldSlotProps): unknown
}
