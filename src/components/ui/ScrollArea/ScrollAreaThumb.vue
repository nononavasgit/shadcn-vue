<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { ScrollAreaThumbProps } from 'reka-ui'
import { ScrollAreaThumb, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<ScrollAreaThumbProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const thumbProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <ScrollAreaThumb
    v-bind="thumbProps"
    data-slot="scroll-area-thumb"
    :class="cn('relative flex-1 rounded-full bg-border', attrs.class)"
  />
</template>
