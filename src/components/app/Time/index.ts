import type { ValorFecha } from '@/composables/useFechas'

export { default as Time } from './Time.vue'

export interface TimeProps {
  datetime: ValorFecha
  locale?: string | string[]
  formato?: Intl.DateTimeFormatOptions
}

export interface TimeSlotProps {
  fecha: string
}

export interface TimeSlots {
  default?(props: TimeSlotProps): unknown
}
