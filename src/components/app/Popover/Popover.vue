<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Popover as PopoverBase, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
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
  side: 'bottom',
  sideOffset: 4,
  sideFlip: true,
  align: 'center',
  avoidCollisions: true,
})
defineEmits<PopoverEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')

const calculatedUI = computed(() => {
  const { forceMount: contentForceMount, ...contentUI } = props.ui?.content ?? {}

  return {
    root: {
      ...attrs,
      defaultOpen: props.defaultOpen,
      modal: props.modal,
    },
    trigger: {
      ...props.ui?.trigger,
      asChild: props.ui?.trigger?.asChild ?? true,
    },
    content: {
      ...contentUI,
      align: ALIGNS[props.align],
      alignOffset: props.alignOffset,
      alignFlip: props.alignFlip,
      avoidCollisions: props.avoidCollisions,
      collisionPadding: mapCollisionPadding(props.collisionPadding),
      forceMount: props.forceMount ?? contentForceMount,
      hideWhenDetached: props.hideWhenDetached,
      positionStrategy: props.positionStrategy
        ? POSITION_STRATEGIES[props.positionStrategy]
        : undefined,
      side: SIDES[props.side],
      sideFlip: props.sideFlip,
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
  <PopoverBase v-slot="slotProps" v-model:open="open" v-bind="calculatedUI.root">
    <PopoverTrigger v-bind="calculatedUI.trigger">
      <slot :open="slotProps.open" :close="slotProps.close" />
    </PopoverTrigger>

    <PopoverContent v-if="$slots.content" v-bind="calculatedUI.content">
      <slot name="content" :open="slotProps.open" :close="slotProps.close" />
    </PopoverContent>
  </PopoverBase>
</template>
