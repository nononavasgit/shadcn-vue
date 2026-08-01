import type { HTMLAttributes } from 'vue'
import type { SwitchRootEmits, SwitchRootProps } from 'reka-ui'

export { default as Switch } from './Switch.vue'

export type SwitchValue = boolean | null

export interface SwitchUI {
  root?: HTMLAttributes
}

export interface SwitchProps extends SwitchRootProps<SwitchValue> {
  ui?: SwitchUI
}

export type SwitchEmits = SwitchRootEmits<SwitchValue>

export interface SwitchSlotProps {
  value: SwitchValue
  checked: boolean
}

export interface SwitchSlots {
  thumb?(props: SwitchSlotProps): unknown
}
