<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ICONS } from './icons.ts'
import { cn } from '@/lib/utils'
import { iconVariants, type IconProps } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
  color: 'currentColor',
})

const attrs = useAttrs()
const icon = computed(() => ICONS[props.name])

const rootProps = computed(() => {
  return {
    'aria-hidden': true,
    ...attrs,
    class: cn(iconVariants({ size: props.size }), attrs.class),
    style: [{ color: props.color }, attrs.style],
  }
})
</script>

<template>
  <component v-bind="rootProps" :is="icon" data-test-icon-root />
</template>
