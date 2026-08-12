<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Separator as RekaSeparator } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import { createSeparatorContext, type SeparatorProps, type SeparatorSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SeparatorProps>(), {
  as: 'div',
  asChild: false,
  orientation: 'horizontal',
  decorative: true,
  ui: undefined,
})
defineSlots<SeparatorSlots>()

const separatorContext = computed(() => createSeparatorContext(props))

const attrs = useAttrs()
const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, separatorContext.value)

  return {
    ...attrs,
    ...rootUI,
    orientation: props.orientation,
    decorative: props.decorative,
    as: props.as,
    asChild: props.asChild,
    class: cn(
      'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})
</script>

<template>
  <RekaSeparator v-bind="rootProps" data-separator-ui="root" data-separator-slot="default">
    <slot v-bind="separatorContext" />
  </RekaSeparator>
</template>
