<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { TooltipRootEmits, TooltipRootProps } from 'reka-ui'
import { TooltipRoot, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<TooltipRootProps>()
const emits = defineEmits<TooltipRootEmits>()

const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const rootProps = computed(() => ({ ...attrs, ...forwarded.value }))
</script>

<template>
  <TooltipRoot v-slot="slotProps" v-bind="rootProps" data-slot="tooltip">
    <slot v-bind="slotProps" />
  </TooltipRoot>
</template>
