<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ButtonGroupSeparator as ButtonGroupSeparatorBase } from '@/components/primitives/ButtonGroup'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { ButtonGroupSeparatorProps } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonGroupSeparatorProps>(), {
  orientation: 'vertical',
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
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <ButtonGroupSeparatorBase v-bind="calculatedUI.root" />
</template>
