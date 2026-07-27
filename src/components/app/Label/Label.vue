<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Label as LabelBase } from '@/components/ui/Label'
import type { LabelProps, LabelSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<LabelSlots>()

const props = defineProps<LabelProps>()
const attrs = useAttrs()

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    for: props.for,
  },
}))
</script>

<template>
  <LabelBase v-bind="uiCalculado.raiz">
    <slot />
  </LabelBase>
</template>
