<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { CollapsibleContentProps } from 'reka-ui'
import { CollapsibleContent as RekaCollapsibleContent } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<CollapsibleContentProps>()
const attrs = useAttrs()
const rootProps = computed(() => ({ ...attrs, ...props }))
</script>

<template>
  <RekaCollapsibleContent v-bind="rootProps" data-slot="collapsible-content">
    <slot />
  </RekaCollapsibleContent>
</template>
