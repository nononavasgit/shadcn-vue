<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  NumberField as NumberFieldBase,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/primitives/NumberField'
import { cn } from '@/lib/utils'
import { useI18n } from '@/i18n'
import type { NumberFieldEmits, NumberFieldProps, NumberFieldSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<NumberFieldProps>(), {
  showDecrement: true,
  showIncrement: true,
})
defineEmits<NumberFieldEmits>()
const slots = defineSlots<NumberFieldSlots>()
const attrs = useAttrs()
const model = defineModel<number | null>()
const { t } = useI18n()

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    class: cn(attrs.class),
  },
  content: {
    ...props.ui?.content,
    class: cn(props.ui?.content?.class),
  },
  decrement: {
    ...props.ui?.decrement,
    'aria-label': props.ui?.decrement?.['aria-label'] ?? t('decrement'),
    class: cn(props.ui?.decrement?.class),
  },
  input: {
    ...props.ui?.input,
    placeholder: props.placeholder ?? props.ui?.input?.placeholder,
    class: cn('focus-visible:border-primary focus-visible:ring-primary/50', props.ui?.input?.class),
  },
  increment: {
    ...props.ui?.increment,
    'aria-label': props.ui?.increment?.['aria-label'] ?? t('increment'),
    class: cn(props.ui?.increment?.class),
  },
}))
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
