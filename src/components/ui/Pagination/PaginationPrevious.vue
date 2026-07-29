<script setup lang="ts">
import { ChevronLeft } from '@lucide/vue'
import { useAttrs } from 'vue'
import type { PaginationPrevProps } from 'reka-ui'
import { PaginationPrev, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PaginationPrevProps>(), { as: 'button' })
const attrs = useAttrs()
const forwarded = useForwardProps(props)
</script>

<template>
  <PaginationPrev
    v-bind="{ ...attrs, ...forwarded }"
    data-slot="pagination-previous"
    :class="
      cn(
        'inline-flex h-9 items-center justify-center gap-1 rounded-md px-2.5 text-sm font-medium transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
        attrs.class,
      )
    "
  >
    <slot>
      <ChevronLeft class="size-4" />
      <span class="hidden sm:block">Previous</span>
    </slot>
  </PaginationPrev>
</template>
