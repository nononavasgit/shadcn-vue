<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { ScrollAreaProps, ScrollAreaSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<ScrollAreaSlots>()

const props = withDefaults(defineProps<ScrollAreaProps>(), {
  type: 'hover',
  dir: undefined,
  scrollHideDelay: 600,
  orientation: 'vertical',
  forceMount: false,
  as: 'div',
  asChild: false,
  ui: undefined,
})

const attrs = useAttrs()
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const viewportUI = normalizeHTMLAttributes(props.ui?.viewport)
  const verticalScrollbarUI = normalizeHTMLAttributes(props.ui?.verticalScrollbar)
  const horizontalScrollbarUI = normalizeHTMLAttributes(props.ui?.horizontalScrollbar)
  const thumbVerticalUI = normalizeHTMLAttributes(props.ui?.thumbVertical)
  const thumbHorizontalUI = normalizeHTMLAttributes(props.ui?.thumbHorizontal)
  const cornerUI = normalizeHTMLAttributes(props.ui?.corner)

  return {
    root: {
      ...attrs,
      ...rootUI,
      type: props.type,
      dir: props.dir,
      scrollHideDelay: props.scrollHideDelay,
      as: props.as,
      asChild: props.asChild,
      class: cn('relative', attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    viewport: {
      ...viewportUI,
      class: cn(
        'size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1',
        viewportUI.class,
      ),
    },
    verticalScrollbar: {
      ...verticalScrollbarUI,
      orientation: 'vertical' as const,
      forceMount: props.forceMount,
      class: cn(
        'flex touch-none p-px transition-colors select-none h-full w-2.5 border-l border-l-transparent',
        verticalScrollbarUI.class,
      ),
    },
    thumbVertical: {
      ...thumbVerticalUI,
      class: cn('relative flex-1 rounded-full bg-border', thumbVerticalUI.class),
    },
    horizontalScrollbar: {
      ...horizontalScrollbarUI,
      orientation: 'horizontal' as const,
      forceMount: props.forceMount,
      class: cn(
        'flex touch-none p-px transition-colors select-none h-2.5 flex-col border-t border-t-transparent',
        horizontalScrollbarUI.class,
      ),
    },
    thumbHorizontal: {
      ...thumbHorizontalUI,
      class: cn('relative flex-1 rounded-full bg-border', thumbHorizontalUI.class),
    },
    corner: {
      ...cornerUI,
      class: cn('bg-border', cornerUI.class),
    },
  }
})
</script>

<template>
  <ScrollAreaRoot v-bind="calculatedUI.root" data-slot="scroll-area">
    <ScrollAreaViewport v-bind="calculatedUI.viewport" data-slot="scroll-area-viewport">
      <slot />
    </ScrollAreaViewport>

    <ScrollAreaScrollbar
      v-if="props.orientation === 'vertical' || props.orientation === 'both'"
      v-bind="calculatedUI.verticalScrollbar"
      data-slot="scroll-area-scrollbar"
    >
      <ScrollAreaThumb v-bind="calculatedUI.thumbVertical" data-slot="scroll-area-thumb" />
    </ScrollAreaScrollbar>

    <ScrollAreaScrollbar
      v-if="props.orientation === 'horizontal' || props.orientation === 'both'"
      v-bind="calculatedUI.horizontalScrollbar"
      data-slot="scroll-area-scrollbar"
    >
      <ScrollAreaThumb v-bind="calculatedUI.thumbHorizontal" data-slot="scroll-area-thumb" />
    </ScrollAreaScrollbar>

    <ScrollAreaCorner
      v-if="props.orientation === 'both'"
      v-bind="calculatedUI.corner"
      data-slot="scroll-area-corner"
    />
  </ScrollAreaRoot>
</template>
