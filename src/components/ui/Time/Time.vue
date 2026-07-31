<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Time as TimeBase } from '@/components/primitives/Time'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useDates } from '@/composables/useDates'
import { cn } from '@/lib/utils'
import type { TimeProps, TimeSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TimeProps>(), {
  locale: undefined,
  format: undefined,
  ui: undefined,
})
defineSlots<TimeSlots>()

const attrs = useAttrs()
const { formatDate, toDatetime } = useDates()
const formattedDate = computed(() =>
  formatDate(props.datetime, {
    locale: props.locale,
    format: props.format,
  }),
)
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)

  return {
    root: {
      ...attrs,
      ...rootUI,
      datetime: toDatetime(props.datetime),
      'data-allow-mismatch': true,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <TimeBase v-bind="calculatedUI.root">
    <slot :date="formattedDate">{{ formattedDate }}</slot>
  </TimeBase>
</template>
