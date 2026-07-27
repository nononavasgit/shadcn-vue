<script setup lang="ts">
import { computed, watch } from 'vue'
import { Announcer as AnnouncerBase } from '@/components/ui/Announcer'
import { useAnunciador } from '@/composables/useAnunciador'
import type { AnunciadorProps, AnunciadorSlotProps } from '.'

defineSlots<{
  default?(props: AnunciadorSlotProps): unknown
}>()

const props = withDefaults(defineProps<AnunciadorProps>(), {
  atomico: true,
  cortesia: 'polite',
})
const { mensaje, cortesia, establecer, polite, assertive } = useAnunciador({
  cortesia: props.cortesia,
})

watch(
  () => props.cortesia,
  (valor) => {
    cortesia.value = valor
  },
)

const ariaLive = computed(() => {
  return cortesia.value
})

const rol = computed(() => {
  if (cortesia.value === 'assertive') return 'alert'
  if (cortesia.value === 'polite') return 'status'
  return undefined
})

defineExpose({ mensaje, cortesia, establecer, polite, assertive })
</script>

<template>
  <AnnouncerBase :aria-atomic="props.atomico" :aria-live="ariaLive" :role="rol">
    <slot :mensaje="mensaje">{{ mensaje }}</slot>
  </AnnouncerBase>
</template>
