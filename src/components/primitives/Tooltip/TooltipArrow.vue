<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { TooltipArrowProps } from 'reka-ui'
import { TooltipArrow as RekaTooltipArrow } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<TooltipArrowProps>()
const attrs = useAttrs()
const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...props }
})
</script>

<template>
  <RekaTooltipArrow v-bind="rootProps" data-slot="tooltip-arrow" :class="cn('z-50', attrs.class)">
    <slot />
  </RekaTooltipArrow>
</template>
