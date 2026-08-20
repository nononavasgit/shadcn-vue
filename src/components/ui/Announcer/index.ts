export type AnnouncerPoliteness = 'assertive' | 'polite' | 'off'

export { default as Announcer } from './Announcer.vue'

// Props
export interface AnnouncerProps {
  atomic?: boolean
  message?: string
  politeness?: AnnouncerPoliteness
}

// Slots
export interface AnnouncerSlots {
  default?(): unknown
}
