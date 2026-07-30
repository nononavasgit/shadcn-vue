<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { useAttrs } from 'vue'
import type { PaginationLastProps } from 'reka-ui'
import { PaginationLast as RekaPaginationLast, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PaginationLastProps>(), { as: 'button' })
const attrs = useAttrs()
const forwarded = useForwardProps(props)
</script>

<template>
  <RekaPaginationLast
    v-bind="{ ...attrs, ...forwarded }"
    data-slot="pagination-last"
    :class="
      cn(
        'inline-flex h-9 items-center justify-center gap-1 rounded-md px-2.5 text-sm font-medium transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
        attrs.class,
      )
    "
  >
    <slot>
      <span class="hidden sm:block">Last</span>
      <ChevronRight class="size-4" />
    </slot>
  </RekaPaginationLast>
</template>
