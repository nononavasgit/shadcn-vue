<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { PopoverTriggerProps } from 'reka-ui'
import { PopoverTrigger as RekaPopoverTrigger } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<PopoverTriggerProps>()
const attrs = useAttrs()
const rootProps = computed(() => ({ ...attrs, ...props }))
</script>

<template>
  <RekaPopoverTrigger v-bind="rootProps" data-slot="popover-trigger">
    <slot />
  </RekaPopoverTrigger>
</template>
