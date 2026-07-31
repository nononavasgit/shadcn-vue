<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Popover as PopoverBase,
  PopoverContent,
  PopoverTrigger,
} from '@/components/primitives/Popover'
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
import type { PopoverEmits, PopoverProps, PopoverSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<PopoverSlots>()

const props = withDefaults(defineProps<PopoverProps>(), {
  modal: false,
  trigger: undefined,
  content: undefined,
  ui: undefined,
})
defineEmits<PopoverEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const triggerUI = normalizeHTMLAttributes(props.ui?.trigger)
  const contentUI = normalizeHTMLAttributes(props.ui?.content)
  const trigger = props.trigger
  const content = props.content

  return {
    root: {
      ...attrs,
      ...rootUI,
      defaultOpen: props.defaultOpen,
      modal: props.modal,
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
      alignFlip: content?.alignFlip,
      avoidCollisions: content?.avoidCollisions ?? true,
      collisionPadding: mapCollisionPadding(content?.collisionPadding),
      forceMount: content?.forceMount,
      hideWhenDetached: content?.hideWhenDetached,
      positionStrategy: content?.positionStrategy
        ? POSITION_STRATEGIES[content.positionStrategy]
        : undefined,
      side: SIDES[content?.side ?? 'bottom'],
      sideFlip: content?.sideFlip ?? true,
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
  <PopoverBase v-slot="slotProps" v-model:open="open" v-bind="calculatedUI.root">
    <PopoverTrigger v-bind="calculatedUI.trigger">
      <slot :open="slotProps.open" :close="slotProps.close" />
    </PopoverTrigger>

    <PopoverContent v-if="$slots.content" v-bind="calculatedUI.content">
      <slot name="content" :open="slotProps.open" :close="slotProps.close" />
    </PopoverContent>
  </PopoverBase>
</template>
