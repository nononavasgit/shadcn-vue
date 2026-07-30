<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Label as LabelBase } from '@/components/primitives/Label'
import type { LabelProps, LabelSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<LabelSlots>()

const props = defineProps<LabelProps>()
const attrs = useAttrs()

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    for: props.for,
  },
}))
</script>

<template>
  <LabelBase v-bind="calculatedUI.root">
    <slot />
  </LabelBase>
</template>
