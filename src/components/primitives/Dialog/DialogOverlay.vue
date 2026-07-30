<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { DialogOverlayProps } from 'reka-ui'
import { DialogOverlay as RekaDialogOverlay } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<DialogOverlayProps>()
const attrs = useAttrs()
const overlayProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...props }
})
</script>

<template>
  <RekaDialogOverlay
    v-bind="overlayProps"
    data-slot="dialog-overlay"
    :class="
      cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50',
        attrs.class,
      )
    "
  />
</template>
