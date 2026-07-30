<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { NumberFieldDecrementProps } from 'reka-ui'
import { NumberFieldDecrement as RekaNumberFieldDecrement, useForwardProps } from 'reka-ui'
import { Minus } from '@lucide/vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<NumberFieldDecrementProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const decrementProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <RekaNumberFieldDecrement
    v-bind="decrementProps"
    data-slot="decrement"
    :class="
      cn(
        'absolute top-1/2 left-0 -translate-y-1/2 p-3 disabled:cursor-not-allowed disabled:opacity-20',
        attrs.class,
      )
    "
  >
    <slot>
      <Minus class="size-4" />
    </slot>
  </RekaNumberFieldDecrement>
</template>
