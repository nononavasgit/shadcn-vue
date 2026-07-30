<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { CollapsibleTriggerProps } from 'reka-ui'
import { CollapsibleTrigger as RekaCollapsibleTrigger } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<CollapsibleTriggerProps>()
const attrs = useAttrs()
const rootProps = computed(() => ({ ...attrs, ...props }))
</script>

<template>
  <RekaCollapsibleTrigger v-bind="rootProps" data-slot="collapsible-trigger">
    <slot />
  </RekaCollapsibleTrigger>
</template>
