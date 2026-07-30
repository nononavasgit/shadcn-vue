<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Tooltip as TooltipBase,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/primitives/Tooltip'
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
  side: 'top',
  sideOffset: 2,
  align: 'center',
  avoidCollisions: true,
})
defineEmits<TooltipEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')

const calculatedUI = computed(() => {
  const { forceMount: contentForceMount, ...contentUI } = props.ui?.content ?? {}
  const arrowUI = props.ui?.arrow ?? {}

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
      defaultOpen: props.defaultOpen,
      disableClosingTrigger: props.disableClosingTrigger,
      disableHoverableContent: props.disableHoverableContent,
      disabled: props.disabled,
      ignoreNonKeyboardFocus: props.ignoreNonKeyboardFocus,
    },
    trigger: {
      ...props.ui?.trigger,
      asChild: props.ui?.trigger?.asChild ?? true,
    },
    content: {
      ...contentUI,
      align: ALIGNS[props.align],
      alignOffset: props.alignOffset,
      arrowPadding: props.arrowPadding,
      avoidCollisions: props.avoidCollisions,
      class: cn('border border-zinc-200 bg-white text-zinc-950 shadow-md', contentUI.class),
      collisionPadding: mapCollisionPadding(props.collisionPadding),
      forceMount: props.forceMount ?? contentForceMount,
      hideWhenDetached: props.hideWhenDetached,
      positionStrategy: props.positionStrategy
        ? POSITION_STRATEGIES[props.positionStrategy]
        : undefined,
      side: SIDES[props.side],
      sideOffset: props.sideOffset,
      sticky: props.sticky ? STICKY_VALUES[props.sticky] : undefined,
      updatePositionStrategy: props.updatePositionStrategy
        ? UPDATE_POSITION_STRATEGIES[props.updatePositionStrategy]
        : undefined,
    },
    arrow: {
      ...arrowUI,
      width: props.arrowWidth,
      height: props.arrowHeight,
      class: cn('', arrowUI.class),
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
        <slot name="content" :open="slotProps.open">{{ props.content }}</slot>

        <TooltipArrow v-bind="calculatedUI.arrow" />
      </TooltipContent>
    </TooltipBase>
  </TooltipProvider>
</template>
