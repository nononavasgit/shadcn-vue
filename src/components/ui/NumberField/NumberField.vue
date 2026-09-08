<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
import type { NumberFieldProps } from '.'
import { numberFieldDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<NumberFieldProps>(), numberFieldDefaults)
const attrs = useAttrs()

const rootProps = computed(() => ({
  ...attrs,
  id: 'age',
  min: props.min,
  max: props.max,
  disabled: props.disabled,
  disableWheelChange: props.disableWheelChange,
  focusOnChange: props.focusOnChange,
  formatOptions: props.formatOptions,
}))
</script>

<template>
  <NumberFieldRoot v-bind="rootProps">
    <div
      class="mt-1 flex h-9 items-center rounded-lg border bg-white shadow-sm focus-within:shadow-[0_0_0_2px] focus-within:shadow-stone-800 hover:bg-stone-50"
    >
      <NumberFieldDecrement class="p-2 disabled:opacity-20">
        <Icon name="minus" />
      </NumberFieldDecrement>
      <NumberFieldInput class="w-20 bg-transparent p-1 text-center tabular-nums focus:outline-0" />
      <NumberFieldIncrement class="p-2 disabled:opacity-20">
        <Icon name="plus" />
      </NumberFieldIncrement>
    </div>
  </NumberFieldRoot>
</template>
