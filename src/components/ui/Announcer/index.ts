import type { HTMLAttributes } from 'vue'
import type { AnnouncerPoliteness } from '@/composables/useAnnouncer'

export { default as Announcer } from './Announcer.vue'

// Fn
export type AnnouncerFn<T> = (context: AnnouncerContext) => T

// Props
export interface AnnouncerUI {
  root?: AnnouncerFn<HTMLAttributes>
}

export interface AnnouncerProps {
  atomic?: boolean
  politeness?: AnnouncerPoliteness
  ui?: AnnouncerUI
}

// Context
export interface AnnouncerContext {
  props: Omit<AnnouncerProps, 'ui'>
  message: string
}

// Slots
export interface AnnouncerSlots {
  default?(props: AnnouncerContext): unknown
}
