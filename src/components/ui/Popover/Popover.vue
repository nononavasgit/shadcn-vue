<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { PopoverRootEmits, PopoverRootProps } from 'reka-ui'
import { PopoverRoot, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<PopoverRootProps>()
const emits = defineEmits<PopoverRootEmits>()

const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const rootProps = computed(() => ({ ...attrs, ...forwarded.value }))
</script>

<template>
  <PopoverRoot v-slot="slotProps" v-bind="rootProps" data-slot="popover">
    <slot v-bind="slotProps" />
  </PopoverRoot>
</template>
