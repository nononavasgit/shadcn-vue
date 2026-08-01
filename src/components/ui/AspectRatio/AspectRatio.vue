<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { AspectRatio as RekaAspectRatio } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { AspectRatioProps, AspectRatioSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<AspectRatioSlots>()

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 1,
  as: 'div',
  asChild: false,
  ui: undefined,
})
const attrs = useAttrs()
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)

  return {
    root: {
      ...attrs,
      ...rootUI,
      ratio: props.ratio,
      as: props.as,
      asChild: props.asChild,
      class: cn('relative w-full', attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <RekaAspectRatio v-slot="slotProps" v-bind="calculatedUI.root">
    <slot v-bind="slotProps" />
  </RekaAspectRatio>
</template>
