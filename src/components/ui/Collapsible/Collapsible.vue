<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { CollapsibleContext, CollapsibleEmits, CollapsibleProps, CollapsibleSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CollapsibleProps>(), {
  as: 'div',
  asChild: false,
  defaultOpen: false,
  disabled: false,
  unmountOnHide: false,
  trigger: undefined,
  content: undefined,
  ui: undefined,
})
defineEmits<CollapsibleEmits>()
defineSlots<CollapsibleSlots>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')

const collapsibleContext = computed<CollapsibleContext>(() => {
  const { ui, ...collapsibleProps } = props
  void ui

  return {
    props: collapsibleProps,
    open: open.value ?? props.defaultOpen,
  }
})

const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, collapsibleContext.value))
  const triggerUI = normalizeHTMLAttributes(useResolve(props.ui?.trigger, collapsibleContext.value))
  const normalizedContentUI = normalizeHTMLAttributes(
    useResolve(props.ui?.content, collapsibleContext.value),
  )
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  void contentDirection

  return {
    root: {
      ...attrs,
      ...rootUI,
      as: props.as,
      asChild: props.asChild,
      defaultOpen: props.defaultOpen,
      disabled: props.disabled,
      unmountOnHide: props.unmountOnHide,
      'data-slot': 'collapsible',
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    trigger: {
      ...triggerUI,
      as: props.trigger?.as,
      asChild: props.trigger?.asChild ?? true,
      'data-slot': 'collapsible-trigger',
      class: cn(triggerUI.class),
      style: triggerUI.style,
    },
    content: {
      ...contentUI,
      as: props.content?.as,
      asChild: props.content?.asChild,
      forceMount: props.content?.forceMount,
      'data-slot': 'collapsible-content',
      class: cn(contentUI.class),
      style: contentUI.style,
    },
  }
})
</script>

<template>
  <CollapsibleRoot v-model:open="open" v-bind="calculatedUI.root">
    <CollapsibleTrigger v-bind="calculatedUI.trigger">
      <slot name="trigger" v-bind="collapsibleContext">
        <slot v-bind="collapsibleContext" />
      </slot>
    </CollapsibleTrigger>

    <CollapsibleContent v-if="$slots.content" v-bind="calculatedUI.content">
      <slot name="content" v-bind="collapsibleContext" />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
