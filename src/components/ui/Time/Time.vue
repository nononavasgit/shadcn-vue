<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useDates } from '@/composables/useDates'
import { useUi } from '@/composables/useUi'
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

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, timeContext.value))

  return {
    ...attrs,
    ...rootUI,
    datetime: toDatetime(props.datetime),
    'data-allow-mismatch': true,
    class: cn(attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})
</script>

<template>
  <time v-bind="rootProps" data-slot="time">
    <slot v-bind="timeContext">{{ formattedDate }}</slot>
  </time>
</template>
