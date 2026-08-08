<script setup lang="ts">
import { computed, useAttrs, useSlots, watch } from 'vue'
import { ProgressRoot, ProgressIndicator } from 'reka-ui'
import { normalizeHTMLAttributes, normalizeSVGAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import type { ProgressCircularContext, ProgressCircularProps, ProgressCircularSlots } from '.'
import type { ProgressValue } from '@/components/ui/Progress'

defineOptions({ inheritAttrs: false })

defineSlots<ProgressCircularSlots>()

const props = withDefaults(defineProps<ProgressCircularProps>(), {
  max: 100,
  getValueLabel: undefined,
  getValueText: undefined,
  label: undefined,
  color: undefined,
  trackColor: undefined,
  size: 80,
  thickness: 8,
  indicator: undefined,
  ui: undefined,
})
const emit = defineEmits<{ valueChange: [value: ProgressValue] }>()
const value = defineModel<ProgressValue>('value', { default: 0 })

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

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
  const { ui, ...progressCircularProps } = props
  void ui

  return {
    props: progressCircularProps,
    value: value.value,
    max: props.max,
    percentage: percentage.value,
    radius: radius.value,
    circumference: circumference.value,
    dashOffset: dashOffset.value,
  }
})

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, progressCircularContext.value))

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
      'relative inline-grid shrink-0 place-items-center overflow-visible bg-transparent',
      attrs.class,
      rootUI.class,
    ),
    style: [
      { width: cssSize.value, height: cssSize.value },
      colorStyle.value,
      trackColorStyle.value,
      attrs.style,
      rootUI.style,
    ],
  }
})

const svgProps = computed(() => {
  const svgUI = normalizeSVGAttributes(useResolve(props.ui?.svg, progressCircularContext.value))

  return {
    ...svgUI,
    'aria-hidden': true,
    class: cn('size-full -rotate-90', svgUI.class),
  }
})

const trackProps = computed(() => {
  const trackUI = normalizeSVGAttributes(useResolve(props.ui?.track, progressCircularContext.value))

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

const indicatorProps = computed(() => ({
  as: props.indicator?.as,
  asChild: true,
}))

const indicatorCircleProps = computed(() => {
  const indicatorUI = normalizeSVGAttributes(
    useResolve(props.ui?.indicator, progressCircularContext.value),
  )

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
  const labelUI = normalizeHTMLAttributes(
    useResolve(props.ui?.label, progressCircularContext.value),
  )

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
  <ProgressRoot v-bind="rootProps" v-model="value" data-slot="progress-circular">
    <slot name="svg" v-bind="progressCircularContext">
      <svg v-bind="svgProps" data-slot="progress-circular-svg" viewBox="0 0 100 100">
        <slot name="track" v-bind="progressCircularContext">
          <circle v-bind="trackProps" data-slot="progress-circular-track" />
        </slot>

        <slot name="indicator" v-bind="progressCircularContext">
          <ProgressIndicator v-bind="indicatorProps" data-slot="progress-circular-indicator">
            <circle v-bind="indicatorCircleProps" />
          </ProgressIndicator>
        </slot>
      </svg>
    </slot>

    <span v-if="props.label || slots.label" v-bind="labelProps">
      <slot name="label" v-bind="progressCircularContext">{{ props.label }}</slot>
    </span>
  </ProgressRoot>
</template>
