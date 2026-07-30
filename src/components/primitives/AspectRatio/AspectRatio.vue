<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AspectRatioProps } from 'reka-ui'
import { AspectRatio as RekaAspectRatio } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(props: { aspect: number }): unknown
}>()

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 1,
  as: 'div',
})
const attrs = useAttrs()
const calculatedProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class

  return {
    ...restAttrs,
    ...props,
  }
})
</script>

<template>
  <RekaAspectRatio
    v-slot="slotProps"
    v-bind="calculatedProps"
    data-slot="aspect-ratio"
    :class="cn('relative w-full', attrs.class)"
  >
    <slot v-bind="slotProps" />
  </RekaAspectRatio>
</template>
