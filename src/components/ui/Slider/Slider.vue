<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import {
  type SliderContext,
  type SliderProps,
  type SliderSlots,
  type SliderThumbContext,
  type SliderValue,
} from '.'
import { sliderDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SliderProps>(), sliderDefaults)
const emit = defineEmits<{
  valueCommit: [value: number[]]
}>()
defineSlots<SliderSlots>()

const attrs = useAttrs()
const value = defineModel<SliderValue>('value', { default: () => [...sliderDefaults.value] })
const sliderValues = computed(() => value.value ?? [])
const { t } = useI18n()

function createSliderContext(values: number[]): SliderContext {
  return { values }
}

function createSliderThumbContext(
  values: number[],
  index: number,
  thumbValue: number,
): SliderThumbContext {
  return {
    values,
    index,
    value: thumbValue,
    first: index === 0,
    last: index === values.length - 1,
  }
}

const sliderContext = computed<SliderContext>(() => createSliderContext(sliderValues.value))

const rootProps = computed(() => {
  const vertical = props.orientation === 'vertical'

  return {
    ...attrs,
    disabled: props.disabled,
    orientation: props.orientation,
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
    ),
    style: attrs.style,
  }
})

const trackProps = computed(() => {
  const ui = useUi(props.ui?.track, sliderContext.value)
  const vertical = props.orientation === 'vertical'

  return {
    ...ui,
    class: cn(
      'relative h-2 w-full grow overflow-hidden rounded-full bg-secondary',
      vertical && 'h-full w-2',
      ui.class,
    ),
    style: ui.style,
  }
})

const rangeProps = computed(() => {
  const ui = useUi(props.ui?.range, sliderContext.value)
  const vertical = props.orientation === 'vertical'

  return {
    ...ui,
    class: cn('absolute h-full bg-primary', vertical && 'h-auto w-full', ui.class),
    style: ui.style,
  }
})

const thumbContexts = computed<SliderThumbContext[]>(() =>
  sliderValues.value.map((thumbValue, index, values) =>
    createSliderThumbContext(values, index, thumbValue),
  ),
)

function getThumbProps(context: SliderThumbContext) {
  const ui = useUi(props.ui?.thumb, context)
  const rangeAriaLabel =
    context.values.length === 2 ? (context.index === 0 ? t('minimum') : t('maximum')) : undefined

  return {
    ...ui,
    'aria-label': ui['aria-label'] ?? rangeAriaLabel,
    class: cn(
      'block size-5 shrink-0 cursor-grab rounded-full border-2 border-primary bg-background shadow-sm transition-colors active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
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
    data-test-slider-root
    @value-commit="emit('valueCommit', $event)"
  >
    <SliderTrack v-bind="trackProps" data-test-slider-track>
      <slot name="track" v-bind="sliderContext">
        <slot name="range" v-bind="sliderContext">
          <SliderRange v-bind="rangeProps" data-test-slider-range />
        </slot>
      </slot>
    </SliderTrack>

    <SliderThumb
      v-for="thumbContext in thumbContexts"
      :key="thumbContext.index"
      :data-test-slider-thumb="thumbContext.index"
      v-bind="getThumbProps(thumbContext)"
    >
      <slot name="thumb" v-bind="thumbContext" />
    </SliderThumb>
  </SliderRoot>
</template>
