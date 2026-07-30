<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { HoverCardTriggerProps } from 'reka-ui'
import { HoverCardTrigger as RekaHoverCardTrigger } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<HoverCardTriggerProps>()
const attrs = useAttrs()
const rootProps = computed(() => ({ ...attrs, ...props }))
</script>

<template>
  <RekaHoverCardTrigger v-bind="rootProps" data-slot="hover-card-trigger">
    <slot />
  </RekaHoverCardTrigger>
</template>
