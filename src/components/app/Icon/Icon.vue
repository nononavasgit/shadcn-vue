<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ICONOS } from './icons.ts'
import { cn } from '@/lib/utils'
import { iconoVariantes, type IconoProps } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<IconoProps>(), {
  tamano: 'md',
  color: 'currentColor',
})

const attrs = useAttrs()
const icono = computed(() => ICONOS[props.nombre])
</script>

<template>
  <component
    v-bind="attrs"
    :is="icono"
    aria-hidden="true"
    :class="cn(iconoVariantes({ tamano: props.tamano }), attrs.class)"
    :style="{ color: props.color }"
  />
</template>
