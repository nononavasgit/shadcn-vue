import type { HTMLAttributes } from 'vue'

export { default as Timeline } from './Timeline.vue'
export { default as TimelineContent } from './TimelineContent.vue'
export { default as TimelineDate } from './TimelineDate.vue'
export { default as TimelineHeader } from './TimelineHeader.vue'
export { default as TimelineIndicator } from './TimelineIndicator.vue'
export { default as TimelineItem } from './TimelineItem.vue'
export { default as TimelineSeparator } from './TimelineSeparator.vue'
export { default as TimelineTitle } from './TimelineTitle.vue'

export type TimelineClass = HTMLAttributes['class']
export type TimelineOrientation = 'vertical' | 'horizontal'

export interface TimelineProps {
  defaultValue?: number
  value?: number
  orientation?: TimelineOrientation
  class?: TimelineClass
}

export interface TimelineItemProps {
  step: number
  completed?: boolean
  class?: TimelineClass
}

export interface TimelineHeaderProps {
  class?: TimelineClass
}

export interface TimelineDateProps {
  datetime?: string
  class?: TimelineClass
}

export interface TimelineTitleProps {
  class?: TimelineClass
}

export interface TimelineIndicatorProps {
  class?: TimelineClass
}

export interface TimelineSeparatorProps {
  class?: TimelineClass
}

export interface TimelineContentProps {
  class?: TimelineClass
}

export interface TimelineSlots {
  default?(): unknown
}

export interface TimelineItemSlots {
  default?(): unknown
}

export interface TimelineHeaderSlots {
  default?(): unknown
}

export interface TimelineDateSlots {
  default?(): unknown
}

export interface TimelineTitleSlots {
  default?(): unknown
}

export interface TimelineIndicatorSlots {
  default?(): unknown
}

export interface TimelineSeparatorSlots {
  default?(): unknown
}

export interface TimelineContentSlots {
  default?(): unknown
}
