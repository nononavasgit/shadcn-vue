<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AlertDialogCancelProps } from 'reka-ui'
import { AlertDialogCancel as RekaAlertDialogCancel } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<AlertDialogCancelProps>()
const attrs = useAttrs()
const cancelProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...props }
})
</script>

<template>
  <RekaAlertDialogCancel
    v-bind="cancelProps"
    data-slot="alert-dialog-cancel"
    :class="
      cn(
        !props.asChild &&
          'mt-2 inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-secondary-foreground/30 bg-transparent px-4 py-2 text-base font-medium whitespace-nowrap text-secondary-foreground transition-colors outline-none hover:bg-secondary focus-visible:border-secondary-foreground focus-visible:ring-[3px] focus-visible:ring-secondary-foreground/20 active:bg-secondary/70 disabled:pointer-events-none disabled:opacity-50 sm:mt-0',
        attrs.class,
      )
    "
  >
    <slot />
  </RekaAlertDialogCancel>
</template>
