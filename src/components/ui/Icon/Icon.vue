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
</script>

<template>
  <component
    v-bind="{
      'aria-hidden': true,
      ...attrs,
    }"
    :is="icon"
    :class="cn(iconVariants({ size: props.size }), attrs.class)"
    :style="[{ color: props.color }, attrs.style]"
  />
</template>
