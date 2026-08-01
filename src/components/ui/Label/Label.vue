<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Label as RekaLabel } from 'reka-ui'
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
      class: cn(
        'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <RekaLabel v-bind="calculatedUI.root" data-slot="label">
    <slot />
  </RekaLabel>
</template>
