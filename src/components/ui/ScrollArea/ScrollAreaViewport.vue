<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { ScrollAreaViewportProps } from 'reka-ui'
import { ScrollAreaViewport, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<ScrollAreaViewportProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const viewportProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <ScrollAreaViewport
    v-bind="viewportProps"
    data-slot="scroll-area-viewport"
    :class="
      cn(
        'size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1',
        attrs.class,
      )
    "
  >
    <slot />
  </ScrollAreaViewport>
</template>
