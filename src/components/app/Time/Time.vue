<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Time as TimeBase } from '@/components/ui/Time'
import { useDate } from '@/composables/useDate'
import type { TimeProps, TimeSlotProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(props: TimeSlotProps): unknown
}>()

const props = defineProps<TimeProps>()
const attrs = useAttrs()
const { formatDate, toDateTime } = useDate()

const formattedDate = computed(() =>
  formatDate(props.datetime, {
    locale: props.locale,
    format: props.format,
  }),
)
const dateTime = computed(() => toDateTime(props.datetime))
</script>

<template>
  <TimeBase v-bind="attrs" :datetime="dateTime" data-allow-mismatch>
    <slot :date="formattedDate">{{ formattedDate }}</slot>
  </TimeBase>
</template>
