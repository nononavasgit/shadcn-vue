<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { PaginationListItemProps } from 'reka-ui'
import { PaginationListItem, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<PaginationListItemProps & { isActive?: boolean; size?: 'sm' | 'md' | 'lg' }>(),
  {
    as: 'button',
    isActive: false,
    size: 'md',
  },
)
const attrs = useAttrs()
const delegated = computed(() => ({
  as: props.as,
  asChild: props.asChild,
  value: props.value,
}))
const forwarded = useForwardProps(delegated)
</script>

<template>
  <PaginationListItem
    v-bind="{ ...attrs, ...forwarded }"
    data-slot="pagination-item"
    :class="
      cn(
        'inline-flex items-center justify-center rounded-md border border-transparent font-medium transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
        size === 'sm' && 'size-8 text-sm',
        size === 'md' && 'size-9 text-base',
        size === 'lg' && 'size-10 text-lg',
        isActive && 'border-input bg-background shadow-xs hover:bg-accent',
        attrs.class,
      )
    "
  >
    <slot />
  </PaginationListItem>
</template>
