<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { HoverCardContent, HoverCardPortal, HoverCardRoot, HoverCardTrigger } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { normalizeContentProps, normalizeRootProps, normalizeTriggerProps } from '.'
import type { HoverCardEmits, HoverCardProps, HoverCardSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<HoverCardSlots>()

const props = withDefaults(defineProps<HoverCardProps>(), {
  label: undefined,
  openDelay: 700,
  closeDelay: 300,
  trigger: undefined,
  content: undefined,
  ui: undefined,
})
defineEmits<HoverCardEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const triggerUI = normalizeHTMLAttributes(props.ui?.trigger)
  const normalizedContentUI = normalizeHTMLAttributes(props.ui?.content)
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  const rootProps = normalizeRootProps(props)
  const triggerProps = normalizeTriggerProps(props.trigger)
  const contentProps = normalizeContentProps(props.content)

  void contentDirection

  return {
    root: {
      ...attrs,
      ...rootUI,
      ...rootProps,
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    trigger: {
      ...triggerUI,
      ...triggerProps,
      asChild: triggerProps?.asChild ?? true,
      class: cn(triggerUI.class),
      style: triggerUI.style,
    },
    content: {
      ...contentUI,
      ...contentProps,
      sideOffset: contentProps?.sideOffset ?? 4,
      class: cn(
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-64 origin-(--reka-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden',
        contentUI.class,
      ),
      style: contentUI.style,
    },
  }
})
</script>

<template>
  <HoverCardRoot
    v-slot="slotProps"
    v-bind="calculatedUI.root"
    v-model:open="open"
    data-slot="hover-card"
  >
    <HoverCardTrigger v-bind="calculatedUI.trigger" data-slot="hover-card-trigger">
      <slot :open="slotProps.open" />
    </HoverCardTrigger>

    <HoverCardPortal>
      <HoverCardContent
        v-if="$slots.content || props.label !== undefined"
        v-bind="calculatedUI.content"
        data-slot="hover-card-content"
      >
        <slot name="content" :open="slotProps.open">{{ props.label }}</slot>
      </HoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
