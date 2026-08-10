<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
} from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { HoverCardContext, HoverCardEmits, HoverCardProps, HoverCardSlots } from '.'

defineOptions({ inheritAttrs: false })
defineSlots<HoverCardSlots>()

const props = withDefaults(defineProps<HoverCardProps>(), {
  label: undefined,
  openDelay: 700,
  closeDelay: 300,
  trigger: undefined,
  content: undefined,
  portal: undefined,
  arrow: undefined,
  showArrow: false,
  ui: undefined,
})
defineEmits<HoverCardEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open', { default: false })

function close() {
  open.value = false
}

const hoverCardContext = computed<HoverCardContext>(() => {
  const { ui, ...hoverCardProps } = props
  void ui

  return { props: hoverCardProps, open: open.value, close }
})

const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, hoverCardContext.value)

  return {
    ...attrs,
    ...rootUI,
    openDelay: props.openDelay,
    closeDelay: props.closeDelay,
    enableTouch: props.enableTouch,
    class: cn(attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})

const triggerProps = computed(() => {
  const triggerUI = useUi(props.ui?.trigger, hoverCardContext.value)

  return {
    asChild: props.trigger?.asChild ?? true,
    as: props.trigger?.as,
    reference: props.trigger?.reference,
    ...triggerUI,
    class: cn(triggerUI.class),
    style: triggerUI.style,
  }
})

const contentProps = computed(() => {
  const normalizedContentUI = useUi(props.ui?.content, hoverCardContext.value)
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
    class: cn(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 max-w-(--reka-hover-card-content-available-width) origin-(--reka-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
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
  const arrowUI = useUi(props.ui?.arrow, hoverCardContext.value)

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
  <HoverCardRoot v-bind="rootProps" v-model:open="open" data-slot="hover-card">
    <HoverCardTrigger v-bind="triggerProps" data-slot="hover-card-trigger">
      <slot v-bind="hoverCardContext" />
    </HoverCardTrigger>

    <HoverCardPortal v-bind="portalProps">
      <HoverCardContent
        v-if="$slots.content || props.label !== undefined"
        v-bind="contentProps"
        data-slot="hover-card-content"
      >
        <slot name="content" v-bind="hoverCardContext">{{ props.label }}</slot>
        <slot v-if="props.showArrow || $slots.arrow" name="arrow" v-bind="hoverCardContext">
          <HoverCardArrow v-bind="arrowProps" data-slot="hover-card-arrow" />
        </slot>
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
