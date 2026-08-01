<script setup lang="ts">
import { computed, useAttrs } from 'vue'
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
      class: cn('inline-flex items-center gap-1', attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <kbd v-bind="calculatedUI.root" data-slot="kbd-group">
    <slot />
  </kbd>
</template>
