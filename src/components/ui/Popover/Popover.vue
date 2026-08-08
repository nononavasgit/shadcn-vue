<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { PopoverContext, PopoverEmits, PopoverProps, PopoverSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<PopoverSlots>()

const props = withDefaults(defineProps<PopoverProps>(), {
  trigger: undefined,
  content: undefined,
  portal: undefined,
  arrow: undefined,
  showArrow: false,
  ui: undefined,
})
defineEmits<PopoverEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open', { default: false })

function close() {
  open.value = false
}

const popoverContext = computed<PopoverContext>(() => {
  const { ui, ...popoverProps } = props
  void ui

  return {
    props: popoverProps,
    open: open.value,
    close,
  }
})

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, popoverContext.value))

  return {
    ...attrs,
    ...rootUI,
    modal: props.modal,
    class: cn(attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})

const triggerProps = computed(() => {
  const triggerUI = normalizeHTMLAttributes(useResolve(props.ui?.trigger, popoverContext.value))

  return {
    as: props.trigger?.as,
    asChild: props.trigger?.asChild ?? true,
    ...triggerUI,
    class: cn(triggerUI.class),
    style: triggerUI.style,
  }
})

const contentProps = computed(() => {
  const normalizedContentUI = normalizeHTMLAttributes(
    useResolve(props.ui?.content, popoverContext.value),
  )
  const { dir: contentDirection, ...contentUI } = normalizedContentUI

  void contentDirection

  return {
    ...contentUI,
    as: props.content?.as,
    asChild: props.content?.asChild,
    align: props.content?.align,
    alignFlip: props.content?.alignFlip,
    alignOffset: props.content?.alignOffset,
    arrowPadding: props.content?.arrowPadding,
    avoidCollisions: props.content?.avoidCollisions,
    collisionBoundary: props.content?.collisionBoundary,
    collisionPadding: props.content?.collisionPadding ?? 8,
    dir: props.content?.dir,
    disableOutsidePointerEvents: props.content?.disableOutsidePointerEvents,
    disableUpdateOnLayoutShift: props.content?.disableUpdateOnLayoutShift,
    forceMount: props.content?.forceMount,
    hideShiftedArrow: props.content?.hideShiftedArrow,
    hideWhenDetached: props.content?.hideWhenDetached,
    positionStrategy: props.content?.positionStrategy,
    prioritizePosition: props.content?.prioritizePosition,
    side: props.content?.side,
    sideFlip: props.content?.sideFlip,
    sideOffset: props.content?.sideOffset ?? 4,
    sticky: props.content?.sticky,
    updatePositionStrategy: props.content?.updatePositionStrategy,
    onCloseAutoFocus: props.content?.onCloseAutoFocus,
    onEscapeKeyDown: props.content?.onEscapeKeyDown,
    onFocusOutside: props.content?.onFocusOutside,
    onInteractOutside: props.content?.onInteractOutside,
    onOpenAutoFocus: props.content?.onOpenAutoFocus,
    onPointerDownOutside: props.content?.onPointerDownOutside,
    class: cn(
      'data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 max-w-(--reka-popover-content-available-width) origin-(--reka-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
      contentUI.class,
    ),
    style: contentUI.style,
  }
})

const portalProps = computed(() => ({
  defer: props.portal?.defer,
  disabled: props.portal?.disabled,
  to: props.portal?.to,
  forceMount: props.portal?.forceMount,
}))

const arrowProps = computed(() => {
  const arrowUI = normalizeHTMLAttributes(useResolve(props.ui?.arrow, popoverContext.value))

  return {
    ...arrowUI,
    as: props.arrow?.as,
    asChild: props.arrow?.asChild,
    width: props.arrow?.width,
    height: props.arrow?.height,
    rounded: props.arrow?.rounded,
    class: cn('fill-popover', arrowUI.class),
    style: arrowUI.style,
  }
})
</script>

<template>
  <PopoverRoot v-bind="rootProps" v-model:open="open" data-slot="popover">
    <PopoverTrigger v-bind="triggerProps" data-slot="popover-trigger">
      <slot v-bind="popoverContext" />
    </PopoverTrigger>

    <PopoverPortal v-bind="portalProps">
      <PopoverContent v-if="$slots.content" v-bind="contentProps" data-slot="popover-content">
        <slot name="content" v-bind="popoverContext" />
        <slot v-if="props.showArrow || $slots.arrow" name="arrow" v-bind="popoverContext">
          <PopoverArrow v-bind="arrowProps" data-slot="popover-arrow" />
        </slot>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
