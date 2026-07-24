<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { HoverCardRootEmits, HoverCardRootProps } from 'reka-ui'
import { HoverCardRoot, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<HoverCardRootProps>()
const emits = defineEmits<HoverCardRootEmits>()

const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const rootProps = computed(() => ({ ...attrs, ...forwarded.value }))
</script>

<template>
  <HoverCardRoot v-slot="slotProps" v-bind="rootProps" data-slot="hover-card">
    <slot v-bind="slotProps" />
  </HoverCardRoot>
</template>
