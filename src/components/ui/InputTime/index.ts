import type { InputContext, InputProps, InputValue } from '@/components/ui/Input'

export { default as InputTime } from './InputTime.vue'

export type InputTimeValue = InputValue

export interface InputTimeProps extends InputProps {
  showClock?: boolean
}

export interface InputTimeContext extends InputContext {
  props: Omit<InputTimeProps, 'ui'>
}

export interface InputTimeEmits {
  'update:value': [value: InputTimeValue]
  valueChange: [value: InputTimeValue]
}
