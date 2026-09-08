<script setup lang="ts">
import {
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldRoot,
} from 'reka-ui'
import { Icon } from '@/components/ui/Icon'
</script>

<template>
  <NumberFieldRoot id="age" :min="0" :default-value="18">
    <label for="age" class="text-stone-700 dark:text-white"> Age </label>
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
