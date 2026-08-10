<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { AspectRatio } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { AspectRatioContext, AspectRatioProps, AspectRatioSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<AspectRatioSlots>()

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 1,
  as: 'div',
  asChild: false,
  ui: undefined,
})
const attrs = useAttrs()

const aspectRatioContext = computed<AspectRatioContext>(() => {
  const { ui, ...aspectRatioProps } = props
  void ui

  return {
    props: aspectRatioProps,
    aspect: props.ratio,
  }
})

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useUi(props.ui?.root, aspectRatioContext.value))

  return {
    ...attrs,
    ...rootUI,
    ratio: props.ratio,
    as: props.as,
    asChild: props.asChild,
    class: cn('relative w-full', attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})
</script>

<template>
  <AspectRatio v-bind="rootProps">
    <slot v-bind="aspectRatioContext" />
  </AspectRatio>
</template>
