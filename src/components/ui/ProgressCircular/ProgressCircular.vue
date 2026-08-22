<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { ProgressRoot, ProgressIndicator } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import type { ProgressCircularContext, ProgressCircularProps, ProgressCircularSlots } from '.'
import type { ProgressValue } from '@/components/ui/Progress'
import { progressCircularDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

defineSlots<ProgressCircularSlots>()

const props = withDefaults(defineProps<ProgressCircularProps>(), progressCircularDefaults)
const value = defineModel<ProgressValue>('value', { default: progressCircularDefaults.value })

const attrs = useAttrs()
const slots = useSlots()

const { colorStyle } = useColor(
  computed(() => props.color),
  'progress-circular',
)
const { colorStyle: trackColorStyle } = useColor(
  computed(() => props.trackColor),
  'progress-circular-track',
)

const percentage = computed(() => {
  if (value.value === null) return 0

  return Math.min(100, Math.max(0, (value.value / props.max) * 100))
})

const radius = computed(() => (100 - props.thickness) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - percentage.value / 100))
const cssSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))

const progressCircularContext = computed<ProgressCircularContext>(() => {
  return {
    value: value.value,
    max: props.max,
    percentage: percentage.value,
  }
})

const rootProps = computed(() => {
  return {
    ...attrs,
    max: props.max,
    getValueLabel: props.getValueLabel,
    getValueText: props.getValueText,
    'aria-label': attrs['aria-label'],
    class: cn(
      'relative inline-grid shrink-0 place-items-center overflow-visible bg-transparent',
      attrs.class,
    ),
    style: [
      { width: cssSize.value, height: cssSize.value },
      colorStyle.value,
      trackColorStyle.value,
      attrs.style,
    ],
  }
})

const svgProps = computed(() => {
  const svgUI = useUi(props.ui?.svg, progressCircularContext.value)

  return {
    ...svgUI,
    'aria-hidden': true,
    class: cn('size-full -rotate-90', svgUI.class),
  }
})

const trackProps = computed(() => {
  const trackUI = useUi(props.ui?.track, progressCircularContext.value)

  return {
    ...trackUI,
    cx: '50',
    cy: '50',
    r: radius.value,
    'stroke-width': props.thickness,
    class: cn(
      'fill-none stroke-primary/20',
      props.trackColor
        ? 'stroke-(--progress-circular-track-color)'
        : props.color && 'stroke-(--progress-circular-color)/20',
      trackUI.class,
    ),
  }
})

const indicatorCircleProps = computed(() => {
  const indicatorUI = useUi(props.ui?.indicator, progressCircularContext.value)

  return {
    ...indicatorUI,
    cx: '50',
    cy: '50',
    r: radius.value,
    'stroke-width': props.thickness,
    'stroke-linecap': 'round' as const,
    'stroke-dasharray': circumference.value,
    'stroke-dashoffset': dashOffset.value,
    class: cn(
      'h-auto w-auto flex-none fill-none stroke-primary transition-[stroke-dashoffset] duration-300 ease-out',
      props.color && 'stroke-(--progress-circular-color)',
      indicatorUI.class,
    ),
    style: indicatorUI.style,
  }
})

const labelProps = computed(() => {
  const labelUI = useUi(props.ui?.label, progressCircularContext.value)

  return {
    ...labelUI,
    'aria-hidden': true,
    class: cn(
      'pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center text-sm font-semibold',
      labelUI.class,
    ),
  }
})
</script>

<template>
  <ProgressRoot
    v-bind="rootProps"
    v-model="value"
    data-slot="progress-circular"
    data-test-progress-circular-root
  >
    <svg
      v-bind="svgProps"
      data-slot="progress-circular-svg"
      data-test-progress-circular-svg
      viewBox="0 0 100 100"
    >
      <circle
        v-bind="trackProps"
        data-slot="progress-circular-track"
        data-test-progress-circular-track
      />

      <ProgressIndicator as-child data-slot="progress-circular-indicator">
        <circle v-bind="indicatorCircleProps" data-test-progress-circular-indicator />
      </ProgressIndicator>
    </svg>

    <span
      v-if="props.label || slots.label"
      v-bind="labelProps"
      data-slot="progress-circular-label"
      data-test-progress-circular-label
    >
      <slot name="label" v-bind="progressCircularContext">{{ props.label }}</slot>
    </span>
  </ProgressRoot>
</template>
