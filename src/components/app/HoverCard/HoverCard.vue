<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  HoverCard as HoverCardBase,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/HoverCard'
import {
  ALIGNS,
  mapCollisionPadding,
  POSITION_STRATEGIES,
  SIDES,
  STICKY_VALUES,
  UPDATE_POSITION_STRATEGIES,
} from '.'
import type { HoverCardEmits, HoverCardProps, HoverCardSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<HoverCardSlots>()

const props = withDefaults(defineProps<HoverCardProps>(), {
  openDelay: 700,
  closeDelay: 300,
  side: 'bottom',
  sideOffset: 4,
  align: 'center',
  avoidCollisions: true,
})
defineEmits<HoverCardEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')

const calculatedUI = computed(() => {
  const { forceMount: contentForceMount, ...contentUI } = props.ui?.content ?? {}

  return {
    root: {
      ...attrs,
      defaultOpen: props.defaultOpen,
      openDelay: props.openDelay,
      closeDelay: props.closeDelay,
      enableTouch: props.enableTouch,
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
  }
})
</script>

<template>
  <HoverCardBase v-slot="slotProps" v-model:open="open" v-bind="calculatedUI.root">
    <HoverCardTrigger v-bind="calculatedUI.trigger">
      <slot :open="slotProps.open" />
    </HoverCardTrigger>

    <HoverCardContent
      v-if="$slots.content || props.content !== undefined"
      v-bind="calculatedUI.content"
    >
      <slot name="content" :open="slotProps.open">{{ props.content }}</slot>
    </HoverCardContent>
  </HoverCardBase>
</template>
