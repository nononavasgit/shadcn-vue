<script setup lang="ts">
import { useAttrs } from 'vue'
import {
  HoverCard as HoverCardBase,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/HoverCard'
import type { HoverCardEmits, HoverCardProps, HoverCardSlotProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(props: HoverCardSlotProps): unknown
  content?(props: HoverCardSlotProps): unknown
}>()

const props = withDefaults(defineProps<HoverCardProps>(), {
  openDelay: 700,
  closeDelay: 300,
  side: 'bottom',
  sideOffset: 4,
  align: 'center',
})
defineEmits<HoverCardEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')
</script>

<template>
  <HoverCardBase
    v-slot="slotProps"
    v-bind="attrs"
    v-model:open="open"
    :close-delay="props.closeDelay"
    :default-open="props.defaultOpen"
    :enable-touch="props.enableTouch"
    :open-delay="props.openDelay"
  >
    <HoverCardTrigger v-bind="props.ui?.trigger" :as-child="props.ui?.trigger?.asChild ?? true">
      <slot v-bind="slotProps" />
    </HoverCardTrigger>

    <HoverCardContent
      v-if="$slots.content || props.content !== undefined"
      v-bind="props.ui?.content"
      :align="props.align"
      :align-offset="props.alignOffset"
      :arrow-padding="props.arrowPadding"
      :avoid-collisions="props.avoidCollisions"
      :collision-padding="props.collisionPadding"
      :force-mount="props.forceMount"
      :hide-when-detached="props.hideWhenDetached"
      :position-strategy="props.positionStrategy"
      :side="props.side"
      :side-offset="props.sideOffset"
      :sticky="props.sticky"
      :update-position-strategy="props.updatePositionStrategy"
    >
      <slot name="content" v-bind="slotProps">{{ props.content }}</slot>
    </HoverCardContent>
  </HoverCardBase>
</template>
