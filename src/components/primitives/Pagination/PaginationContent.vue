<script setup lang="ts">
import { useAttrs } from 'vue'
import type { PaginationListProps } from 'reka-ui'
import { PaginationList, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<PaginationListProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationList
    v-slot="slotProps"
    v-bind="{ ...attrs, ...forwarded }"
    data-slot="pagination-content"
    :class="cn('flex flex-row items-center gap-1', attrs.class)"
  >
    <slot v-bind="slotProps" />
  </PaginationList>
</template>
