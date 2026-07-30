<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { NumberFieldIncrementProps } from 'reka-ui'
import { NumberFieldIncrement as RekaNumberFieldIncrement, useForwardProps } from 'reka-ui'
import { Plus } from '@lucide/vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<NumberFieldIncrementProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const incrementProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <RekaNumberFieldIncrement
    v-bind="incrementProps"
    data-slot="increment"
    :class="
      cn(
        'absolute top-1/2 right-0 -translate-y-1/2 p-3 disabled:cursor-not-allowed disabled:opacity-20',
        attrs.class,
      )
    "
  >
    <slot>
      <Plus class="size-4" />
    </slot>
  </RekaNumberFieldIncrement>
</template>
