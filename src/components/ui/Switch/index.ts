import type { HTMLAttributes } from 'vue'
import type { SwitchRootProps } from 'reka-ui'

export { default as Switch } from './Switch.vue'

export type SwitchValue = boolean | number | string
// Fn
export type SwitchFn<T> = (context: SwitchContext) => T

// UI
export interface SwitchUI {
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
  value: SwitchValue
  checked: boolean
  ui: SwitchProps['ui']
}

export function createSwitchContext({
  value,
  props,
}: {
  value: SwitchValue
  props: SwitchProps
}): SwitchContext {
  return {
    value,
    checked: value === props.trueValue,
    ui: props.ui,
  }
}

// Emits
export interface SwitchEmits {
  'update:value': [value: SwitchValue]
}

// Slots
export interface SwitchSlots {
  thumb?(props: SwitchContext): unknown
}
