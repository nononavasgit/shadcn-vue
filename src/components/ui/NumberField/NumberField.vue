<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'reka-ui'
import { Icon, normalizeIconProps } from '@/components/ui/Icon'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { useI18n } from '@/i18n'
import { cn } from '@/lib/utils'
import type { NumberFieldContext, NumberFieldProps, NumberFieldSlots, NumberFieldValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<NumberFieldProps>(), {
  as: 'div',
  asChild: false,
  disabled: false,
  disableWheelChange: false,
  focusOnChange: true,
  formatOptions: undefined,
  id: undefined,
  invertWheelChange: false,
  locale: undefined,
  min: undefined,
  max: undefined,
  name: undefined,
  readonly: false,
  required: false,
  step: 1,
  stepSnapping: true,
  placeholder: undefined,
  showDecrement: true,
  showIncrement: true,
  decrement: undefined,
  increment: undefined,
  decrementIcon: 'minus',
  incrementIcon: 'plus',
  ui: undefined,
})
const emit = defineEmits<{ valueChange: [value: NumberFieldValue] }>()
const slots = defineSlots<NumberFieldSlots>()

const attrs = useAttrs()
const value = defineModel<NumberFieldValue>('value', { default: null })
const { t } = useI18n()

const numberFieldContext = computed<NumberFieldContext>(() => {
  const { ui, decrementIcon, incrementIcon, ...numberFieldProps } = props
  void ui
  void decrementIcon
  void incrementIcon

  return {
    props: numberFieldProps,
    value: value.value,
  }
})

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, numberFieldContext.value))

  return {
    ...attrs,
    ...rootUI,
    as: props.as,
    asChild: props.asChild,
    disabled: props.disabled,
    disableWheelChange: props.disableWheelChange,
    focusOnChange: props.focusOnChange,
    formatOptions: props.formatOptions,
    id: props.id,
    invertWheelChange: props.invertWheelChange,
    locale: props.locale,
    min: props.min,
    max: props.max,
    name: props.name,
    readonly: props.readonly,
    required: props.required,
    step: props.step,
    stepSnapping: props.stepSnapping,
    'data-slot': 'number-field',
    class: cn('grid gap-1.5', attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})

const contentProps = computed(() => {
  const contentUI = normalizeHTMLAttributes(useResolve(props.ui?.content, numberFieldContext.value))

  return {
    ...contentUI,
    'data-slot': 'number-field-content',
    'data-show-decrement': props.showDecrement,
    'data-show-increment': props.showIncrement,
    class: cn(
      'relative data-[show-decrement=true]:[&>[data-slot=number-field-input]]:pl-10 data-[show-increment=true]:[&>[data-slot=number-field-input]]:pr-10',
      contentUI.class,
    ),
    style: contentUI.style,
  }
})

const decrementProps = computed(() => {
  const decrementUI = normalizeHTMLAttributes(
    useResolve(props.ui?.decrement, numberFieldContext.value),
  )

  return {
    ...decrementUI,
    as: props.decrement?.as,
    asChild: props.decrement?.asChild,
    disabled: props.decrement?.disabled,
    'aria-label': decrementUI['aria-label'] ?? t('decrement'),
    'data-slot': 'number-field-decrement',
    class: cn(
      'absolute top-1/2 left-0 z-10 -translate-y-1/2 p-3 disabled:cursor-not-allowed disabled:opacity-20',
      decrementUI.class,
    ),
    style: decrementUI.style,
  }
})

const inputProps = computed(() => {
  const inputUI = normalizeHTMLAttributes(useResolve(props.ui?.input, numberFieldContext.value))

  return {
    ...inputUI,
    placeholder: props.placeholder ?? inputUI.placeholder,
    'data-slot': 'number-field-input',
    class: cn(
      'flex h-9 w-full rounded-md border border-input bg-transparent py-1 text-center text-sm shadow-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50',
      inputUI.class,
    ),
    style: inputUI.style,
  }
})

const incrementProps = computed(() => {
  const incrementUI = normalizeHTMLAttributes(
    useResolve(props.ui?.increment, numberFieldContext.value),
  )

  return {
    ...incrementUI,
    as: props.increment?.as,
    asChild: props.increment?.asChild,
    disabled: props.increment?.disabled,
    'aria-label': incrementUI['aria-label'] ?? t('increment'),
    'data-slot': 'number-field-increment',
    class: cn(
      'absolute top-1/2 right-0 z-10 -translate-y-1/2 p-3 disabled:cursor-not-allowed disabled:opacity-20',
      incrementUI.class,
    ),
    style: incrementUI.style,
  }
})

const decrementIconProps = computed(() => ({ ...normalizeIconProps(props.decrementIcon) }))
const incrementIconProps = computed(() => ({ ...normalizeIconProps(props.incrementIcon) }))
</script>

<template>
  <NumberFieldRoot v-model="value" v-bind="rootProps">
    <div v-bind="contentProps">
      <NumberFieldDecrement v-if="props.showDecrement" v-bind="decrementProps">
        <slot name="decrement" v-bind="numberFieldContext">
          <Icon
            v-if="decrementIconProps.name"
            v-bind="decrementIconProps"
            :name="decrementIconProps.name"
          />
        </slot>
      </NumberFieldDecrement>

      <slot v-if="slots.input" name="input" v-bind="numberFieldContext" />
      <NumberFieldInput v-else v-bind="inputProps" />

      <NumberFieldIncrement v-if="props.showIncrement" v-bind="incrementProps">
        <slot name="increment" v-bind="numberFieldContext">
          <Icon
            v-if="incrementIconProps.name"
            v-bind="incrementIconProps"
            :name="incrementIconProps.name"
          />
        </slot>
      </NumberFieldIncrement>
    </div>

    <slot v-bind="numberFieldContext" />
  </NumberFieldRoot>
</template>
