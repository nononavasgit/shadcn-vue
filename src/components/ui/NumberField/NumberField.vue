<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'reka-ui'
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

const rootProps = computed(() => ({
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
}))

const decrementProps = computed(() => ({
  disabled: props.disabled,
  'aria-label': t('decrement'),
  class: 'p-2 disabled:opacity-20',
}))

const incrementProps = computed(() => ({
  disabled: props.disabled,
  'aria-label': t('increment'),
  class: 'p-2 disabled:opacity-20',
}))
</script>

<template>
  <NumberFieldRoot v-bind="rootProps" v-model="value">
    <div
      class="mt-1 flex h-9 items-center rounded-lg border bg-white shadow-sm focus-within:shadow-[0_0_0_2px] focus-within:shadow-stone-800 hover:bg-stone-50"
    >
      <NumberFieldDecrement v-bind="decrementProps">
        <slot name="decrement">
          <Icon v-bind="props.iconDecrement" name="minus" />
        </slot>
      </NumberFieldDecrement>
      <NumberFieldInput class="w-20 bg-transparent p-1 text-center tabular-nums focus:outline-0" />
      <NumberFieldIncrement v-bind="incrementProps">
        <slot name="increment">
          <Icon v-bind="props.iconIncrement" name="plus" />
        </slot>
      </NumberFieldIncrement>
    </div>
  </NumberFieldRoot>
</template>
