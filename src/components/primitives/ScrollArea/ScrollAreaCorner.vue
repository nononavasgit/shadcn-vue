<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { ScrollAreaCornerProps } from 'reka-ui'
import { ScrollAreaCorner, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<ScrollAreaCornerProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const cornerProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <ScrollAreaCorner
    v-bind="cornerProps"
    data-slot="scroll-area-corner"
    :class="cn('bg-border', attrs.class)"
  />
</template>
