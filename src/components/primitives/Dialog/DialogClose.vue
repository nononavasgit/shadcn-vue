<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { DialogCloseProps } from 'reka-ui'
import { DialogClose as RekaDialogClose } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<DialogCloseProps>()
const attrs = useAttrs()
const closeProps = computed(() => ({ ...attrs, ...props }))
</script>

<template>
  <RekaDialogClose v-bind="closeProps" data-slot="dialog-close">
    <slot />
  </RekaDialogClose>
</template>
