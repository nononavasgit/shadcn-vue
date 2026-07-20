<script setup lang="ts">
import type { NombreIcono } from '@/assets/iconos'
import { computed } from 'vue'
import { ICONOS } from '@/assets/iconos'

interface Props {
  nombre: NombreIcono
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'currentColor',
})

const componente = computed(() => ICONOS[props.nombre])
</script>

<template>
  <component :is="componente" :color="color" />
</template>
