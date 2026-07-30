<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Separator as SeparatorBase } from '@/components/primitives/Separator'
import type { SeparatorProps } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: true,
})

const attrs = useAttrs()

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    orientation: props.orientation,
    decorative: props.decorative,
    as: props.as,
    asChild: props.asChild,
  },
}))
</script>

<template>
  <SeparatorBase v-bind="calculatedUI.root" />
</template>
