<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  ScrollArea as ScrollAreaBase,
  ScrollAreaCorner,
  ScrollAreaThumb,
  ScrollAreaViewport,
  ScrollBar,
} from '@/components/primitives/ScrollArea'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { ScrollAreaProps, ScrollAreaSlots } from '.'

defineOptions({ inheritAttrs: false })

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
defineSlots<ScrollAreaSlots>()

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
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    viewport: {
      ...viewportUI,
      class: cn(viewportUI.class),
    },
    verticalScrollbar: {
      ...verticalScrollbarUI,
      orientation: 'vertical' as const,
      forceMount: props.forceMount,
      class: cn(verticalScrollbarUI.class),
    },
    thumbVertical: {
      ...thumbVerticalUI,
      class: cn(thumbVerticalUI.class),
    },
    horizontalScrollbar: {
      ...horizontalScrollbarUI,
      orientation: 'horizontal' as const,
      forceMount: props.forceMount,
      class: cn(horizontalScrollbarUI.class),
    },
    thumbHorizontal: {
      ...thumbHorizontalUI,
      class: cn(thumbHorizontalUI.class),
    },
    corner: {
      ...cornerUI,
      class: cn(cornerUI.class),
    },
  }
})
</script>

<template>
  <ScrollAreaBase v-bind="calculatedUI.root">
    <ScrollAreaViewport v-bind="calculatedUI.viewport">
      <slot />
    </ScrollAreaViewport>

    <ScrollBar
      v-if="orientation === 'vertical' || orientation === 'both'"
      v-bind="calculatedUI.verticalScrollbar"
    >
      <ScrollAreaThumb v-bind="calculatedUI.thumbVertical" />
    </ScrollBar>
    <ScrollBar
      v-if="orientation === 'horizontal' || orientation === 'both'"
      v-bind="calculatedUI.horizontalScrollbar"
    >
      <ScrollAreaThumb v-bind="calculatedUI.thumbHorizontal" />
    </ScrollBar>

    <ScrollAreaCorner v-if="orientation === 'both'" v-bind="calculatedUI.corner" />
  </ScrollAreaBase>
</template>
