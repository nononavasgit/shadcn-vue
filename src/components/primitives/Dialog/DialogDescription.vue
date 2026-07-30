<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { DialogDescriptionProps } from 'reka-ui'
import { DialogDescription as RekaDialogDescription } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<DialogDescriptionProps>()
const attrs = useAttrs()
const descriptionProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...props }
})
</script>

<template>
  <RekaDialogDescription
    v-bind="descriptionProps"
    data-slot="dialog-description"
    :class="cn('text-sm text-muted-foreground', attrs.class)"
  >
    <slot />
  </RekaDialogDescription>
</template>
