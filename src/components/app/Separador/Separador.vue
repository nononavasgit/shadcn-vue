<template>
  <Separator v-bind="uiCalculado.root" :orientation="orientacion" :decorative="decorativo" />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import type { SeparadorBaseProps } from './types'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const props = withDefaults(defineProps<SeparadorBaseProps>(), {
  orientacion: 'horizontal',
  decorativo: false,
  ui: undefined,
})

const uiCalculado = computed(() => {
  return {
    root: {
      ...attrs,
      ...props.ui?.root,
      class: cn(attrs.class, props.ui?.root?.class),
      'data-slot': 'root',
    },
  }
})
</script>
