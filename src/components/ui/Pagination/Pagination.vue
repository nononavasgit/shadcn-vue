<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { PaginationRootEmits, PaginationRootProps } from 'reka-ui'
import { PaginationRoot, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<PaginationRootProps>()
const emits = defineEmits<PaginationRootEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <PaginationRoot
    v-slot="slotProps"
    v-bind="rootProps"
    data-slot="pagination"
    :class="cn('mx-auto flex w-full flex-wrap items-center justify-center gap-3', attrs.class)"
  >
    <slot v-bind="slotProps" />
  </PaginationRoot>
</template>
