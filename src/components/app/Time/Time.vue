<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Time as TimeBase } from '@/components/ui/Time'
import { useDates } from '@/composables/useDates'
import type { TimeProps, TimeSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<TimeProps>()
defineSlots<TimeSlots>()

const attrs = useAttrs()
const { formatDate, toDatetime } = useDates()
const formattedDate = computed(() =>
  formatDate(props.datetime, {
    locale: props.locale,
    format: props.format,
  }),
)
const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    datetime: toDatetime(props.datetime),
    'data-allow-mismatch': true,
  },
}))
</script>

<template>
  <TimeBase v-bind="calculatedUI.root">
    <slot :date="formattedDate">{{ formattedDate }}</slot>
  </TimeBase>
</template>
