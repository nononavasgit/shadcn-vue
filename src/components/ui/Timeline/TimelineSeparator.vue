<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { useTimelineContext, useTimelineItemContext } from './context'
import type { TimelineSeparatorProps, TimelineSeparatorSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<TimelineSeparatorProps>()

defineSlots<TimelineSeparatorSlots>()

const attrs = useAttrs()
const timeline = useTimelineContext()
const item = useTimelineItemContext()
const separatorClass = computed(() =>
  cn(
    'absolute transition-colors group-last/timeline-item:hidden',
    timeline.orientation.value === 'vertical'
      ? 'start-3 top-6 bottom-0 w-px'
      : 'start-[calc(50%+0.75rem)] end-[-0.5rem] top-3 h-px',
    item.completed.value ? 'bg-primary/40' : 'bg-border',
    props.class,
  ),
)
</script>

<template>
  <div v-bind="attrs" aria-hidden="true" data-slot="timeline-separator" :class="separatorClass" />
</template>
