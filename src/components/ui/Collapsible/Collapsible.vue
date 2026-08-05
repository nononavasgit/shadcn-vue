<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import {
  normalizeCollapsibleContentProps,
  normalizeCollapsibleTriggerProps,
  resolveCollapsibleUIValue,
} from '.'
import type { CollapsibleEmits, CollapsibleProps, CollapsibleSlots } from '.'

defineOptions({ inheritAttrs: false })
defineSlots<CollapsibleSlots>()
const props = withDefaults(defineProps<CollapsibleProps>(), {
  unmountOnHide: false,
  trigger: undefined,
  content: undefined,
  ui: undefined,
})
defineEmits<CollapsibleEmits>()
const attrs = useAttrs()
const open = defineModel<boolean>('open')

const calculatedUI = computed(() => {
  const context = { open: open.value ?? false }
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const triggerUI = normalizeHTMLAttributes(resolveCollapsibleUIValue(props.ui?.trigger, context))
  const normalizedContentUI = normalizeHTMLAttributes(
    resolveCollapsibleUIValue(props.ui?.content, context),
  )
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  const trigger = normalizeCollapsibleTriggerProps(props.trigger)
  const content = normalizeCollapsibleContentProps(props.content)
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
      class: cn(attrs.class, rootUI.class),
      style: [attrs.style, rootUI.style],
    },
    trigger: {
      ...triggerUI,
      ...trigger,
      asChild: trigger?.asChild ?? true,
      class: cn(triggerUI.class),
      style: triggerUI.style,
    },
    content: { ...contentUI, ...content, class: cn(contentUI.class), style: contentUI.style },
  }
})
</script>

<template>
  <CollapsibleRoot
    v-slot="context"
    v-model:open="open"
    v-bind="calculatedUI.root"
    data-slot="collapsible"
  >
    <CollapsibleTrigger v-bind="calculatedUI.trigger" data-slot="collapsible-trigger">
      <slot v-bind="context" />
    </CollapsibleTrigger>
    <CollapsibleContent
      v-if="$slots.content"
      v-bind="calculatedUI.content"
      data-slot="collapsible-content"
    >
      <slot name="content" v-bind="context" />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
