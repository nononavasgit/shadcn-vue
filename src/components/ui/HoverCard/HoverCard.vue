<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  HoverCard as HoverCardBase,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/primitives/HoverCard'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import {
  ALIGNS,
  mapCollisionPadding,
  normalizeHoverCardContentProps,
  normalizeHoverCardTriggerProps,
  POSITION_STRATEGIES,
  SIDES,
  STICKY_VALUES,
  UPDATE_POSITION_STRATEGIES,
} from '.'
import type { HoverCardEmits, HoverCardProps, HoverCardSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<HoverCardSlots>()

const props = withDefaults(defineProps<HoverCardProps>(), {
  label: undefined,
  openDelay: 700,
  closeDelay: 300,
  trigger: undefined,
  content: undefined,
  ui: undefined,
})
defineEmits<HoverCardEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const triggerUI = normalizeHTMLAttributes(props.ui?.trigger)
  const normalizedContentUI = normalizeHTMLAttributes(props.ui?.content)
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  const trigger = normalizeHoverCardTriggerProps(props.trigger)
  const content = normalizeHoverCardContentProps(props.content)

  void contentDirection

  return {
    root: {
      ...attrs,
      ...rootUI,
      defaultOpen: props.defaultOpen,
      openDelay: props.openDelay,
      closeDelay: props.closeDelay,
      enableTouch: props.enableTouch,
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
      collisionPadding: mapCollisionPadding(content?.collisionPadding),
      forceMount: content?.forceMount,
      hideWhenDetached: content?.hideWhenDetached,
      positionStrategy: content?.positionStrategy
        ? POSITION_STRATEGIES[content.positionStrategy]
        : undefined,
      side: SIDES[content?.side ?? 'bottom'],
      sideOffset: content?.sideOffset ?? 4,
      sticky: content?.sticky ? STICKY_VALUES[content.sticky] : undefined,
      updatePositionStrategy: content?.updatePositionStrategy
        ? UPDATE_POSITION_STRATEGIES[content.updatePositionStrategy]
        : undefined,
      class: cn(contentUI.class),
      style: contentUI.style,
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
      v-if="$slots.content || props.label !== undefined"
      v-bind="calculatedUI.content"
    >
      <slot name="content" :open="slotProps.open">{{ props.label }}</slot>
    </HoverCardContent>
  </HoverCardBase>
</template>
