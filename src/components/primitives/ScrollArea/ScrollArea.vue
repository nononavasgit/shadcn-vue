<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { ScrollAreaRootProps } from 'reka-ui'
import { ScrollAreaRoot, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<ScrollAreaRootProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <ScrollAreaRoot v-bind="rootProps" data-slot="scroll-area" :class="cn('relative', attrs.class)">
    <slot />
  </ScrollAreaRoot>
</template>
