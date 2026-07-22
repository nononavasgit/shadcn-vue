<template>
  <Label v-bind="uiCalculado.root">
    <slot v-if="slots.default"></slot>
    <template v-else>{{ titulo }}</template>
  </Label>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import type { LabelBaseProps } from './types'

defineOptions({
  inheritAttrs: false,
})

const slots = defineSlots<{
  default?(): unknown
}>()

const attrs = useAttrs()
const props = withDefaults(defineProps<LabelBaseProps>(), {
  titulo: '',
  ui: undefined,
})

const uiCalculado = computed(() => {
  return {
    root: {
      ...attrs,
      ...props.ui?.root,
      class: cn(
        attrs.class,
        props.ui?.root?.class,
      ),
      'data-slot': 'root',
    },
  }
})
</script>
