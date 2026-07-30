<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { NumberFieldInputProps } from 'reka-ui'
import { NumberFieldInput as RekaNumberFieldInput, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<NumberFieldInputProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const inputProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <RekaNumberFieldInput
    v-bind="inputProps"
    data-slot="input"
    :class="
      cn(
        'flex h-9 w-full rounded-md border border-input bg-transparent py-1 text-center text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        attrs.class,
      )
    "
  />
</template>
