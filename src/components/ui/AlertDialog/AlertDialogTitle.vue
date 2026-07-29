<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { AlertDialogTitleProps } from 'reka-ui'
import { AlertDialogTitle as RekaAlertDialogTitle } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<AlertDialogTitleProps>()
const attrs = useAttrs()
const titleProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...props }
})
</script>

<template>
  <RekaAlertDialogTitle
    v-bind="titleProps"
    data-slot="alert-dialog-title"
    :class="cn('text-lg leading-none font-semibold', attrs.class)"
  >
    <slot />
  </RekaAlertDialogTitle>
</template>
