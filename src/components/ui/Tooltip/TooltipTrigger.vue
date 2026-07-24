<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { TooltipTriggerProps } from 'reka-ui'
import { TooltipTrigger as RekaTooltipTrigger } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<TooltipTriggerProps>()
const attrs = useAttrs()
const rootProps = computed(() => ({ ...attrs, ...props }))
</script>

<template>
  <RekaTooltipTrigger v-bind="rootProps" data-slot="tooltip-trigger">
    <slot />
  </RekaTooltipTrigger>
</template>
