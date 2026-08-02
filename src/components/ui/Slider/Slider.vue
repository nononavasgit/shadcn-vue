<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type { SliderEmits, SliderProps, SliderSlots, SliderThumbUIContext } from '.'

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
  ui: undefined,
})
const emit = defineEmits<SliderEmits>()
defineSlots<SliderSlots>()

const attrs = useAttrs()
const modelValue = defineModel<number[] | null | undefined>()
const { t } = useI18n()

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const trackUI = normalizeHTMLAttributes(props.ui?.track)
  const rangeUI = normalizeHTMLAttributes(props.ui?.range)
  const vertical = props.orientation === 'vertical'

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      defaultValue: props.defaultValue,
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
    },
    track: {
      ...trackUI,
      class: cn(
        'relative h-2 w-full grow overflow-hidden rounded-full bg-secondary',
        vertical && 'h-full w-2',
        trackUI.class,
      ),
      style: trackUI.style,
    },
    range: {
      ...rangeUI,
      class: cn('absolute h-full bg-primary', vertical && 'h-auto w-full', rangeUI.class),
      style: rangeUI.style,
    },
    thumb: (context: SliderThumbUIContext) => {
      const thumbUI = normalizeHTMLAttributes(
        typeof props.ui?.thumb === 'function' ? props.ui.thumb(context) : props.ui?.thumb,
      )
      const rangeAriaLabel =
        context.values.length === 2
          ? context.index === 0
            ? t('minimum')
            : t('maximum')
          : undefined

      return {
        ...thumbUI,
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
    v-slot="{ modelValue: values }"
    v-model="modelValue"
    v-bind="calculatedUI.root"
    data-slot="slider"
    @value-commit="emit('valueCommit', $event)"
  >
    <SliderTrack v-bind="calculatedUI.track" data-slot="slider-track">
      <SliderRange v-bind="calculatedUI.range" data-slot="slider-range" />
    </SliderTrack>

    <SliderThumb
      v-for="(value, index) in values ?? []"
      :key="index"
      data-slot="slider-thumb"
      v-bind="
        calculatedUI.thumb({
          index,
          value,
          values: values ?? [],
          first: index === 0,
          last: index === (values?.length ?? 0) - 1,
        })
      "
    >
      <slot name="thumb" :index="index" :value="value" :values="values ?? []" />
    </SliderThumb>
  </SliderRoot>
</template>
