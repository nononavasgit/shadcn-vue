<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { SliderTrackProps } from 'reka-ui'
import { SliderTrack as SliderTrackBase, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<SliderTrackProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)

const trackProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <SliderTrackBase v-bind="trackProps" data-slot="slider-track" :class="attrs.class">
    <slot />
  </SliderTrackBase>
</template>
