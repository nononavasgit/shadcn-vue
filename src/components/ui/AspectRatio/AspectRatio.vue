<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { AspectRatio as AspectRatioBase } from '@/components/primitives/AspectRatio'
import type { AspectRatioProps, AspectRatioSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<AspectRatioSlots>()

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 1,
  as: 'div',
  asChild: false,
})
const attrs = useAttrs()
const calculatedProps = computed(() => ({
  ...attrs,
  ...props,
}))
</script>

<template>
  <AspectRatioBase v-slot="slotProps" v-bind="calculatedProps">
    <slot v-bind="slotProps" />
  </AspectRatioBase>
</template>
