<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { DialogCloseProps } from 'reka-ui'
import { DialogClose } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<DialogCloseProps>()
const attrs = useAttrs()
const closeProps = computed(() => ({ ...attrs, ...props }))
</script>

<template>
  <DialogClose v-bind="closeProps" data-slot="sheet-close">
    <slot />
  </DialogClose>
</template>
