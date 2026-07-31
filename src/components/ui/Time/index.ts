import type { HTMLAttributes } from 'vue'
import type { DateValue } from '@/composables/useDates'

export { default as Time } from './Time.vue'

export interface TimeUI {
  root?: HTMLAttributes
}

export interface TimeProps {
  datetime: DateValue
  locale?: string | string[]
  format?: Intl.DateTimeFormatOptions
  ui?: TimeUI
}

export interface TimeSlotProps {
  date: string
}

export interface TimeSlots {
  default?(props: TimeSlotProps): unknown
}
