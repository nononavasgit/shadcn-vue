<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { Progress as ProgressBase, ProgressIndicator } from '@/components/ui/Progress'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import type { ProgressLabelSlotProps, ProgressProps, ProgressSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<ProgressSlots>()

const attrs = useAttrs()
const slots = useSlots()
const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  max: 100,
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
  if (props.value === null) return 0

  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})

const slotProps = computed<ProgressLabelSlotProps>(() => ({
  value: props.value,
  max: props.max,
  percentage: percentage.value,
}))

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    modelValue: props.value,
    max: props.max,
    getValueLabel: props.getValueLabel,
    getValueText: props.getValueText,
    'aria-label': attrs['aria-label'],
    'aria-valuetext': attrs['aria-valuetext'] || props.label,
    class: cn(
      (props.label || slots.label) && 'h-4',
      props.trackColor ? 'bg-(--progress-track-color)' : props.color && 'bg-(--progress-color)/20',
      attrs.class,
    ),
    style: [colorStyle.value, trackColorStyle.value, attrs.style],
  },
  indicator: {
    ...props.ui?.indicator,
    class: cn(props.color && 'bg-(--progress-color)', props.ui?.indicator?.class),
  },
  label: {
    'aria-hidden': true,
    ...props.ui?.label,
    class: cn(
      'pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-2 text-center text-xs font-medium text-white [text-shadow:0_1px_3px_rgb(0_0_0),0_0_7px_rgb(0_0_0/0.9),0_0_12px_rgb(0_0_0/0.7)]',
      props.ui?.label?.class,
    ),
  },
}))
</script>

<template>
  <ProgressBase v-bind="calculatedUI.root">
    <template #indicator="{ percentage: indicatorPercentage }">
      <ProgressIndicator
        v-bind="calculatedUI.indicator"
        :style="[
          { transform: `translateX(-${100 - indicatorPercentage}%)` },
          calculatedUI.indicator.style,
        ]"
      />
    </template>

    <span v-if="props.label || $slots.label" v-bind="calculatedUI.label">
      <slot name="label" v-bind="slotProps">{{ props.label }}</slot>
    </span>
  </ProgressBase>
</template>
