<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  NumberField as NumberFieldBase,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/primitives/NumberField'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import {
  normalizeNumberFieldDecrementProps,
  normalizeNumberFieldIncrementProps,
  type NumberFieldEmits,
  type NumberFieldProps,
  type NumberFieldSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<NumberFieldProps>(), {
  placeholder: undefined,
  showDecrement: true,
  showIncrement: true,
  decrement: undefined,
  increment: undefined,
  ui: undefined,
})
defineEmits<NumberFieldEmits>()
const slots = defineSlots<NumberFieldSlots>()
const attrs = useAttrs()
const model = defineModel<number | null>()
const { t } = useI18n()

const calculatedUI = computed(() => {
  // Normalize the UI props for each part of the NumberField component
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const contentUI = normalizeHTMLAttributes(props.ui?.content)
  const decrementUI = normalizeHTMLAttributes(props.ui?.decrement)
  const inputUI = normalizeHTMLAttributes(props.ui?.input)
  const incrementUI = normalizeHTMLAttributes(props.ui?.increment)
  // Normalize the decrement and increment props
  const decrement = normalizeNumberFieldDecrementProps(props.decrement)
  const increment = normalizeNumberFieldIncrementProps(props.increment)

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    content: {
      ...contentUI,
      class: cn(contentUI.class),
    },
    decrement: {
      ...decrementUI,
      ...decrement,
      'aria-label': decrementUI['aria-label'] ?? t('decrement'),
      class: cn(decrementUI.class),
    },
    input: {
      ...inputUI,
      placeholder: props.placeholder ?? inputUI.placeholder,
      class: cn('focus-visible:border-primary focus-visible:ring-primary/50', inputUI.class),
    },
    increment: {
      ...incrementUI,
      ...increment,
      'aria-label': incrementUI['aria-label'] ?? t('increment'),
      class: cn(incrementUI.class),
    },
  }
})
</script>

<template>
  <NumberFieldBase v-slot="rootSlotProps" v-model="model" v-bind="calculatedUI.root">
    <NumberFieldContent v-bind="calculatedUI.content">
      <NumberFieldDecrement
        v-if="props.showDecrement && slots.decrement"
        v-bind="calculatedUI.decrement"
      >
        <slot name="decrement" v-bind="rootSlotProps" />
      </NumberFieldDecrement>
      <NumberFieldDecrement v-else-if="props.showDecrement" v-bind="calculatedUI.decrement" />

      <slot v-if="slots.input" name="input" v-bind="rootSlotProps" />
      <NumberFieldInput v-else v-bind="calculatedUI.input" />

      <NumberFieldIncrement
        v-if="props.showIncrement && slots.increment"
        v-bind="calculatedUI.increment"
      >
        <slot name="increment" v-bind="rootSlotProps" />
      </NumberFieldIncrement>
      <NumberFieldIncrement v-else-if="props.showIncrement" v-bind="calculatedUI.increment" />
    </NumberFieldContent>

    <slot v-bind="rootSlotProps" />
  </NumberFieldBase>
</template>
