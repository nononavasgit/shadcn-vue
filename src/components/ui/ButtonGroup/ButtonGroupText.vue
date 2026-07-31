<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ButtonGroupText as ButtonGroupTextBase } from '@/components/primitives/ButtonGroup'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { ButtonGroupTextProps, ButtonGroupTextSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<ButtonGroupTextSlots>()

const props = withDefaults(defineProps<ButtonGroupTextProps>(), {
  label: undefined,
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
      as: props.as,
      asChild: props.asChild,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <ButtonGroupTextBase v-bind="calculatedUI.root">
    <slot>{{ props.label }}</slot>
  </ButtonGroupTextBase>
</template>
