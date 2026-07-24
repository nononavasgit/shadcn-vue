<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { DialogRootEmits, DialogRootProps } from 'reka-ui'
import { DialogRoot, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const rootProps = computed(() => ({ ...attrs, ...forwarded.value }))
</script>

<template>
  <DialogRoot v-slot="slotProps" v-bind="rootProps" data-slot="dialog">
    <slot v-bind="slotProps" />
  </DialogRoot>
</template>
