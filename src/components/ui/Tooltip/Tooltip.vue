<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { normalizeArrowProps, normalizeContentProps, normalizeRootProps } from '.'
import type { TooltipEmits, TooltipProps, TooltipSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<TooltipSlots>()

const props = withDefaults(defineProps<TooltipProps>(), {
  delayDuration: 0,
  content: undefined,
  arrow: undefined,
  ui: undefined,
})
defineEmits<TooltipEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')

const calculatedUI = computed(() => {
  // Normalize UI attributes
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const triggerUI = normalizeHTMLAttributes(props.ui?.trigger)
  const contentUI = normalizeHTMLAttributes(props.ui?.content)
  const arrowUI = normalizeHTMLAttributes(props.ui?.arrow)

  // Normalize props
  const rootProps = normalizeRootProps(props)
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
      sideOffset: contentProps?.sideOffset ?? 2,
      class: cn(
        'data-[state=closed]:animate-out data-[state=delayed-open]:animate-in data-[state=instant-open]:animate-in data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=instant-open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95 data-[state=instant-open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--reka-tooltip-content-transform-origin) rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background border border-zinc-200 bg-white text-zinc-950 shadow-md',
        contentUI.class,
      ),
      style: contentUI.style,
    },
    arrow: {
      ...arrowUI,
      ...arrowProps,
      class: cn(arrowUI.class),
      style: arrowUI.style,
    },
  }
})
</script>

<template>
  <TooltipProvider>
    <TooltipRoot
      v-slot="slotProps"
      v-bind="calculatedUI.root"
      v-model:open="open"
      data-slot="tooltip"
    >
      <TooltipTrigger v-bind="calculatedUI.trigger" data-slot="tooltip-trigger">
        <slot :open="slotProps.open" />
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent v-bind="calculatedUI.content" data-slot="tooltip-content">
          <slot name="content" :open="slotProps.open">{{ props.label }}</slot>
          <TooltipArrow v-bind="calculatedUI.arrow" data-slot="tooltip-arrow" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
