import type { HTMLAttributes } from 'vue'
import type { DateValue } from '@/composables/useDates'

export { default as Time } from './Time.vue'

export interface TimeProps {
  datetime: DateValue
  locale?: string | string[]
  format?: Intl.DateTimeFormatOptions
  ui?: TimeUI
}

export type TimeFn<T> = T | ((context: TimeContext) => T)

export interface TimeUI {
  root?: TimeFn<HTMLAttributes>
}

export interface TimeContext {
  props: Omit<TimeProps, 'ui'>
  date: string
}

export interface TimeSlots {
  default?(props: TimeContext): unknown
}
