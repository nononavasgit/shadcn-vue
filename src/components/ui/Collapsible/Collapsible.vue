<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'reka-ui'
import { CollapsibleRoot, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<CollapsibleRootProps>()
const emits = defineEmits<CollapsibleRootEmits>()

const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const rootProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <CollapsibleRoot v-slot="slotProps" v-bind="rootProps" data-slot="collapsible">
    <slot v-bind="slotProps" />
  </CollapsibleRoot>
</template>
