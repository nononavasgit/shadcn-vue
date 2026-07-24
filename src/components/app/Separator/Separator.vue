<script setup lang="ts">
import { useAttrs } from 'vue'
import type { SeparatorProps } from './index'
import { Separator as SeparatorBase } from '@/components/ui/Separator'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: true,
})

const attrs = useAttrs()
</script>

<template>
  <SeparatorBase v-bind="attrs" :orientation="props.orientation" :decorative="props.decorative" />
</template>
