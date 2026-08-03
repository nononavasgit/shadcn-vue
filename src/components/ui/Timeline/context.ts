import { inject, type ComputedRef, type InjectionKey } from 'vue'
import type { TimelineOrientation } from '.'

export interface TimelineContext {
  orientation: ComputedRef<TimelineOrientation>
  value: ComputedRef<number | undefined>
}

export interface TimelineItemContext {
  step: ComputedRef<number>
  completed: ComputedRef<boolean>
  current: ComputedRef<boolean>
}

export const timelineContextKey: InjectionKey<TimelineContext> = Symbol('timeline')
export const timelineItemContextKey: InjectionKey<TimelineItemContext> = Symbol('timeline-item')

export function useTimelineContext() {
  const context = inject(timelineContextKey)

  if (!context) {
    throw new Error('Timeline components must be used inside <Timeline>.')
  }

  return context
}

export function useTimelineItemContext() {
  const context = inject(timelineItemContextKey)

  if (!context) {
    throw new Error('Timeline item components must be used inside <TimelineItem>.')
  }

  return context
}
