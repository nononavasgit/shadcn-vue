<template>
  <KbdBase v-bind="uiCalculado.root">
    <slot v-if="slots.default" name="default"></slot>
    <template v-else>{{ titulo }}</template>
  </KbdBase>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Kbd as KbdBase } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'
import type { KbdBaseProps } from './types'
import { kbdVariantes } from './variantes'

defineOptions({
  inheritAttrs: false,
})

const slots = defineSlots<{
  default?(): unknown
}>()

const attrs = useAttrs()
const props = withDefaults(defineProps<KbdBaseProps>(), {
  titulo: '',
  tamano: 'md',
  ui: undefined,
})

const uiCalculado = computed(() => {
  return {
    root: {
      ...attrs,
      ...props.ui?.root,
      class: cn(kbdVariantes({ tamano: props.tamano }), attrs.class, props.ui?.root?.class),
      'data-slot': 'root',
    },
  }
})
</script>
