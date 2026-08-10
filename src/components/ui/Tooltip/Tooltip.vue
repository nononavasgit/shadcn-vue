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
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
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
const open = defineModel<boolean>('open', { default: false })

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

const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, tooltipContext.value)

  return {
    ...attrs,
    ...rootUI,
    delayDuration: props.delayDuration,
    disableHoverableContent: props.disableHoverableContent,
    disableClosingTrigger: props.disableClosingTrigger,
    disabled: props.disabled,
    ignoreNonKeyboardFocus: props.ignoreNonKeyboardFocus,
    class: cn(attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})

const triggerProps = computed(() => {
  const triggerUI = useUi(props.ui?.trigger, tooltipContext.value)

  return {
    as: props.trigger?.as,
    asChild: props.trigger?.asChild ?? true,
    reference: props.trigger?.reference,
    ...triggerUI,
    class: cn(triggerUI.class),
    style: triggerUI.style,
  }
})

const contentProps = computed(() => {
  const contentUI = useUi(props.ui?.content, tooltipContext.value)

  return {
    ...contentUI,
    as: props.content?.as,
    asChild: props.content?.asChild,
    align: props.content?.align,
    alignOffset: props.content?.alignOffset,
    ariaLabel: props.content?.ariaLabel,
    arrowPadding: props.content?.arrowPadding,
    avoidCollisions: props.content?.avoidCollisions,
    collisionBoundary: props.content?.collisionBoundary,
    collisionPadding: props.content?.collisionPadding,
    forceMount: props.content?.forceMount,
    hideWhenDetached: props.content?.hideWhenDetached,
    positionStrategy: props.content?.positionStrategy,
    side: props.content?.side,
    sideOffset: props.content?.sideOffset ?? 2,
    sticky: props.content?.sticky,
    updatePositionStrategy: props.content?.updatePositionStrategy,
    onEscapeKeyDown: props.content?.onEscapeKeyDown,
    onPointerDownOutside: props.content?.onPointerDownOutside,
    class: cn(
      'data-[state=closed]:animate-out data-[state=delayed-open]:animate-in data-[state=instant-open]:animate-in data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=instant-open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95 data-[state=instant-open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--reka-tooltip-content-transform-origin) rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background border border-zinc-200 bg-white text-zinc-950 shadow-md',
      contentUI.class,
    ),
    style: contentUI.style,
  }
})

const arrowProps = computed(() => {
  const ui = useUi(props.ui?.arrow, tooltipContext.value)
  return {
    ...ui,
    as: props.arrow?.as,
    asChild: props.arrow?.asChild,
    width: props.arrow?.width,
    height: props.arrow?.height,
    class: cn(ui.class),
    style: ui.style,
  }
})
</script>

<template>
  <TooltipProvider>
    <TooltipRoot v-bind="rootProps" v-model:open="open" data-slot="tooltip">
      <TooltipTrigger v-bind="triggerProps" data-slot="tooltip-trigger">
        <slot v-bind="tooltipContext" />
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent v-bind="contentProps" data-slot="tooltip-content">
          <slot name="content" v-bind="tooltipContext">{{ props.label }}</slot>
          <slot name="arrow" v-bind="tooltipContext">
            <TooltipArrow v-bind="arrowProps" data-slot="tooltip-arrow" />
          </slot>
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
