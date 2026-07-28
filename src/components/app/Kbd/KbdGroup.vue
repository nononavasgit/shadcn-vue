<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { KbdGroup as KbdGroupBase } from '@/components/ui/Kbd'
import type { KbdGroupSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<KbdGroupSlots>()

const attrs = useAttrs()
const calculatedUI = computed(() => ({
  root: {
    ...attrs,
  },
}))
</script>

<template>
  <KbdGroupBase v-bind="calculatedUI.root">
    <slot />
  </KbdGroupBase>
</template>
