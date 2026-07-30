<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import { DialogContent as RekaDialogContent, DialogPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import DialogOverlay from './DialogOverlay.vue'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(): unknown
  close?(): unknown
}>()

const props = defineProps<DialogContentProps>()
const emits = defineEmits<DialogContentEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const contentProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...forwarded.value }
})
</script>

<template>
  <DialogPortal>
    <DialogOverlay />
    <RekaDialogContent
      v-bind="contentProps"
      data-slot="dialog-content"
      :class="
        cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 pointer-events-auto fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 sm:max-w-lg',
          'max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden',
          attrs.class,
        )
      "
    >
      <slot />
      <slot name="close" />
    </RekaDialogContent>
  </DialogPortal>
</template>
