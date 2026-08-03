<script setup lang="ts">
import { useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import type { TimelineTitleProps, TimelineTitleSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<TimelineTitleProps>()

defineSlots<TimelineTitleSlots>()

const attrs = useAttrs()
const titleClass = cn('text-sm font-semibold text-foreground', props.class)
</script>

<template>
  <h3 v-bind="attrs" data-slot="timeline-title" :class="titleClass">
    <slot />
  </h3>
</template>
