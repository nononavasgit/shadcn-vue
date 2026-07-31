import type { HTMLAttributes } from 'vue'
import type { AnnouncerPoliteness } from '@/composables/useAnnouncer'

export { default as Announcer } from './Announcer.vue'

export interface AnnouncerUI {
  root?: HTMLAttributes
}

export interface AnnouncerProps {
  atomic?: boolean
  politeness?: AnnouncerPoliteness
  ui?: AnnouncerUI
}

export interface AnnouncerSlotProps {
  message: string
}

export interface AnnouncerSlots {
  default?(props: AnnouncerSlotProps): unknown
}
