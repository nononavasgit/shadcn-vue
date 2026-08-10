<script setup lang="ts">
import { computed, useAttrs, useSlots, watch } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import type { ProgressContext, ProgressProps, ProgressSlots, ProgressValue } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<ProgressSlots>()

const attrs = useAttrs()
const slots = useSlots()
const props = withDefaults(defineProps<ProgressProps>(), {
  max: 100,
  getValueLabel: undefined,
  getValueText: undefined,
  label: undefined,
  color: undefined,
  trackColor: undefined,
  indicator: undefined,
  ui: undefined,
})
const emit = defineEmits<{ valueChange: [value: ProgressValue] }>()
const value = defineModel<ProgressValue>('value', { default: 0 })

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const { colorStyle } = useColor(
  computed(() => props.color),
  'progress',
)
const { colorStyle: trackColorStyle } = useColor(
  computed(() => props.trackColor),
  'progress-track',
)

const percentage = computed(() => {
  if (value.value === null) return 0

  return Math.min(100, Math.max(0, (value.value / props.max) * 100))
})

const progressContext = computed<ProgressContext>(() => {
  const { ui, ...progressProps } = props
  void ui

  return {
    props: progressProps,
    value: value.value,
    max: props.max,
    percentage: percentage.value,
  }
})

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, progressContext.value))

  return {
    ...attrs,
    ...rootUI,
    as: props.as,
    asChild: props.asChild,
    max: props.max,
    getValueLabel: props.getValueLabel,
    getValueText: props.getValueText,
    'aria-label': rootUI['aria-label'] ?? attrs['aria-label'],
    'aria-valuetext': rootUI['aria-valuetext'] ?? attrs['aria-valuetext'] ?? props.label,
    class: cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
      (props.label || slots.label) && 'h-4',
      props.trackColor ? 'bg-(--progress-track-color)' : props.color && 'bg-(--progress-color)/20',
      attrs.class,
      rootUI.class,
    ),
    style: [colorStyle.value, trackColorStyle.value, attrs.style, rootUI.style],
  }
})

const indicatorProps = computed(() => {
  const indicatorUI = normalizeHTMLAttributes(
    useUi(props.ui?.indicator, progressContext.value),
  )

  return {
    ...indicatorUI,
    as: props.indicator?.as,
    asChild: props.indicator?.asChild,
    class: cn(
      'h-full w-full flex-1 bg-primary transition-all',
      props.color && 'bg-(--progress-color)',
      indicatorUI.class,
    ),
    style: [{ transform: `translateX(-${100 - percentage.value}%)` }, indicatorUI.style],
  }
})

const labelProps = computed(() => {
  const labelUI = normalizeHTMLAttributes(useUi(props.ui?.label, progressContext.value))

  return {
    ...labelUI,
    'aria-hidden': true,
    class: cn(
      'pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-2 text-center text-xs font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0),0_0_7px_rgb(0_0_0/0.9),0_0_12px_rgb(0_0_0/0.7)]',
      labelUI.class,
    ),
  }
})
</script>

<template>
  <ProgressRoot v-bind="rootProps" v-model="value" data-slot="progress">
    <slot name="indicator" v-bind="progressContext">
      <ProgressIndicator v-bind="indicatorProps" data-slot="progress-indicator" />
    </slot>

    <span v-if="props.label || $slots.label" v-bind="labelProps">
      <slot name="label" v-bind="progressContext">{{ props.label }}</slot>
    </span>
  </ProgressRoot>
</template>
