<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Separator as RekaSeparator } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { SeparatorContext, SeparatorProps, SeparatorSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: true,
  ui: undefined,
})
defineSlots<SeparatorSlots>()

const attrs = useAttrs()
const separatorContext = computed<SeparatorContext>(() => {
  const { ui, ...separatorProps } = props
  void ui

  return {
    props: separatorProps,
  }
})

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, separatorContext.value))

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
  <RekaSeparator v-bind="rootProps" data-slot="separator">
    <slot v-bind="separatorContext" />
  </RekaSeparator>
</template>
