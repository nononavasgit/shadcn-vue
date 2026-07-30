<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AlertDialogActionProps } from 'reka-ui'
import { AlertDialogAction as RekaAlertDialogAction } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<AlertDialogActionProps>()
const attrs = useAttrs()
const actionProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...props }
})
</script>

<template>
  <RekaAlertDialogAction
    v-bind="actionProps"
    data-slot="alert-dialog-action"
    :class="
      cn(
        !props.asChild &&
          'inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-md border border-transparent bg-primary px-4 py-2 text-base font-medium whitespace-nowrap text-primary-foreground transition-colors outline-none hover:bg-primary/90 focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-primary/30 active:bg-primary/80 disabled:pointer-events-none disabled:opacity-50',
        attrs.class,
      )
    "
  >
    <slot />
  </RekaAlertDialogAction>
</template>
