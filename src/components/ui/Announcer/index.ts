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
  props: Required<AnnouncerProps>
  message: string
}

export function createAnnouncerContext(props: AnnouncerProps): AnnouncerContext {
  return {
    props: {
      atomic: props.atomic ?? true,
      message: props.message ?? '',
      politeness: props.politeness ?? 'polite',
    },
    message: props.message ?? '',
  }
}

// Slots
export interface AnnouncerSlots {
  default?(props: AnnouncerContext): unknown
}
