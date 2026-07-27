<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Kbd as KbdBase } from '@/components/ui/Kbd'
import type { KbdProps, KbdSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<KbdSlots>()

const props = defineProps<KbdProps>()
const attrs = useAttrs()

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
  },
}))
</script>

<template>
  <KbdBase v-bind="uiCalculado.raiz">
    <slot>{{ props.titulo }}</slot>
  </KbdBase>
</template>
