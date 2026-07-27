<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Separator as SeparatorBase } from '@/components/ui/Separator'
import type { SeparatorProps } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientacion: 'horizontal',
  decorativo: true,
})

const attrs = useAttrs()

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    orientation: props.orientacion,
    decorative: props.decorativo,
    as: props.as,
    asChild: props.asChild,
  },
}))
</script>

<template>
  <SeparatorBase v-bind="uiCalculado.raiz" />
</template>
