import type { HTMLAttributes } from 'vue'

export type TimelineOrientation = 'vertical' | 'horizontal'
export type TimelineValue = string | number
export { default as Timeline } from './Timeline.vue'

// Item
export interface TimelineItem {
  value: TimelineValue
  label?: string
  description?: string
}

// Context
export interface TimelineItemContext {
  item: TimelineItem
  index: number
  active: boolean
  first: boolean
  last: boolean
  completed: boolean
}

export interface TimelineContext {
  value?: TimelineValue
  items?: TimelineItem[]
}

export type TimelineItemUIValue<T> = T | ((context: TimelineItemContext) => T)

export function resolveTimelineItemUIValue<T>(
  value: TimelineItemUIValue<T> | undefined,
  context: TimelineItemContext,
) {
  return typeof value === 'function'
    ? (value as (context: TimelineItemContext) => T)(context)
    : value
}

// UI
export interface TimelineUI {
  root?: HTMLAttributes
  item?: TimelineItemUIValue<HTMLAttributes>
  header?: TimelineItemUIValue<HTMLAttributes>
  separator?: TimelineItemUIValue<HTMLAttributes>
  indicator?: TimelineItemUIValue<HTMLAttributes>
  label?: TimelineItemUIValue<HTMLAttributes>
  description?: TimelineItemUIValue<HTMLAttributes>
}

// Props
export interface TimelineProps {
  value?: TimelineValue
  items: TimelineItem[]
  orientation?: TimelineOrientation
  ui?: TimelineUI
}

// Slots
export type TimelineSlots = {
  header?: ((props: TimelineContext) => unknown) | undefined
  label?: ((props: TimelineContext) => unknown) | undefined
  description?: ((props: TimelineContext) => unknown) | undefined
  indicator?: ((props: TimelineContext) => unknown) | undefined
} & {
  [name: `header-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
  [name: `indicator-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
  [name: `description-${string}`]: ((props: TimelineItemContext) => unknown) | undefined
}
