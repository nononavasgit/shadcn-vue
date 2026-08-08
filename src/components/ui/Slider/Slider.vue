<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type { SliderContext, SliderProps, SliderSlots, SliderThumbContext, SliderValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SliderProps>(), {
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
const emit = defineEmits<{
  valueChange: [value: SliderValue]
  valueCommit: [value: number[]]
}>()
defineSlots<SliderSlots>()

const attrs = useAttrs()
const value = defineModel<SliderValue>('value', { default: () => [0] })
const sliderValues = computed(() => value.value ?? [])
const { t } = useI18n()

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const sliderContext = computed<SliderContext>(() => {
  const { ui, ...sliderProps } = props
  void ui

  return {
    props: sliderProps,
    values: sliderValues.value,
  }
})

const rootProps = computed(() => {
  const normalizedRootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, sliderContext.value))
  const { dir: rootDirection, ...rootUI } = normalizedRootUI
  const vertical = props.orientation === 'vertical'

  void rootDirection

  return {
    ...attrs,
    ...rootUI,
    as: props.as,
    asChild: props.asChild,
    disabled: props.disabled,
    orientation: props.orientation,
    dir: props.dir,
    inverted: props.inverted,
    min: props.min,
    max: props.max,
    step: props.step,
    minStepsBetweenThumbs: props.minStepsBetweenThumbs,
    thumbAlignment: props.thumbAlignment,
    name: props.name,
    required: props.required,
    class: cn(
      'relative flex w-full touch-none select-none items-center',
      vertical && 'h-full w-auto flex-col',
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})

const trackProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.track, sliderContext.value))
  const vertical = props.orientation === 'vertical'

  return {
    ...ui,
    as: props.track?.as,
    asChild: props.track?.asChild,
    class: cn(
      'relative h-2 w-full grow overflow-hidden rounded-full bg-secondary',
      vertical && 'h-full w-2',
      ui.class,
    ),
    style: ui.style,
  }
})

const rangeProps = computed(() => {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.range, sliderContext.value))
  const vertical = props.orientation === 'vertical'

  return {
    ...ui,
    as: props.range?.as,
    asChild: props.range?.asChild,
    class: cn('absolute h-full bg-primary', vertical && 'h-auto w-full', ui.class),
    style: ui.style,
  }
})

const thumbContexts = computed<SliderThumbContext[]>(() =>
  sliderValues.value.map((thumbValue, index, values) => ({
    ...sliderContext.value,
    index,
    value: thumbValue,
    values,
    first: index === 0,
    last: index === values.length - 1,
  })),
)

function getThumbProps(context: SliderThumbContext) {
  const ui = normalizeHTMLAttributes(useResolve(props.ui?.thumb, context))
  const rangeAriaLabel =
    context.values.length === 2 ? (context.index === 0 ? t('minimum') : t('maximum')) : undefined

  return {
    ...ui,
    as: props.thumb?.as,
    asChild: props.thumb?.asChild,
    'aria-label': ui['aria-label'] ?? rangeAriaLabel,
    class: cn(
      'block size-5 shrink-0 rounded-full border-2 border-primary bg-background shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      ui.class,
    ),
    style: ui.style,
  }
}
</script>

<template>
  <SliderRoot
    v-model="value"
    v-bind="rootProps"
    data-slot="slider"
    @value-commit="emit('valueCommit', $event)"
  >
    <SliderTrack v-bind="trackProps" data-slot="slider-track">
      <slot name="track" v-bind="sliderContext">
        <slot name="range" v-bind="sliderContext">
          <SliderRange v-bind="rangeProps" data-slot="slider-range" />
        </slot>
      </slot>
    </SliderTrack>

    <SliderThumb
      v-for="thumbContext in thumbContexts"
      :key="thumbContext.index"
      data-slot="slider-thumb"
      v-bind="getThumbProps(thumbContext)"
    >
      <slot name="thumb" v-bind="thumbContext" />
    </SliderThumb>
  </SliderRoot>
</template>
