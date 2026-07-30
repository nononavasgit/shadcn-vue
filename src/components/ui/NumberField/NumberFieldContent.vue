<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const contentAttrs = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return restAttrs
})
</script>

<template>
  <div
    v-bind="contentAttrs"
    data-slot="number-field-content"
    :class="
      cn(
        'relative [&>[data-slot=input]]:has-[[data-slot=decrement]]:pl-5 [&>[data-slot=input]]:has-[[data-slot=increment]]:pr-5',
        attrs.class,
      )
    "
  >
    <slot />
  </div>
</template>
