<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Kbd as KbdBase } from '@/components/primitives/Kbd'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { KbdProps, KbdSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<KbdProps>(), {
  label: undefined,
  ui: undefined,
})
defineSlots<KbdSlots>()

const attrs = useAttrs()
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <KbdBase v-bind="calculatedUI.root">
    <slot>{{ props.label }}</slot>
  </KbdBase>
</template>
