<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AlertDialogDescriptionProps } from 'reka-ui'
import { AlertDialogDescription as RekaAlertDialogDescription } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<AlertDialogDescriptionProps>()
const attrs = useAttrs()
const descriptionProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...props }
})
</script>

<template>
  <RekaAlertDialogDescription
    v-bind="descriptionProps"
    data-slot="alert-dialog-description"
    :class="cn('text-sm text-muted-foreground', attrs.class)"
  >
    <slot />
  </RekaAlertDialogDescription>
</template>
