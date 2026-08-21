<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { PopoverContext, PopoverEmits, PopoverProps, PopoverSlots } from '.'
import { popoverDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

defineSlots<PopoverSlots>()

const props = withDefaults(defineProps<PopoverProps>(), popoverDefaults)
const emit = defineEmits<PopoverEmits>()

const slots = useSlots()
const portalTarget = ref<HTMLElement>()
const open = defineModel<boolean>('open', { default: false })

watch(open, (value, previousValue) => {
  if (value === previousValue) return
  if (value) emit('show')
  else emit('close')
})

function close() {
  open.value = false
}

const popoverContext = computed<PopoverContext>(() => ({
  open: open.value,
  close,
}))

const rootProps = computed(() => ({
  modal: props.modal,
}))

const contentProps = computed(() => {
  const contentUI = useUi(props.ui?.content, popoverContext.value)

  return {
    forceMount: props.forceMount,
    align: props.align,
    alignFlip: props.alignFlip,
    alignOffset: props.alignOffset,
    arrowPadding: props.arrowPadding,
    avoidCollisions: props.avoidCollisions,
    collisionPadding: props.collisionPadding,
    disableOutsidePointerEvents: props.disableOutsidePointerEvents,
    disableUpdateOnLayoutShift: props.disableUpdateOnLayoutShift,
    hideShiftedArrow: props.hideShiftedArrow,
    hideWhenDetached: props.hideWhenDetached,
    positionStrategy: props.positionStrategy,
    prioritizePosition: props.prioritizePosition,
    side: props.side,
    sideFlip: props.sideFlip,
    sideOffset: props.sideOffset,
    sticky: props.sticky,
    updatePositionStrategy: props.updatePositionStrategy,
    onCloseAutoFocus: (event: PopoverEmits['closeAutoFocus'][0]) => emit('closeAutoFocus', event),
    onEscapeKeyDown: (event: PopoverEmits['escapeKeyDown'][0]) => emit('escapeKeyDown', event),
    onFocusOutside: (event: PopoverEmits['focusOutside'][0]) => emit('focusOutside', event),
    onInteractOutside: (event: PopoverEmits['interactOutside'][0]) =>
      emit('interactOutside', event),
    onOpenAutoFocus: (event: PopoverEmits['openAutoFocus'][0]) => emit('openAutoFocus', event),
    onPointerDownOutside: (event: PopoverEmits['pointerDownOutside'][0]) =>
      emit('pointerDownOutside', event),
    ...contentUI,
    class: cn(
      'data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 max-w-(--reka-popover-content-available-width) origin-(--reka-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
      contentUI.class,
    ),
    style: contentUI.style,
  }
})

const arrowProps = computed(() => {
  const arrowUI = useUi(props.ui?.arrow, popoverContext.value)

  return {
    ...arrowUI,
    width: props.arrowWidth,
    height: props.arrowHeight,
    rounded: props.arrowRounded,
    class: cn('fill-popover', arrowUI.class),
    style: arrowUI.style,
  }
})
</script>

<template>
  <div class="contents" data-test-popover-root>
    <PopoverRoot v-bind="rootProps" v-model:open="open">
      <PopoverTrigger as-child data-test-popover-trigger>
        <slot v-bind="popoverContext" />
      </PopoverTrigger>

      <PopoverPortal :to="portalTarget">
        <PopoverContent v-if="slots.content" v-bind="contentProps" data-test-popover-content>
          <slot name="content" v-bind="popoverContext" />
          <slot v-if="props.showArrow || slots.arrow" name="arrow" v-bind="popoverContext">
            <PopoverArrow v-bind="arrowProps" data-test-popover-arrow />
          </slot>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
    <div ref="portalTarget" data-test-popover-portal-target />
  </div>
</template>
