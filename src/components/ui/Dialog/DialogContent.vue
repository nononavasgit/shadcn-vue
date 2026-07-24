<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { X } from '@lucide/vue'
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import { DialogContent as RekaDialogContent, DialogPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import DialogClose from './DialogClose.vue'
import DialogOverlay from './DialogOverlay.vue'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(): unknown
  close?(): unknown
}>()

const props = withDefaults(
  defineProps<DialogContentProps & { showCloseButton?: boolean; closeLabel?: string }>(),
  {
    showCloseButton: true,
    closeLabel: 'Close',
  },
)
const emits = defineEmits<DialogContentEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const contentProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  const delegated = { ...forwarded.value }
  Reflect.deleteProperty(delegated, 'showCloseButton')
  Reflect.deleteProperty(delegated, 'closeLabel')
  return { ...restAttrs, ...delegated }
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
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 sm:max-w-lg',
          attrs.class,
        )
      "
    >
      <slot />

      <DialogClose
        v-if="props.showCloseButton"
        class="absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      >
        <slot name="close">
          <X />
          <span class="sr-only">{{ props.closeLabel }}</span>
        </slot>
      </DialogClose>
    </RekaDialogContent>
  </DialogPortal>
</template>
