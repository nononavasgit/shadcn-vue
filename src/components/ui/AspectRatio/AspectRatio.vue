<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { AspectRatio as AspectRatioRoot } from 'reka-ui'
import { cn } from '@/lib/utils'
import { createAspectRatioContext, type AspectRatioProps, type AspectRatioSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<AspectRatioSlots>()

const props = withDefaults(defineProps<AspectRatioProps>(), {
  ratio: 1,
})
const attrs = useAttrs()

const aspectRatioContext = computed(() => createAspectRatioContext(props))

const rootProps = computed(() => {
  return {
    ...attrs,
    ratio: props.ratio,
    class: cn('relative w-full', attrs.class),
    style: attrs.style,
  }
})
</script>

<template>
  <AspectRatioRoot v-bind="rootProps" data-test-aspect-ratio-root>
    <slot v-bind="aspectRatioContext" />
  </AspectRatioRoot>
</template>
