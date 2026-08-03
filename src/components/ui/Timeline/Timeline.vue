<script setup lang="ts">
import { computed, provide, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { timelineContextKey } from './context'
import type { TimelineProps, TimelineSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TimelineProps>(), {
  defaultValue: 1,
  value: undefined,
  orientation: 'vertical',
})

defineSlots<TimelineSlots>()

const attrs = useAttrs()
const orientation = computed(() => props.orientation)
const value = computed(() => props.value ?? props.defaultValue)
const rootClass = computed(() =>
  cn(
    'group/timeline m-0 flex w-full list-none p-0',
    orientation.value === 'vertical' ? 'flex-col' : 'flex-row',
    props.class,
  ),
)

provide(timelineContextKey, { orientation, value })
</script>

<template>
  <ol v-bind="attrs" data-slot="timeline" :data-orientation="orientation" :class="rootClass">
    <slot />
  </ol>
</template>
