import type { DateValue } from '@/composables/useDate'

export { default as Time } from './Time.vue'

export interface TimeProps {
  datetime: DateValue
  locale?: string | string[]
  format?: Intl.DateTimeFormatOptions
}

export interface TimeSlotProps {
  date: string
}
