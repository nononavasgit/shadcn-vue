<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { KbdGroup as KbdGroupBase } from '@/components/primitives/Kbd'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { KbdGroupProps, KbdGroupSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<KbdGroupProps>(), {
  ui: undefined,
})
defineSlots<KbdGroupSlots>()

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
  <KbdGroupBase v-bind="calculatedUI.root">
    <slot />
  </KbdGroupBase>
</template>
