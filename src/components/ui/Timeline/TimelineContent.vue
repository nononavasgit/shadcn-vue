<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { useTimelineContext } from './context'
import type { TimelineContentProps, TimelineContentSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<TimelineContentProps>()

defineSlots<TimelineContentSlots>()

const attrs = useAttrs()
const timeline = useTimelineContext()
const contentClass = computed(() =>
  cn(
    'text-sm text-muted-foreground',
    timeline.orientation.value === 'vertical' ? 'mt-2' : 'mt-3 w-full text-center',
    props.class,
  ),
)
</script>

<template>
  <div v-bind="attrs" data-slot="timeline-content" :class="contentClass">
    <slot />
  </div>
</template>
