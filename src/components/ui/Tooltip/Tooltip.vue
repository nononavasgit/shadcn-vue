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
import { createTooltipContext, type TooltipEmits, type TooltipProps, type TooltipSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<TooltipSlots>()

const props = withDefaults(defineProps<TooltipProps>(), {
  delayDuration: 0,
  withArrow: true,
  sideOffset: 2,
  ui: undefined,
})
defineEmits<TooltipEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open', { default: false })

function close() {
  open.value = false
}

const tooltipContext = computed(() => createTooltipContext(open.value, close))

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
    reference: props.triggerReference,
    asChild: true,
    ...triggerUI,
    class: cn(triggerUI.class),
    style: triggerUI.style,
  }
})

const contentProps = computed(() => {
  const contentUI = useUi(props.ui?.content, tooltipContext.value)

  return {
    ...contentUI,
    align: props.align,
    alignOffset: props.alignOffset,
    ariaLabel: props.ariaLabel,
    arrowPadding: props.arrowPadding,
    avoidCollisions: props.avoidCollisions,
    collisionBoundary: props.collisionBoundary,
    collisionPadding: props.collisionPadding,
    forceMount: props.forceMount,
    hideWhenDetached: props.hideWhenDetached,
    positionStrategy: props.positionStrategy,
    side: props.side,
    sideOffset: props.sideOffset,
    sticky: props.sticky,
    updatePositionStrategy: props.updatePositionStrategy,
    onEscapeKeyDown: props.onEscapeKeyDown,
    onPointerDownOutside: props.onPointerDownOutside,
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
    width: props.arrowWidth,
    height: props.arrowHeight,
    class: cn(ui.class),
    style: ui.style,
  }
})
</script>

<template>
  <TooltipProvider>
    <TooltipRoot v-bind="rootProps" v-model:open="open" data-slot="tooltip" data-test-tooltip-root>
      <TooltipTrigger v-bind="triggerProps" data-slot="tooltip-trigger" data-test-tooltip-trigger>
        <slot v-bind="tooltipContext" />
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent v-bind="contentProps" data-slot="tooltip-content" data-test-tooltip-content>
          <slot name="content" v-bind="tooltipContext">{{ props.label }}</slot>
          <TooltipArrow v-if="props.withArrow" v-bind="arrowProps" data-test-tooltip-arrow />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
