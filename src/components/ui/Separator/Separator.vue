<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Separator as SeparatorBase } from '@/components/primitives/Separator'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { SeparatorProps } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: true,
  ui: undefined,
})

const attrs = useAttrs()
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)

  return {
    root: {
      ...attrs,
      ...rootUI,
      orientation: props.orientation,
      decorative: props.decorative,
      as: props.as,
      asChild: props.asChild,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <SeparatorBase v-bind="calculatedUI.root" />
</template>
