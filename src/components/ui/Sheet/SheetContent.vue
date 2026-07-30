<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import { DialogContent, DialogPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'
import SheetOverlay from './SheetOverlay.vue'

type SheetSide = 'top' | 'right' | 'bottom' | 'left'

interface SheetContentProps extends DialogContentProps {
  side?: SheetSide
}

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(): unknown
  close?(): unknown
}>()

const props = withDefaults(defineProps<SheetContentProps>(), {
  side: 'right',
})
const emits = defineEmits<DialogContentEmits>()
const attrs = useAttrs()
const delegatedProps = computed(() => {
  const delegated = { ...props }
  delete delegated.side
  return delegated
})
const forwarded = useForwardPropsEmits(delegatedProps, emits)
const contentProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...forwarded.value }
})
</script>

<template>
  <DialogPortal>
    <SheetOverlay />
    <DialogContent
      v-bind="contentProps"
      data-slot="sheet-content"
      :class="
        cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out pointer-events-auto fixed z-50 grid grid-rows-[auto_minmax(0,1fr)_auto] gap-4 overflow-hidden bg-background shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
          side === 'right' &&
            'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          side === 'left' &&
            'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          side === 'top' &&
            'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 max-h-[90dvh] w-full border-b',
          side === 'bottom' &&
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 max-h-[90dvh] w-full border-t',
          attrs.class,
        )
      "
    >
      <slot />
      <slot name="close" />
    </DialogContent>
  </DialogPortal>
</template>
