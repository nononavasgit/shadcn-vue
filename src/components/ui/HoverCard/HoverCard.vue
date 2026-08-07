<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  HoverCardArrow,
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
} from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import {
  normalizeHoverCardArrowProps,
  normalizeHoverCardContentProps,
  normalizeHoverCardPortalProps,
  normalizeHoverCardRootProps,
  normalizeHoverCardTriggerProps,
} from '.'
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
const modelOpen = defineModel<boolean>('open')
const open = computed<boolean>({
  get: () => modelOpen.value ?? props.defaultOpen ?? false,
  set: (value) => {
    modelOpen.value = value
  },
})

function close() {
  open.value = false
}

const hoverCardContext = computed<HoverCardContext>(() => {
  const { ui, ...hoverCardProps } = props
  void ui

  return { props: hoverCardProps, open: open.value, close }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, hoverCardContext.value))
  const triggerUI = normalizeHTMLAttributes(useResolve(props.ui?.trigger, hoverCardContext.value))
  const normalizedContentUI = normalizeHTMLAttributes(
    useResolve(props.ui?.content, hoverCardContext.value),
  )
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  const arrowUI = normalizeHTMLAttributes(useResolve(props.ui?.arrow, hoverCardContext.value))

  void contentDirection

  const contentProps = normalizeHoverCardContentProps(props.content)

  return {
    root: {
      ...attrs,
      ...rootUI,
      ...normalizeHoverCardRootProps(props),
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    trigger: {
      asChild: true,
      ...normalizeHoverCardTriggerProps(props.trigger),
      ...triggerUI,
      class: cn(triggerUI.class),
      style: triggerUI.style,
    },
    content: {
      ...contentUI,
      ...contentProps,
      sideOffset: contentProps?.sideOffset ?? 4,
      collisionPadding: contentProps?.collisionPadding ?? 8,
      class: cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 max-w-(--reka-hover-card-content-available-width) origin-(--reka-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
        contentUI.class,
      ),
      style: contentUI.style,
    },
    portal: normalizeHoverCardPortalProps(props.portal),
    arrow: {
      ...arrowUI,
      ...normalizeHoverCardArrowProps(props.arrow),
      class: cn('fill-popover', arrowUI.class),
      style: arrowUI.style,
    },
  }
})
</script>

<template>
  <HoverCardRoot v-bind="calculatedUI.root" v-model:open="open" data-slot="hover-card">
    <HoverCardTrigger v-bind="calculatedUI.trigger" data-slot="hover-card-trigger">
      <slot v-bind="hoverCardContext" />
    </HoverCardTrigger>

    <HoverCardPortal v-bind="calculatedUI.portal">
      <HoverCardContent
        v-if="$slots.content || props.label !== undefined"
        v-bind="calculatedUI.content"
        data-slot="hover-card-content"
      >
        <slot name="content" v-bind="hoverCardContext">{{ props.label }}</slot>
        <slot v-if="props.showArrow || $slots.arrow" name="arrow" v-bind="hoverCardContext">
          <HoverCardArrow v-bind="calculatedUI.arrow" data-slot="hover-card-arrow" />
        </slot>
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
