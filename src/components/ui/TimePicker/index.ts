import type { InputContext, InputProps, InputValue } from '@/components/ui/Input'

export { default as TimePicker } from './TimePicker.vue'

export type TimePickerValue = InputValue

export interface TimePickerProps extends InputProps {
  showClock?: boolean
}

export interface TimePickerContext extends InputContext {
  props: Omit<TimePickerProps, 'ui'>
}

export interface TimePickerEmits {
  'update:value': [value: TimePickerValue]
  valueChange: [value: TimePickerValue]
}
