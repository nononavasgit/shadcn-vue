<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import {
  normalizeSliderRangeProps,
  normalizeSliderRootProps,
  normalizeSliderThumbProps,
  normalizeSliderTrackProps,
} from '.'
import type {
  SliderContext,
  SliderEmits,
  SliderProps,
  SliderSlots,
  SliderThumbContext,
  SliderValue,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SliderProps>(), {
  defaultValue: () => [0],
  disabled: false,
  orientation: 'horizontal',
  inverted: false,
  min: 0,
  max: 100,
  step: 1,
  minStepsBetweenThumbs: 0,
  thumbAlignment: 'contain',
  as: 'span',
  asChild: false,
  track: undefined,
  range: undefined,
  thumb: undefined,
  ui: undefined,
})
const emit = defineEmits<SliderEmits>()
defineSlots<SliderSlots>()

const attrs = useAttrs()
const modelValue = defineModel<SliderValue>()
const sliderValue = computed<SliderValue>({
  get: () => (modelValue.value !== undefined ? modelValue.value : props.defaultValue),
  set: (nextValue) => {
    modelValue.value = nextValue
  },
})
const sliderValues = computed(() => sliderValue.value ?? [])
const { t } = useI18n()

const sliderContext = computed<SliderContext>(() => {
  const { ui, ...sliderProps } = props
  void ui

  return {
    props: sliderProps,
    values: sliderValues.value,
  }
})

const calculatedUI = computed(() => {
  const normalizedRootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, sliderContext.value))
  const { dir: rootDirection, ...rootUI } = normalizedRootUI
  const trackUI = normalizeHTMLAttributes(useResolve(props.ui?.track, sliderContext.value))
  const rangeUI = normalizeHTMLAttributes(useResolve(props.ui?.range, sliderContext.value))
  const vertical = props.orientation === 'vertical'

  void rootDirection

  return {
    root: {
      ...attrs,
      ...rootUI,
      ...normalizeSliderRootProps(props),
      class: cn(
        'relative flex w-full touch-none select-none items-center',
        vertical && 'h-full w-auto flex-col',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
    track: {
      ...trackUI,
      ...normalizeSliderTrackProps(props.track),
      class: cn(
        'relative h-2 w-full grow overflow-hidden rounded-full bg-secondary',
        vertical && 'h-full w-2',
        trackUI.class,
      ),
      style: trackUI.style,
    },
    range: {
      ...rangeUI,
      ...normalizeSliderRangeProps(props.range),
      class: cn('absolute h-full bg-primary', vertical && 'h-auto w-full', rangeUI.class),
      style: rangeUI.style,
    },
    thumb: (context: SliderThumbContext) => {
      const thumbUI = normalizeHTMLAttributes(useResolve(props.ui?.thumb, context))
      const rangeAriaLabel =
        context.values.length === 2
          ? context.index === 0
            ? t('minimum')
            : t('maximum')
          : undefined

      return {
        ...thumbUI,
        ...normalizeSliderThumbProps(props.thumb),
        'aria-label': thumbUI['aria-label'] ?? rangeAriaLabel,
        class: cn(
          'block size-5 shrink-0 rounded-full border-2 border-primary bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          thumbUI.class,
        ),
        style: thumbUI.style,
      }
    },
  }
})
</script>

<template>
  <SliderRoot
    v-slot="{ modelValue: currentValues }"
    v-model="sliderValue"
    v-bind="calculatedUI.root"
    data-slot="slider"
    @value-commit="emit('valueCommit', $event)"
  >
    <SliderTrack v-bind="calculatedUI.track" data-slot="slider-track">
      <slot name="track" v-bind="sliderContext">
        <slot name="range" v-bind="sliderContext">
          <SliderRange v-bind="calculatedUI.range" data-slot="slider-range" />
        </slot>
      </slot>
    </SliderTrack>

    <SliderThumb
      v-for="(thumbValue, index) in currentValues ?? []"
      :key="index"
      data-slot="slider-thumb"
      v-bind="
        calculatedUI.thumb({
          ...sliderContext,
          index,
          value: thumbValue,
          values: currentValues ?? [],
          first: index === 0,
          last: index === (currentValues?.length ?? 0) - 1,
        })
      "
    >
      <slot
        name="thumb"
        v-bind="sliderContext"
        :index="index"
        :value="thumbValue"
        :first="index === 0"
        :last="index === (currentValues?.length ?? 0) - 1"
      />
    </SliderThumb>
  </SliderRoot>
</template>
