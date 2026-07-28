<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Kbd as KbdBase } from '@/components/ui/Kbd'
import type { KbdProps, KbdSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<KbdProps>()
defineSlots<KbdSlots>()

const attrs = useAttrs()
const calculatedUI = computed(() => ({
  root: {
    ...attrs,
  },
}))
</script>

<template>
  <KbdBase v-bind="calculatedUI.root">
    <slot>{{ props.title }}</slot>
  </KbdBase>
</template>
