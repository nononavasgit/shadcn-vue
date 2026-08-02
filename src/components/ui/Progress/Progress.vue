<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import type { ProgressLabelSlotProps, ProgressProps, ProgressSlots } from '.'

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
  ui: undefined,
})
const modelValue = defineModel<number | null>({ default: 0 })

const { colorStyle } = useColor(
  computed(() => props.color),
  'progress',
)
const { colorStyle: trackColorStyle } = useColor(
  computed(() => props.trackColor),
  'progress-track',
)

const percentage = computed(() => {
  if (modelValue.value === null) return 0

  return Math.min(100, Math.max(0, (modelValue.value / props.max) * 100))
})

const slotProps = computed<ProgressLabelSlotProps>(() => ({
  value: modelValue.value,
  max: props.max,
  percentage: percentage.value,
}))

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const indicatorUI = normalizeHTMLAttributes(props.ui?.indicator)
  const labelUI = normalizeHTMLAttributes(props.ui?.label)

  return {
    root: {
      ...attrs,
      ...rootUI,
      modelValue: modelValue.value,
      max: props.max,
      getValueLabel: props.getValueLabel,
      getValueText: props.getValueText,
      'aria-label': rootUI['aria-label'] ?? attrs['aria-label'],
      'aria-valuetext': rootUI['aria-valuetext'] ?? attrs['aria-valuetext'] ?? props.label,
      class: cn(
        'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
        (props.label || slots.label) && 'h-4',
        props.trackColor
          ? 'bg-(--progress-track-color)'
          : props.color && 'bg-(--progress-color)/20',
        attrs.class,
        rootUI.class,
      ),
      style: [colorStyle.value, trackColorStyle.value, attrs.style, rootUI.style],
    },
    indicator: {
      ...indicatorUI,
      class: cn(
        'h-full w-full flex-1 bg-primary transition-all',
        props.color && 'bg-(--progress-color)',
        indicatorUI.class,
      ),
    },
    label: {
      ...labelUI,
      'aria-hidden': true,
      class: cn(
        'pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-2 text-center text-xs font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0),0_0_7px_rgb(0_0_0/0.9),0_0_12px_rgb(0_0_0/0.7)]',
        labelUI.class,
      ),
    },
  }
})
</script>

<template>
  <ProgressRoot v-bind="calculatedUI.root" data-slot="progress">
    <slot name="indicator" v-bind="slotProps">
      <ProgressIndicator
        v-bind="calculatedUI.indicator"
        data-slot="progress-indicator"
        :style="[{ transform: `translateX(-${100 - percentage}%)` }, calculatedUI.indicator.style]"
      />
    </slot>

    <span v-if="props.label || $slots.label" v-bind="calculatedUI.label">
      <slot name="label" v-bind="slotProps">{{ props.label }}</slot>
    </span>
  </ProgressRoot>
</template>
