<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ButtonGroup as ButtonGroupBase } from '@/components/primitives/ButtonGroup'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { ButtonGroupProps, ButtonGroupSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<ButtonGroupSlots>()

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
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
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <ButtonGroupBase v-bind="calculatedUI.root">
    <slot />
  </ButtonGroupBase>
</template>
