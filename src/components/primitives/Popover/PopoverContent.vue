<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui'
import { PopoverContent as RekaPopoverContent, PopoverPortal, useForwardPropsEmits } from 'reka-ui'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<PopoverContentProps>(), {
  align: 'center',
  sideOffset: 4,
})
const emits = defineEmits<PopoverContentEmits>()

const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)
const contentProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return { ...restAttrs, ...forwarded.value }
})
</script>

<template>
  <PopoverPortal>
    <RekaPopoverContent
      v-bind="contentProps"
      data-slot="popover-content"
      :class="
        cn(
          'data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 max-w-(--reka-popover-content-available-width) origin-(--reka-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
          attrs.class,
        )
      "
    >
      <slot />
    </RekaPopoverContent>
  </PopoverPortal>
</template>
