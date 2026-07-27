<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { KbdGroup as KbdGroupBase } from '@/components/ui/Kbd'
import type { KbdGroupSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<KbdGroupSlots>()

const attrs = useAttrs()

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
  },
}))
</script>

<template>
  <KbdGroupBase v-bind="uiCalculado.raiz">
    <slot />
  </KbdGroupBase>
</template>
