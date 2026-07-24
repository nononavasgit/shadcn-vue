<script setup lang="ts">
import { useAttrs } from 'vue'
import { Popover as PopoverBase, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import type { PopoverEmits, PopoverProps, PopoverSlotProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(props: PopoverSlotProps): unknown
  content?(props: PopoverSlotProps): unknown
}>()

const props = defineProps<PopoverProps>()
defineEmits<PopoverEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')
</script>

<template>
  <PopoverBase
    v-slot="slotProps"
    v-bind="attrs"
    v-model:open="open"
    :default-open="props.defaultOpen"
    :modal="props.modal"
  >
    <PopoverTrigger v-bind="props.ui?.trigger" :as-child="props.ui?.trigger?.asChild ?? true">
      <slot v-bind="slotProps" />
    </PopoverTrigger>

    <PopoverContent
      v-if="$slots.content"
      v-bind="props.ui?.content"
      :align="props.align"
      :align-offset="props.alignOffset"
      :align-flip="props.alignFlip"
      :avoid-collisions="props.avoidCollisions"
      :collision-padding="props.collisionPadding"
      :force-mount="props.forceMount"
      :hide-when-detached="props.hideWhenDetached"
      :position-strategy="props.positionStrategy"
      :side="props.side"
      :side-flip="props.sideFlip"
      :side-offset="props.sideOffset"
      :sticky="props.sticky"
      :update-position-strategy="props.updatePositionStrategy"
    >
      <slot name="content" v-bind="slotProps" />
    </PopoverContent>
  </PopoverBase>
</template>
