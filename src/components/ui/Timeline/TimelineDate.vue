<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import type { TimelineDateProps, TimelineDateSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<TimelineDateProps>()

defineSlots<TimelineDateSlots>()

const attrs = useAttrs()
const dateClass = cn('text-xs text-muted-foreground', props.class)
</script>

<template>
  <time v-bind="attrs" :datetime="props.datetime" data-slot="timeline-date" :class="dateClass">
    <slot />
  </time>
</template>
