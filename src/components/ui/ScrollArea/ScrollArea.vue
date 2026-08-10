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
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { ScrollAreaContext, ScrollAreaProps, ScrollAreaSlots } from '.'

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

const scrollAreaContext = computed<ScrollAreaContext>(() => {
  const { ui, ...scrollAreaProps } = props
  void ui

  return {
    props: scrollAreaProps,
  }
})

const attrs = useAttrs()
const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, scrollAreaContext.value))

  return {
    ...attrs,
    ...rootUI,
    type: props.type,
    dir: props.dir,
    scrollHideDelay: props.scrollHideDelay,
    as: props.as,
    asChild: props.asChild,
    class: cn('relative', attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})

const viewportProps = computed(() => {
  const viewportUI = normalizeHTMLAttributes(
    useUi(props.ui?.viewport, scrollAreaContext.value),
  )

  return {
    ...viewportUI,
    class: cn(
      'size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-1',
      viewportUI.class,
    ),
  }
})

const verticalScrollbarProps = computed(() => {
  const verticalScrollbarUI = normalizeHTMLAttributes(
    useUi(props.ui?.verticalScrollbar, scrollAreaContext.value),
  )

  return {
    ...verticalScrollbarUI,
    orientation: 'vertical' as const,
    forceMount: props.forceMount,
    class: cn(
      'flex touch-none p-px transition-colors select-none h-full w-2.5 border-l border-l-transparent',
      verticalScrollbarUI.class,
    ),
  }
})

const thumbVerticalProps = computed(() => {
  const thumbVerticalUI = normalizeHTMLAttributes(
    useUi(props.ui?.thumbVertical, scrollAreaContext.value),
  )

  return {
    ...thumbVerticalUI,
    class: cn('relative flex-1 rounded-full bg-border', thumbVerticalUI.class),
  }
})

const horizontalScrollbarProps = computed(() => {
  const horizontalScrollbarUI = normalizeHTMLAttributes(
    useUi(props.ui?.horizontalScrollbar, scrollAreaContext.value),
  )

  return {
    ...horizontalScrollbarUI,
    orientation: 'horizontal' as const,
    forceMount: props.forceMount,
    class: cn(
      'flex touch-none p-px transition-colors select-none h-2.5 flex-col border-t border-t-transparent',
      horizontalScrollbarUI.class,
    ),
  }
})

const thumbHorizontalProps = computed(() => {
  const thumbHorizontalUI = normalizeHTMLAttributes(
    useUi(props.ui?.thumbHorizontal, scrollAreaContext.value),
  )

  return {
    ...thumbHorizontalUI,
    class: cn('relative flex-1 rounded-full bg-border', thumbHorizontalUI.class),
  }
})

const cornerProps = computed(() => {
  const cornerUI = normalizeHTMLAttributes(useUi(props.ui?.corner, scrollAreaContext.value))

  return {
    ...cornerUI,
    class: cn('bg-border', cornerUI.class),
  }
})
</script>

<template>
  <ScrollAreaRoot v-bind="rootProps" data-slot="scroll-area">
    <ScrollAreaViewport v-bind="viewportProps" data-slot="scroll-area-viewport">
      <slot v-bind="scrollAreaContext" />
    </ScrollAreaViewport>

    <ScrollAreaScrollbar
      v-if="props.orientation === 'vertical' || props.orientation === 'both'"
      v-bind="verticalScrollbarProps"
      data-slot="scroll-area-scrollbar"
    >
      <ScrollAreaThumb v-bind="thumbVerticalProps" data-slot="scroll-area-thumb" />
    </ScrollAreaScrollbar>

    <ScrollAreaScrollbar
      v-if="props.orientation === 'horizontal' || props.orientation === 'both'"
      v-bind="horizontalScrollbarProps"
      data-slot="scroll-area-scrollbar"
    >
      <ScrollAreaThumb v-bind="thumbHorizontalProps" data-slot="scroll-area-thumb" />
    </ScrollAreaScrollbar>

    <ScrollAreaCorner
      v-if="props.orientation === 'both'"
      v-bind="cornerProps"
      data-slot="scroll-area-corner"
    />
  </ScrollAreaRoot>
</template>
