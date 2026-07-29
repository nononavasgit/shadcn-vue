<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { ScrollAreaScrollbarProps } from 'reka-ui'
import { ScrollAreaScrollbar, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ScrollAreaScrollbarProps>(), {
  orientation: 'vertical',
})
const attrs = useAttrs()
const delegated = computed(() => ({
  as: props.as,
  asChild: props.asChild,
  orientation: props.orientation,
  forceMount: props.forceMount,
}))
const forwarded = useForwardProps(delegated)
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="{ ...attrs, ...forwarded }"
    data-slot="scroll-area-scrollbar"
    :class="
      cn(
        'flex touch-none p-px transition-colors select-none',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent',
        attrs.class,
      )
    "
  >
    <slot />
  </ScrollAreaScrollbar>
</template>
