import type {
  RadioGroupItemProps as RekaRadioGroupItemProps,
  RadioGroupRootProps as RekaRadioGroupRootProps,
} from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as RadioGroup } from './RadioGroup.vue'
export { default as RadioGroupItem } from './RadioGroupItem.vue'

export type RadioGroupValue = string | number

// Props Reka
export type RadioGroupRootProps = Pick<
  RekaRadioGroupRootProps,
  'disabled' | 'name' | 'required' | 'orientation' | 'dir' | 'loop' | 'as' | 'asChild'
>

export type RadioGroupItemProps = Omit<
  Pick<
    RekaRadioGroupItemProps,
    'value' | 'disabled' | 'id' | 'name' | 'required' | 'as' | 'asChild'
  >,
  'value'
> & {
  value: RadioGroupValue
}

export function normalizeRadioGroupItemProps(
  source: RadioGroupItemProps,
): Pick<RadioGroupItemProps, 'value' | 'disabled'> {
  const { value, disabled } = source
  return { value, disabled }
}

export interface RadioGroupOption extends Pick<RadioGroupItemProps, 'value' | 'disabled'> {
  label: string
  description?: string
}
export type RadioGroupItem = RadioGroupOption

// Fn
export type RadioGroupFn<T> = T | ((context: RadioGroupContext) => T)
export type RadioGroupItemFn<T> = T | ((context: RadioGroupItemContext) => T)

// UI
export interface RadioGroupUI {
  root?: RadioGroupFn<HTMLAttributes>
  item?: RadioGroupItemFn<HTMLAttributes>
  radio?: RadioGroupItemFn<HTMLAttributes>
  content?: RadioGroupItemFn<HTMLAttributes>
  label?: RadioGroupItemFn<HTMLAttributes>
  description?: RadioGroupItemFn<HTMLAttributes>
}

// Props
export interface RadioGroupProps extends RadioGroupRootProps {
  grouped?: boolean
  radioPosition?: 'left' | 'right'
  rovingFocus?: boolean
  items?: RadioGroupOption[]
  ui?: RadioGroupUI
}

// Context
export interface RadioGroupContext {
  props: Omit<RadioGroupProps, 'ui'>
  value: RadioGroupValue | undefined
}

export interface RadioGroupItemContext extends RadioGroupContext {
  item: RadioGroupOption
  index: number
  selected: boolean
}

// Emits
export interface RadioGroupEmits {
  'update:value': [value: RadioGroupValue | undefined]
  valueChange: [value: RadioGroupValue | undefined]
}

// Slots
export interface RadioGroupSlots {
  default?(props: { value: RadioGroupValue | undefined }): unknown
  item?(props: RadioGroupItemContext): unknown
  leading?(props: RadioGroupItemContext): unknown
  trailing?(props: RadioGroupItemContext): unknown
  [name: `leading-${string}`]: ((props: RadioGroupItemContext) => unknown) | undefined
  [name: `trailing-${string}`]: ((props: RadioGroupItemContext) => unknown) | undefined
}

export interface RadioGroupItemSlots {
  default?(props: { checked: boolean; value: RadioGroupValue }): unknown
}
