<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ICONS } from './icons.ts'
import { cn } from '@/lib/utils'
import { iconVariants, type IconProps } from '.'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
  color: 'currentColor',
})

const attrs = useAttrs()
const icon = computed(() => ICONS[props.name])

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)

  return {
    root: {
      ...attrs,
      ...rootUI,
      'aria-hidden': true,
      class: cn(iconVariants({ size: props.size }), rootUI.class, attrs.class),
      style: [{ color: props.color }, rootUI.style, attrs.style],
    },
  }
})
</script>

<template>
  <component v-bind="calculatedUI.root" :is="icon" />
</template>
