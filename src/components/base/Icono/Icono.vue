<script setup lang="ts">
import type { NombreIcono } from '@/assets/iconos'
import { ICONOS } from '@/assets/iconos'

defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    nombre: NombreIcono
    color?: string
  }>(),
  {
    color: 'currentColor',
  },
)
</script>

<template>
  <component :is="ICONOS[nombre]" v-bind="$attrs" :color="color" />
</template>
