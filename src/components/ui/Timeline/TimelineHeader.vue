<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { useTimelineContext } from './context'
import type { TimelineHeaderProps, TimelineHeaderSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<TimelineHeaderProps>()

defineSlots<TimelineHeaderSlots>()

const attrs = useAttrs()
const timeline = useTimelineContext()
const headerClass = computed(() =>
  cn(
    'flex gap-1',
    timeline.orientation.value === 'vertical'
      ? 'flex-col items-start'
      : 'w-full flex-col items-center text-center',
    props.class,
  ),
)
</script>

<template>
  <div v-bind="attrs" data-slot="timeline-header" :class="headerClass">
    <slot />
  </div>
</template>
