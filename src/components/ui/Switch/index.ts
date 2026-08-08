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
  'as' | 'asChild' | 'disabled' | 'id' | 'name' | 'trueValue' | 'falseValue' | 'required'
> {
  value?: SwitchValue
  ui?: SwitchUI
}

// Context
export interface SwitchContext {
  props: Omit<SwitchProps, 'ui'>
  value: SwitchValue
  checked: boolean
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
