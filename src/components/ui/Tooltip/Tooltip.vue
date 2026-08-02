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
import {
  ALIGNS,
  mapCollisionPadding,
  POSITION_STRATEGIES,
  SIDES,
  STICKY_VALUES,
  UPDATE_POSITION_STRATEGIES,
} from '.'
import type { TooltipEmits, TooltipProps, TooltipSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<TooltipSlots>()

const props = withDefaults(defineProps<TooltipProps>(), {
  delayDuration: 0,
  trigger: undefined,
  content: undefined,
  arrow: undefined,
  ui: undefined,
})
const emit = defineEmits<TooltipEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const triggerUI = normalizeHTMLAttributes(props.ui?.trigger)
  const contentUI = normalizeHTMLAttributes(props.ui?.content)
  const arrowUI = normalizeHTMLAttributes(props.ui?.arrow)
  const trigger = props.trigger
  const content = props.content
  const arrow = props.arrow

  return {
    provider: {
      delayDuration: props.delayDuration,
      disableClosingTrigger: props.disableClosingTrigger,
      disableHoverableContent: props.disableHoverableContent,
      disabled: props.disabled,
      ignoreNonKeyboardFocus: props.ignoreNonKeyboardFocus,
      skipDelayDuration: props.skipDelayDuration,
    },
    root: {
      ...attrs,
      ...rootUI,
      defaultOpen: props.defaultOpen,
      disableClosingTrigger: props.disableClosingTrigger,
      disableHoverableContent: props.disableHoverableContent,
      disabled: props.disabled,
      ignoreNonKeyboardFocus: props.ignoreNonKeyboardFocus,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    trigger: {
      ...triggerUI,
      as: trigger?.as,
      asChild: trigger?.asChild ?? true,
      class: cn(triggerUI.class),
      style: triggerUI.style,
    },
    content: {
      ...contentUI,
      as: content?.as,
      asChild: content?.asChild,
      align: ALIGNS[content?.align ?? 'center'],
      alignOffset: content?.alignOffset,
      arrowPadding: content?.arrowPadding,
      avoidCollisions: content?.avoidCollisions ?? true,
      class: cn(
        'data-[state=closed]:animate-out data-[state=delayed-open]:animate-in data-[state=instant-open]:animate-in data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0 data-[state=instant-open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=delayed-open]:zoom-in-95 data-[state=instant-open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--reka-tooltip-content-transform-origin) rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background border border-zinc-200 bg-white text-zinc-950 shadow-md',
        contentUI.class,
      ),
      style: contentUI.style,
      onEscapeKeyDown: (event: KeyboardEvent) => emit('escapeKeyDown', event),
      onPointerDownOutside: (event: Event) => emit('pointerDownOutside', event),
      collisionPadding: mapCollisionPadding(content?.collisionPadding),
      forceMount: content?.forceMount,
      hideWhenDetached: content?.hideWhenDetached,
      positionStrategy: content?.positionStrategy
        ? POSITION_STRATEGIES[content.positionStrategy]
        : undefined,
      side: SIDES[content?.side ?? 'top'],
      sideOffset: content?.sideOffset ?? 2,
      sticky: content?.sticky ? STICKY_VALUES[content.sticky] : undefined,
      updatePositionStrategy: content?.updatePositionStrategy
        ? UPDATE_POSITION_STRATEGIES[content.updatePositionStrategy]
        : undefined,
    },
    arrow: {
      ...arrowUI,
      as: arrow?.as,
      asChild: arrow?.asChild,
      width: arrow?.width,
      height: arrow?.height,
      class: cn(arrowUI.class),
      style: arrowUI.style,
    },
  }
})
</script>

<template>
  <TooltipProvider v-bind="calculatedUI.provider">
    <TooltipRoot
      v-slot="slotProps"
      v-model:open="open"
      v-bind="calculatedUI.root"
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
