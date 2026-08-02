<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Minus, Plus } from '@lucide/vue'
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import {
  normalizeNumberFieldDecrementProps,
  normalizeNumberFieldIncrementProps,
  normalizeNumberFieldRootProps,
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
  const root = normalizeNumberFieldRootProps(props)
  const decrement = normalizeNumberFieldDecrementProps(props.decrement)
  const increment = normalizeNumberFieldIncrementProps(props.increment)

  return {
    root: {
      ...attrs,
      ...rootUI,
      ...root,
      class: cn('grid gap-1.5', attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    content: {
      ...contentUI,
      class: cn(
        'relative [&>[data-slot=input]]:has-[[data-slot=decrement]]:pl-5 [&>[data-slot=input]]:has-[[data-slot=increment]]:pr-5',
        contentUI.class,
      ),
    },
    decrement: {
      ...decrementUI,
      ...decrement,
      'aria-label': decrementUI['aria-label'] ?? t('decrement'),
      class: cn(
        'absolute top-1/2 left-0 -translate-y-1/2 p-3 disabled:cursor-not-allowed disabled:opacity-20',
        decrementUI.class,
      ),
    },
    input: {
      ...inputUI,
      placeholder: props.placeholder ?? inputUI.placeholder,
      class: cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent py-1 text-center text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        inputUI.class,
      ),
    },
    increment: {
      ...incrementUI,
      ...increment,
      'aria-label': incrementUI['aria-label'] ?? t('increment'),
      class: cn(
        'absolute top-1/2 right-0 -translate-y-1/2 p-3 disabled:cursor-not-allowed disabled:opacity-20',
        incrementUI.class,
      ),
    },
  }
})
</script>

<template>
  <NumberFieldRoot
    v-slot="rootSlotProps"
    v-model="model"
    v-bind="calculatedUI.root"
    data-slot="number-field"
  >
    <div v-bind="calculatedUI.content" data-slot="number-field-content">
      <NumberFieldDecrement
        v-if="props.showDecrement"
        v-bind="calculatedUI.decrement"
        data-slot="decrement"
      >
        <slot name="decrement" v-bind="rootSlotProps"><Minus class="size-4" /></slot>
      </NumberFieldDecrement>

      <slot v-if="slots.input" name="input" v-bind="rootSlotProps" />
      <NumberFieldInput v-else v-bind="calculatedUI.input" data-slot="input" />

      <NumberFieldIncrement
        v-if="props.showIncrement"
        v-bind="calculatedUI.increment"
        data-slot="increment"
      >
        <slot name="increment" v-bind="rootSlotProps"><Plus class="size-4" /></slot>
      </NumberFieldIncrement>
    </div>

    <slot v-bind="rootSlotProps" />
  </NumberFieldRoot>
</template>
