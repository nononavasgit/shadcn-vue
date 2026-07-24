<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { PopoverAnchorProps } from 'reka-ui'
import { PopoverAnchor as RekaPopoverAnchor } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<PopoverAnchorProps>()
const attrs = useAttrs()
const rootProps = computed(() => ({ ...attrs, ...props }))
</script>

<template>
  <RekaPopoverAnchor v-bind="rootProps" data-slot="popover-anchor">
    <slot />
  </RekaPopoverAnchor>
</template>
