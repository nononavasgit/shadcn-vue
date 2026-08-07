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
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import {
  normalizeTooltipArrowProps,
  normalizeTooltipContentProps,
  normalizeTooltipRootProps,
  normalizeTooltipTriggerProps,
} from '.'
import type { TooltipContext, TooltipEmits, TooltipProps, TooltipSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<TooltipSlots>()

const props = withDefaults(defineProps<TooltipProps>(), {
  delayDuration: 0,
  trigger: undefined,
  content: undefined,
  arrow: undefined,
  ui: undefined,
})
defineEmits<TooltipEmits>()

const attrs = useAttrs()
const modelOpen = defineModel<boolean>('open')
const open = computed<boolean>({
  get: () => modelOpen.value ?? props.defaultOpen ?? false,
  set: (value) => {
    modelOpen.value = value
  },
})

function close() {
  open.value = false
}

const tooltipContext = computed<TooltipContext>(() => {
  const { ui, ...tooltipProps } = props
  void ui

  return {
    props: tooltipProps,
    open: open.value,
    close,
  }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, tooltipContext.value))
  const triggerUI = normalizeHTMLAttributes(useResolve(props.ui?.trigger, tooltipContext.value))
  const contentUI = normalizeHTMLAttributes(useResolve(props.ui?.content, tooltipContext.value))
  const arrowUI = normalizeHTMLAttributes(useResolve(props.ui?.arrow, tooltipContext.value))

  const rootProps = normalizeTooltipRootProps(props)
  const triggerProps = normalizeTooltipTriggerProps(props.trigger)
  const contentProps = normalizeTooltipContentProps(props.content)
  const arrowProps = normalizeTooltipArrowProps(props.arrow)

  return {
    root: {
      ...attrs,
      ...rootUI,
      ...rootProps,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    trigger: {
      asChild: true,
      ...triggerProps,
      ...triggerUI,
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
    <TooltipRoot v-bind="calculatedUI.root" v-model:open="open" data-slot="tooltip">
      <TooltipTrigger v-bind="calculatedUI.trigger" data-slot="tooltip-trigger">
        <slot v-bind="tooltipContext" />
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent v-bind="calculatedUI.content" data-slot="tooltip-content">
          <slot name="content" v-bind="tooltipContext">{{ props.label }}</slot>
          <slot name="arrow" v-bind="tooltipContext">
            <TooltipArrow v-bind="calculatedUI.arrow" data-slot="tooltip-arrow" />
          </slot>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
