<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { useTimelineContext, useTimelineItemContext } from './context'
import type { TimelineIndicatorProps, TimelineIndicatorSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<TimelineIndicatorProps>()

defineSlots<TimelineIndicatorSlots>()

const attrs = useAttrs()
const timeline = useTimelineContext()
const item = useTimelineItemContext()
const completedAttr = computed(() => (item.completed.value ? '' : undefined))
const indicatorClass = computed(() =>
  cn(
    'absolute z-10 flex size-6 items-center justify-center rounded-full border-2 text-xs font-medium transition-colors',
    timeline.orientation.value === 'vertical'
      ? 'start-0 top-0'
      : 'start-1/2 top-0 -translate-x-1/2',
    item.completed.value
      ? 'border-primary bg-primary text-primary-foreground'
      : 'border-border bg-background text-muted-foreground',
    props.class,
  ),
)
</script>

<template>
  <div
    v-bind="attrs"
    data-slot="timeline-indicator"
    :data-completed="completedAttr"
    :class="indicatorClass"
  >
    <slot />
  </div>
</template>
