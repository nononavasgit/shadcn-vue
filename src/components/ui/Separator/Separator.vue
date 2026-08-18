<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Separator as RekaSeparator } from 'reka-ui'
import { cn } from '@/lib/utils'
import { separatorDefaults } from './defaults'
import type { SeparatorProps, SeparatorSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SeparatorProps>(), separatorDefaults)
defineSlots<SeparatorSlots>()

const attrs = useAttrs()
const rootProps = computed(() => {
  return {
    ...attrs,
    orientation: props.orientation,
    decorative: props.decorative,
    class: cn(
      'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch',
      attrs.class,
    ),
    style: attrs.style,
  }
})
</script>

<template>
  <RekaSeparator v-bind="rootProps" data-test-separator-root>
    <slot />
  </RekaSeparator>
</template>
