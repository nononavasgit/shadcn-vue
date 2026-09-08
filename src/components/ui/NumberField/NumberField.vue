<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { useI18n } from '@/i18n'
import type { NumberFieldProps, NumberFieldValue, NumberFieldSlots } from '.'
import { numberFieldDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<NumberFieldProps>(), numberFieldDefaults)
const attrs = useAttrs()
const value = defineModel<NumberFieldValue>('value')
defineSlots<NumberFieldSlots>()
const { t } = useI18n()

const rootProps = computed(() => {
  return {
    ...attrs,
    id: props.id,
    min: props.min,
    max: props.max,
    disabled: props.disabled,
    disableWheelChange: props.disableWheelChange,
    focusOnChange: props.focusOnChange,
    formatOptions: props.formatOptions,
    locale: props.locale,
    name: props.name,
    readonly: props.readonly,
    required: props.required,
    step: props.step,
    stepSnapping: props.stepSnapping,
    class: cn(
      'mt-1 flex h-9 items-center rounded-lg border bg-white shadow-sm focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/50 hover:bg-stone-50',
      attrs.class,
    ),
    style: attrs.style,
  }
})

const decrementProps = computed(() => {
  const ui = useUi(props.ui?.decrement, undefined)

  return {
    'aria-label': t('decrement'),
    ...ui,
    disabled: props.disabled,
    class: cn('p-2 disabled:opacity-20', ui.class),
    style: ui.style,
  }
})

const incrementProps = computed(() => {
  const ui = useUi(props.ui?.increment, undefined)

  return {
    'aria-label': t('increment'),
    ...ui,
    disabled: props.disabled,
    class: cn('p-2 disabled:opacity-20', ui.class),
    style: ui.style,
  }
})

const propsInput = computed(() => {
  const ui = useUi(props.ui?.input, undefined)

  return {
    ...ui,
    class: cn('w-20 bg-transparent p-1 text-center tabular-nums focus:outline-0', ui.class),
    style: ui.style,
  }
})
</script>

<template>
  <NumberFieldRoot v-bind="rootProps" v-model="value">
    <NumberFieldDecrement v-bind="decrementProps">
      <slot name="decrement">
        <Icon name="minus" v-bind="props.iconDecrement" />
      </slot>
    </NumberFieldDecrement>
    <NumberFieldInput v-bind="propsInput" />
    <NumberFieldIncrement v-bind="incrementProps">
      <slot name="increment">
        <Icon name="plus" v-bind="props.iconIncrement" />
      </slot>
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>
