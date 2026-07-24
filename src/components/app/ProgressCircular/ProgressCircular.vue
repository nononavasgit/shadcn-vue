<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { Progress, ProgressIndicator } from '@/components/ui/Progress'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import type { ProgressCircularLabelSlotProps, ProgressCircularProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  label?(props: ProgressCircularLabelSlotProps): unknown
}>()

const props = withDefaults(defineProps<ProgressCircularProps>(), {
  value: 0,
  max: 100,
  size: 80,
  strokeWidth: 8,
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

const radius = computed(() => (100 - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const dashOffset = computed(() => circumference.value * (1 - percentage.value / 100))
const cssSize = computed(() => (typeof props.size === 'number' ? `${props.size}px` : props.size))

const slotProps = computed<ProgressCircularLabelSlotProps>(() => ({
  value: props.value,
  max: props.max,
  percentage: percentage.value,
}))

const uiCalculado = computed(() => ({
  root: {
    ...attrs,
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
  },
  svg: {
    ...props.ui?.svg,
    class: cn('size-full -rotate-90', props.ui?.svg?.class),
  },
  track: {
    ...props.ui?.track,
    class: cn(
      'fill-none stroke-primary/20',
      props.trackColor
        ? 'stroke-(--progress-circular-track-color)'
        : props.color && 'stroke-(--progress-circular-color)/20',
      props.ui?.track?.class,
    ),
  },
  indicator: {
    ...props.ui?.indicator,
    class: cn(
      'h-auto w-auto flex-none fill-none stroke-primary transition-[stroke-dashoffset] duration-300 ease-out',
      props.color && 'stroke-(--progress-circular-color)',
      props.ui?.indicator?.class,
    ),
    style: props.ui?.indicator?.style,
  },
  label: {
    ...props.ui?.label,
    class: cn(
      'pointer-events-none absolute inset-0 z-10 flex items-center justify-center text-center text-sm font-semibold',
      props.ui?.label?.class,
    ),
  },
}))
</script>

<template>
  <Progress
    v-bind="uiCalculado.root"
    :model-value="props.value"
    :max="props.max"
    :get-value-label="props.getValueLabel"
    :get-value-text="props.getValueText"
  >
    <template #indicator>
      <svg v-bind="uiCalculado.svg" viewBox="0 0 100 100" aria-hidden="true">
        <circle
          v-bind="uiCalculado.track"
          cx="50"
          cy="50"
          :r="radius"
          :stroke-width="props.strokeWidth"
        />

        <ProgressIndicator as-child>
          <circle
            v-bind="uiCalculado.indicator"
            cx="50"
            cy="50"
            :r="radius"
            :stroke-width="props.strokeWidth"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
          />
        </ProgressIndicator>
      </svg>
    </template>

    <span v-if="props.label || slots.label" v-bind="uiCalculado.label" aria-hidden="true">
      <slot name="label" v-bind="slotProps">{{ props.label }}</slot>
    </span>
  </Progress>
</template>
