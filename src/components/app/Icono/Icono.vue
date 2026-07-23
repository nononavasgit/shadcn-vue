<script setup lang="ts">
import type { IconoBaseProps } from './types'
import { computed, useAttrs } from 'vue'
import { ICONOS } from '@/assets/iconos'
import { cn } from '@/lib/utils'
import { iconoVariantes } from './variantes'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<IconoBaseProps>(), {
  color: 'currentColor',
  tamano: 'md',
})

const attrs = useAttrs()
const componente = computed(() => ICONOS[props.nombre])
const classCSS = computed(() => cn(iconoVariantes({ tamano: props.tamano }), attrs.class))
</script>

<template>
  <component :is="componente" v-bind="{ 'aria-hidden': true, ...attrs, }" :color="color" :class="classCSS" />
</template>
