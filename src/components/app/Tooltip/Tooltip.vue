<script setup lang="ts">
import { useAttrs } from 'vue'
import {
  Tooltip as TooltipBase,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'
import { cn } from '@/lib/utils'
import type { TooltipEmits, TooltipProps, TooltipSlotProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(props: TooltipSlotProps): unknown
  content?(props: TooltipSlotProps): unknown
}>()

const props = withDefaults(defineProps<TooltipProps>(), {
  delayDuration: 0,
  side: 'top',
  sideOffset: 2,
  align: 'center',
})
defineEmits<TooltipEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')
</script>

<template>
  <TooltipProvider
    :delay-duration="props.delayDuration"
    :disable-closing-trigger="props.disableClosingTrigger"
    :disable-hoverable-content="props.disableHoverableContent"
    :disabled="props.disabled"
    :ignore-non-keyboard-focus="props.ignoreNonKeyboardFocus"
    :skip-delay-duration="props.skipDelayDuration"
  >
    <TooltipBase
      v-slot="slotProps"
      v-bind="attrs"
      v-model:open="open"
      :default-open="props.defaultOpen"
      :disable-closing-trigger="props.disableClosingTrigger"
      :disable-hoverable-content="props.disableHoverableContent"
      :disabled="props.disabled"
      :ignore-non-keyboard-focus="props.ignoreNonKeyboardFocus"
    >
      <TooltipTrigger v-bind="props.ui?.trigger" :as-child="props.ui?.trigger?.asChild ?? true">
        <slot v-bind="slotProps" />
      </TooltipTrigger>

      <TooltipContent
        v-bind="props.ui?.content"
        :align="props.align"
        :align-offset="props.alignOffset"
        :aria-label="props.ariaLabel"
        :arrow-padding="props.arrowPadding"
        :avoid-collisions="props.avoidCollisions"
        :class="
          cn('border border-zinc-200 bg-white text-zinc-950 shadow-md', props.ui?.content?.class)
        "
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

        <TooltipArrow v-bind="props.ui?.arrow" :class="cn(props.ui?.arrow?.class)" />
      </TooltipContent>
    </TooltipBase>
  </TooltipProvider>
</template>
