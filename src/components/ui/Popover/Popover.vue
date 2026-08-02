<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger, PopoverArrow } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { PopoverEmits, PopoverProps, PopoverSlots } from '.'
import {
  normalizeContentProps,
  normalizePortalProps,
  normalizeArrowProps,
  normalizeRootProps,
} from '.'

defineOptions({ inheritAttrs: false })

defineSlots<PopoverSlots>()

const props = withDefaults(defineProps<PopoverProps>(), {
  trigger: undefined,
  content: undefined,
  showArrow: false,
  ui: undefined,
})

defineEmits<PopoverEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')

const calculatedUI = computed(() => {
  // Normalize UI attributes
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const triggerUI = normalizeHTMLAttributes(props.ui?.trigger)
  const normalizedContentUI = normalizeHTMLAttributes(props.ui?.content)
  const { dir: contentDirection, ...contentUI } = normalizedContentUI

  void contentDirection
  const arrowUI = normalizeHTMLAttributes(props.ui?.arrow)

  // Normalize props
  const rootProps = normalizeRootProps(props)
  const portalProps = normalizePortalProps(props.portal)
  const contentProps = normalizeContentProps(props.content)
  const arrowProps = normalizeArrowProps(props.arrow)

  return {
    root: {
      ...attrs,
      ...rootUI,
      ...rootProps,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    trigger: {
      ...triggerUI,
      asChild: true,
      class: cn(triggerUI.class),
      style: triggerUI.style,
    },
    content: {
      ...contentUI,
      ...contentProps,
      sideOffset: contentProps?.sideOffset ?? 4,
      collisionPadding: contentProps?.collisionPadding ?? 8,
      class: cn(
        'data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 max-w-(--reka-popover-content-available-width) origin-(--reka-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
        contentUI.class,
      ),
      style: contentUI.style,
    },
    portal: {
      ...portalProps,
    },
    arrow: {
      ...arrowUI,
      ...arrowProps,
      class: cn('fill-popover', arrowUI.class),
      style: arrowUI.style,
    },
  }
})
</script>

<template>
  <PopoverRoot v-slot="slotProps" v-bind="calculatedUI.root" v-model:open="open">
    <PopoverTrigger v-bind="calculatedUI.trigger">
      <slot :open="slotProps.open" :close="slotProps.close"></slot>
    </PopoverTrigger>

    <PopoverPortal v-bind="calculatedUI.portal">
      <PopoverContent v-if="$slots.content" v-bind="calculatedUI.content">
        <slot name="content" :open="slotProps.open" :close="slotProps.close" />
        <PopoverArrow v-if="props.showArrow" v-bind="calculatedUI.arrow" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
