import type { AnnouncerPoliteness } from '@/composables/useAnnouncer'

export { default as Announcer } from './Announcer.vue'

export interface AnnouncerProps {
  atomic?: boolean
  politeness?: AnnouncerPoliteness
}

export interface AnnouncerSlotProps {
  message: string
}

export interface AnnouncerSlots {
  default?(props: AnnouncerSlotProps): unknown
}
