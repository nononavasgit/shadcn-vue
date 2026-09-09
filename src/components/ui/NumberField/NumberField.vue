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
import type { IconSize } from '@/components/ui/Icon'
import type { NumberFieldProps, NumberFieldValue, NumberFieldSlots } from '.'
import { numberFieldControlVariants, numberFieldInputVariants, numberFieldVariants } from '.'
import { numberFieldDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<NumberFieldProps>(), numberFieldDefaults)
const attrs = useAttrs()
const value = defineModel<NumberFieldValue>('value')
defineSlots<NumberFieldSlots>()
const { t } = useI18n()

const iconSize = computed<IconSize>(() => (props.size === 'xl' ? 'lg' : props.size))

const decrementIconProps = computed(() => ({
  ...props.iconDecrement,
  size: props.iconDecrement?.size ?? iconSize.value,
}))

const incrementIconProps = computed(() => ({
  ...props.iconIncrement,
  size: props.iconIncrement?.size ?? iconSize.value,
}))

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
    class: cn(numberFieldVariants({ size: props.size, variant: props.variant }), attrs.class),
    style: attrs.style,
  }
})

const decrementProps = computed(() => {
  const ui = useUi(props.ui?.decrement, undefined)

  return {
    'aria-label': t('decrement'),
    ...ui,
    disabled: props.disabled,
    class: cn(numberFieldControlVariants({ size: props.size }), ui.class),
    style: ui.style,
  }
})

const incrementProps = computed(() => {
  const ui = useUi(props.ui?.increment, undefined)

  return {
    'aria-label': t('increment'),
    ...ui,
    disabled: props.disabled,
    class: cn(numberFieldControlVariants({ size: props.size }), ui.class),
    style: ui.style,
  }
})

const propsInput = computed(() => {
  const ui = useUi(props.ui?.input, undefined)

  return {
    ...ui,
    class: cn(numberFieldInputVariants({ size: props.size }), ui.class),
    style: ui.style,
  }
})
</script>

<template>
  <NumberFieldRoot v-bind="rootProps" v-model="value" data-test-number-field-root>
    <NumberFieldDecrement v-bind="decrementProps">
      <slot name="decrement">
        <Icon name="minus" v-bind="decrementIconProps" />
      </slot>
    </NumberFieldDecrement>
    <NumberFieldInput v-bind="propsInput" />
    <NumberFieldIncrement v-bind="incrementProps">
      <slot name="increment">
        <Icon name="plus" v-bind="incrementIconProps" />
      </slot>
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>
