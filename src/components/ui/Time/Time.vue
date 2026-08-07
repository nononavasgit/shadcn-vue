<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useDates } from '@/composables/useDates'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { TimeContext, TimeProps, TimeSlots } from '.'

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
const timeContext = computed<TimeContext>(() => {
  const { ui, ...timeProps } = props
  void ui

  return {
    props: timeProps,
    date: formattedDate.value,
  }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, timeContext.value))

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
  <time v-bind="calculatedUI.root" data-slot="time">
    <slot v-bind="timeContext">{{ formattedDate }}</slot>
  </time>
</template>
