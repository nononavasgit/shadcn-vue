<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { TooltipProviderProps } from 'reka-ui'
import { TooltipProvider as RekaTooltipProvider } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TooltipProviderProps>(), {
  delayDuration: 0,
})

const attrs = useAttrs()
const rootProps = computed(() => ({ ...attrs, ...props }))
</script>

<template>
  <RekaTooltipProvider v-bind="rootProps">
    <slot />
  </RekaTooltipProvider>
</template>
