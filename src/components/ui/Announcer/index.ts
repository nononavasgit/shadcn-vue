export type AnnouncerPoliteness = 'assertive' | 'polite' | 'off'

export { default as Announcer } from './Announcer.vue'

// Props
export interface AnnouncerProps {
  atomic?: boolean
  message?: string
  politeness?: AnnouncerPoliteness
}

// Context
export interface AnnouncerContext {
  message: string
}

export function createAnnouncerContext(props: AnnouncerProps): AnnouncerContext {
  return {
    message: props.message ?? '',
  }
}

// Slots
export interface AnnouncerSlots {
  default?(props: AnnouncerContext): unknown
}
