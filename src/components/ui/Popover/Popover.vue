<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { PopoverArrow, PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import {
  normalizePopoverArrowProps,
  normalizePopoverContentProps,
  normalizePopoverPortalProps,
  normalizePopoverRootProps,
  normalizePopoverTriggerProps,
} from '.'
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

const popoverContext = computed<PopoverContext>(() => {
  const { ui, ...popoverProps } = props
  void ui

  return {
    props: popoverProps,
    open: open.value,
    close,
  }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, popoverContext.value))
  const triggerUI = normalizeHTMLAttributes(useResolve(props.ui?.trigger, popoverContext.value))
  const normalizedContentUI = normalizeHTMLAttributes(
    useResolve(props.ui?.content, popoverContext.value),
  )
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  const arrowUI = normalizeHTMLAttributes(useResolve(props.ui?.arrow, popoverContext.value))

  void contentDirection

  const rootProps = normalizePopoverRootProps(props)
  const triggerProps = normalizePopoverTriggerProps(props.trigger)
  const contentProps = normalizePopoverContentProps(props.content)
  const portalProps = normalizePopoverPortalProps(props.portal)
  const arrowProps = normalizePopoverArrowProps(props.arrow)

  return {
    root: {
      ...attrs,
      ...rootUI,
      ...rootProps,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    trigger: {
      asChild: true,
      ...triggerProps,
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
        'data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 max-w-(--reka-popover-content-available-width) origin-(--reka-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
        contentUI.class,
      ),
      style: contentUI.style,
    },
    portal: portalProps,
    arrow: {
      ...arrowUI,
      ...arrowProps,
      class: cn('fill-popover', arrowUI.class),
      style: arrowUI.style,
    },
  }
})
</script>

<template>
  <PopoverRoot v-bind="calculatedUI.root" v-model:open="open" data-slot="popover">
    <PopoverTrigger v-bind="calculatedUI.trigger" data-slot="popover-trigger">
      <slot v-bind="popoverContext" />
    </PopoverTrigger>

    <PopoverPortal v-bind="calculatedUI.portal">
      <PopoverContent
        v-if="$slots.content"
        v-bind="calculatedUI.content"
        data-slot="popover-content"
      >
        <slot name="content" v-bind="popoverContext" />
        <slot v-if="props.showArrow || $slots.arrow" name="arrow" v-bind="popoverContext">
          <PopoverArrow v-bind="calculatedUI.arrow" data-slot="popover-arrow" />
        </slot>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
