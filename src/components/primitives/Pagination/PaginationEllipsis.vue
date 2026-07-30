<script setup lang="ts">
import { MoreHorizontal } from '@lucide/vue'
import { useAttrs } from 'vue'
import type { PaginationEllipsisProps } from 'reka-ui'
import { PaginationEllipsis as RekaPaginationEllipsis, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<PaginationEllipsisProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)
</script>

<template>
  <RekaPaginationEllipsis
    v-bind="{ ...attrs, ...forwarded }"
    data-slot="pagination-ellipsis"
    :class="cn('flex size-9 items-center justify-center', attrs.class)"
  >
    <slot>
      <MoreHorizontal class="size-4" />
      <span class="sr-only">More pages</span>
    </slot>
  </RekaPaginationEllipsis>
</template>
