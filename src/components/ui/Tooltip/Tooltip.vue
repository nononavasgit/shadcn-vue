<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Tooltip as TooltipBase,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/primitives/Tooltip'
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
defineEmits<TooltipEmits>()

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
      class: cn('border border-zinc-200 bg-white text-zinc-950 shadow-md', contentUI.class),
      style: contentUI.style,
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
    <TooltipBase v-slot="slotProps" v-model:open="open" v-bind="calculatedUI.root">
      <TooltipTrigger v-bind="calculatedUI.trigger">
        <slot :open="slotProps.open" />
      </TooltipTrigger>

      <TooltipContent v-bind="calculatedUI.content">
        <slot name="content" :open="slotProps.open">{{ props.label }}</slot>

        <TooltipArrow v-bind="calculatedUI.arrow" />
      </TooltipContent>
    </TooltipBase>
  </TooltipProvider>
</template>
