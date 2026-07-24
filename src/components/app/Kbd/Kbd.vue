<script setup lang="ts">
import { useAttrs } from 'vue'
import { Kbd as KbdBase } from '@/components/ui/Kbd'
import type { KbdProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(): unknown
}>()

const props = defineProps<KbdProps>()
const attrs = useAttrs()
</script>

<template>
  <KbdBase v-bind="attrs">
    <slot>{{ props.label }}</slot>
  </KbdBase>
</template>
