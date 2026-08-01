<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Separator as RekaSeparator } from 'reka-ui'
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
      class: cn(
        'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <RekaSeparator v-bind="calculatedUI.root" />
</template>
