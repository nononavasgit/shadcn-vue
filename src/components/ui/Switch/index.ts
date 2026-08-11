import type { HTMLAttributes } from 'vue'
import type { SwitchRootProps } from 'reka-ui'

export { default as Switch } from './Switch.vue'

export type SwitchValue = boolean | null

// Fn
export type SwitchFn<T> = T | ((context: SwitchContext) => T)

// UI
export interface SwitchUI {
  root?: SwitchFn<HTMLAttributes>
  thumb?: SwitchFn<HTMLAttributes>
}

// Props
export interface SwitchProps extends Pick<
  SwitchRootProps<SwitchValue>,
  'trueValue' | 'falseValue'
> {
  value?: SwitchValue
  ui?: SwitchUI
}

// Context
export interface SwitchContext {
  trueValue: SwitchProps['trueValue']
  falseValue: SwitchProps['falseValue']
  value: SwitchValue
  checked: boolean
}

export function createSwitchContext(props: SwitchProps, value: SwitchValue): SwitchContext {
  const { trueValue, falseValue } = props

  return {
    trueValue,
    falseValue,
    value,
    checked: value === trueValue,
  }
}

// Emits
export interface SwitchEmits {
  'update:value': [value: SwitchValue]
  valueChange: [value: SwitchValue]
}

// Slots
export interface SwitchSlots {
  thumb?(props: SwitchContext): unknown
}
