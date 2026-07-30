<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  ScrollArea as ScrollAreaBase,
  ScrollAreaCorner,
  ScrollAreaThumb,
  ScrollAreaViewport,
  ScrollBar,
} from '@/components/primitives/ScrollArea'
import { cn } from '@/lib/utils'
import type { ScrollAreaProps, ScrollAreaSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ScrollAreaProps>(), {
  type: 'hover',
  scrollHideDelay: 600,
  orientation: 'vertical',
  forceMount: false,
  as: 'div',
  asChild: false,
})
defineSlots<ScrollAreaSlots>()

const attrs = useAttrs()
const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    type: props.type,
    dir: props.dir,
    scrollHideDelay: props.scrollHideDelay,
    as: props.as,
    asChild: props.asChild,
    class: cn(attrs.class),
  },
  viewport: {
    ...props.ui?.viewport,
    class: cn(props.ui?.viewport?.class),
  },
  verticalScrollbar: {
    ...props.ui?.verticalScrollbar,
    orientation: 'vertical' as const,
    forceMount: props.forceMount,
    class: cn(props.ui?.verticalScrollbar?.class),
  },
  thumbVertical: {
    ...props.ui?.thumbVertical,
    class: cn(props.ui?.thumbVertical?.class),
  },
  horizontalScrollbar: {
    ...props.ui?.horizontalScrollbar,
    orientation: 'horizontal' as const,
    forceMount: props.forceMount,
    class: cn(props.ui?.horizontalScrollbar?.class),
  },
  thumbHorizontal: {
    ...props.ui?.thumbHorizontal,
    class: cn(props.ui?.thumbHorizontal?.class),
  },
  corner: {
    ...props.ui?.corner,
    class: cn(props.ui?.corner?.class),
  },
}))
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
