<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { timelineItemContextKey, useTimelineContext } from './context'
import type { TimelineItemProps, TimelineItemSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<TimelineItemProps>()

defineSlots<TimelineItemSlots>()

const attrs = useAttrs()
const timeline = useTimelineContext()
const step = computed(() => props.step)
const completed = computed(
  () =>
    props.completed ?? (timeline.value.value !== undefined && props.step <= timeline.value.value),
)
const current = computed(() => timeline.value.value === props.step)
const completedAttr = computed(() => (completed.value ? '' : undefined))
const currentAttr = computed(() => (current.value ? '' : undefined))
const itemClass = computed(() =>
  cn(
    'group/timeline-item relative',
    timeline.orientation.value === 'vertical'
      ? 'ps-10 pb-8 last:pb-0'
      : 'flex min-w-0 flex-1 flex-col items-center px-2 pb-6 first:ps-0 last:pe-0',
    props.class,
  ),
)

provide(timelineItemContextKey, { step, completed, current })
</script>

<template>
  <li
    v-bind="attrs"
    data-slot="timeline-item"
    :data-step="step"
    :data-completed="completedAttr"
    :data-current="currentAttr"
    :class="itemClass"
  >
    <slot />
  </li>
</template>
