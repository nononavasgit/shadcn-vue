<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { SliderRootEmits, SliderRootProps } from 'reka-ui'
import { SliderRoot, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<SliderRootProps>()
const emits = defineEmits<SliderRootEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)

const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <SliderRoot v-slot="slotProps" v-bind="rootProps" data-slot="slider" :class="attrs.class">
    <slot v-bind="slotProps" />
  </SliderRoot>
</template>
