<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { DialogTitleProps } from 'reka-ui'
import { DialogTitle as RekaDialogTitle } from 'reka-ui'
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
  <RekaDialogTitle
    v-bind="titleProps"
    data-slot="dialog-title"
    :class="cn('text-lg leading-none font-semibold', attrs.class)"
  >
    <slot />
  </RekaDialogTitle>
</template>
