<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { useAttrs } from 'vue'
import type { PaginationNextProps } from 'reka-ui'
import { PaginationNext as RekaPaginationNext, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PaginationNextProps>(), { as: 'button' })
const attrs = useAttrs()
const forwarded = useForwardProps(props)
</script>

<template>
  <RekaPaginationNext
    v-bind="{ ...attrs, ...forwarded }"
    data-slot="pagination-next"
    :class="
      cn(
        'inline-flex h-9 items-center justify-center gap-1 rounded-md px-2.5 text-sm font-medium transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
        attrs.class,
      )
    "
  >
    <slot>
      <span class="hidden sm:block">Next</span>
      <ChevronRight class="size-4" />
    </slot>
  </RekaPaginationNext>
</template>
