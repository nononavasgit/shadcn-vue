<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { SliderRangeProps } from 'reka-ui'
import { SliderRange as SliderRangeBase, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<SliderRangeProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)

const rangeProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <SliderRangeBase v-bind="rangeProps" data-slot="slider-range" :class="attrs.class">
    <slot />
  </SliderRangeBase>
</template>
