<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Label as LabelBase } from '@/components/primitives/Label'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { LabelProps, LabelSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<LabelSlots>()

const props = withDefaults(defineProps<LabelProps>(), {
  for: undefined,
  as: undefined,
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
      as: props.as,
      asChild: props.asChild,
      for: props.for,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <LabelBase v-bind="calculatedUI.root">
    <slot />
  </LabelBase>
</template>
