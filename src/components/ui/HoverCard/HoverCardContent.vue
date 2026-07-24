<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { HoverCardContentProps } from 'reka-ui'
import { HoverCardContent as RekaHoverCardContent, HoverCardPortal, useForwardProps } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<HoverCardContentProps>(), {
  sideOffset: 4,
})
const attrs = useAttrs()
const forwarded = useForwardProps(props)
const contentProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...forwarded.value }
})
</script>

<template>
  <HoverCardPortal>
    <RekaHoverCardContent
      v-bind="contentProps"
      data-slot="hover-card-content"
      :class="
        cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--reka-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
          attrs.class,
        )
      "
    >
      <slot />
    </RekaHoverCardContent>
  </HoverCardPortal>
</template>
