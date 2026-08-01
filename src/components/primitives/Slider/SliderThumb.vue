<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { SliderThumbProps } from 'reka-ui'
import { SliderThumb as SliderThumbBase, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<SliderThumbProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)

const thumbProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <SliderThumbBase v-bind="thumbProps" data-slot="slider-thumb" :class="attrs.class">
    <slot />
  </SliderThumbBase>
</template>
