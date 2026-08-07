import type { HTMLAttributes } from 'vue'
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'

export { default as Switch } from './Switch.vue'

export type SwitchValue = boolean | null

// Fn
export type SwitchFn<T> = T | ((context: SwitchContext) => T)

// UI
export interface SwitchUI {
  root?: SwitchFn<HTMLAttributes>
}

// Props
export interface SwitchProps extends Pick<
  SwitchRootProps<SwitchValue>,
  | 'as'
  | 'asChild'
  | 'defaultValue'
  | 'modelValue'
  | 'disabled'
  | 'id'
  | 'name'
  | 'value'
  | 'trueValue'
  | 'falseValue'
  | 'required'
> {
  ui?: SwitchUI
}

// Context
export interface SwitchContext {
  props: Omit<SwitchProps, 'ui'>
  value: SwitchValue
  checked: boolean
}

// Emits
export type SwitchEmits = SwitchRootEmits<SwitchValue>

// Slots
export interface SwitchSlots {
  thumb?(props: SwitchContext): unknown
}
