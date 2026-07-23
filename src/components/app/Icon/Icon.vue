<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ICONS } from '@/assets/icons'
import { cn } from '@/lib/utils'
import { iconVariants, type IconProps } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
  color: 'currentColor',
})

const attrs = useAttrs()
const icono = computed(() => ICONS[props.name])
</script>

<template>
  <component
    v-bind="attrs"
    :is="icono"
    aria-hidden="true"
    :class="cn(iconVariants({ size: props.size }), attrs.class)"
    :style="{ color: props.color }"
  />
</template>
