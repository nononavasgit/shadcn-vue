<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { useColor } from '@/composables'
import { kbdVariants, type KbdProps, type KbdSlots } from '.'
import { kbdDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<KbdProps>(), kbdDefaults)
defineSlots<KbdSlots>()

const attrs = useAttrs()
const { colorStyle } = useColor(
  computed(() => props.color),
  'kbd',
)
const rootProps = computed(() => {
  const calculatedVariants = kbdVariants({
    size: props.size,
    variant: props.variant,
    severity: props.severity,
    color: Boolean(props.color),
  })

  return {
    ...attrs,
    class: cn(
      calculatedVariants,
      '[[data-slot=tooltip-content]_&]:bg-background/20 [[data-slot=tooltip-content]_&]:text-background dark:[[data-slot=tooltip-content]_&]:bg-background/10',
      attrs.class,
    ),
    style: [colorStyle.value, attrs.style],
  }
})
</script>

<template>
  <kbd v-bind="rootProps" data-test-kbd-root>
    <slot>{{ props.label }}</slot>
  </kbd>
</template>
