<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AlertDialogEmits, AlertDialogProps } from 'reka-ui'
import { AlertDialogRoot, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<AlertDialogProps>()
const emits = defineEmits<AlertDialogEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const rootProps = computed(() => ({ ...attrs, ...forwarded.value }))
</script>

<template>
  <AlertDialogRoot v-slot="slotProps" v-bind="rootProps" data-slot="alert-dialog">
    <slot v-bind="slotProps" />
  </AlertDialogRoot>
</template>
