<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { DialogTitleProps } from 'reka-ui'
import { DialogTitle } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<DialogTitleProps>()
const attrs = useAttrs()
const titleProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...props }
})
</script>

<template>
  <DialogTitle
    v-bind="titleProps"
    data-slot="sheet-title"
    :class="cn('font-semibold text-foreground', attrs.class)"
  >
    <slot />
  </DialogTitle>
</template>
