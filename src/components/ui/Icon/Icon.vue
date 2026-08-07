<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ICONS } from './icons.ts'
import { cn } from '@/lib/utils'
import { iconVariants, type IconProps, type IconContext } from '.'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
  color: 'currentColor',
})

const attrs = useAttrs()
const icon = computed(() => ICONS[props.name])

const iconContext = computed(() => {
  const { ui, ...iconProps } = props
  void ui

  const context: IconContext = {
    props: iconProps,
  }

  return context
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, iconContext.value))

  return {
    root: {
      'aria-hidden': true,
      ...attrs,
      ...rootUI,
      class: cn(iconVariants({ size: props.size }), rootUI.class, attrs.class),
      style: [{ color: props.color }, rootUI.style, attrs.style],
    },
  }
})
</script>

<template>
  <component v-bind="calculatedUI.root" :is="icon" />
</template>
