<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { Progress, ProgressIndicator } from '@/components/primitives/Progress'
import { normalizeHTMLAttributes, normalizeSVGAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import type {
  ProgressCircularLabelSlotProps,
  ProgressCircularProps,
  ProgressCircularSlots,
} from '.'

defineOptions({ inheritAttrs: false })

defineSlots<ProgressCircularSlots>()

const props = withDefaults(defineProps<ProgressCircularProps>(), {
  value: 0,
  max: 100,
  getValueLabel: undefined,
  getValueText: undefined,
  label: undefined,
  color: undefined,
  trackColor: undefined,
  size: 80,
  thickness: 8,
  ui: undefined,
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
  if (props.value === null) return 0

  return Math.min(100, Math.max(0, (props.value / props.max) * 100))
})

const radius = computed(() => (100 - props.thickness) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - percentage.value / 100))
const cssSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))

const slotProps = computed<ProgressCircularLabelSlotProps>(() => ({
  value: props.value,
  max: props.max,
  percentage: percentage.value,
}))

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const svgUI = normalizeSVGAttributes(props.ui?.svg)
  const trackUI = normalizeSVGAttributes(props.ui?.track)
  const indicatorUI = normalizeSVGAttributes(props.ui?.indicator)
  const labelUI = normalizeHTMLAttributes(props.ui?.label)

  return {
    root: {
      ...attrs,
      ...rootUI,
      modelValue: props.value,
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
    },
    svg: {
      ...svgUI,
      'aria-hidden': true,
      class: cn('size-full -rotate-90', svgUI.class),
    },
    track: {
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
    },
    indicator: {
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
    },
    label: {
      ...labelUI,
      'aria-hidden': true,
      class: cn(
        'pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center text-sm font-semibold',
        labelUI.class,
      ),
    },
  }
})
</script>

<template>
  <Progress v-bind="calculatedUI.root">
    <template #indicator>
      <svg v-bind="calculatedUI.svg" viewBox="0 0 100 100">
        <circle v-bind="calculatedUI.track" />

        <ProgressIndicator as-child>
          <circle v-bind="calculatedUI.indicator" />
        </ProgressIndicator>
      </svg>
    </template>

    <span v-if="props.label || slots.label" v-bind="calculatedUI.label">
      <slot name="label" v-bind="slotProps">{{ props.label }}</slot>
    </span>
  </Progress>
</template>
