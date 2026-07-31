<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Collapsible as CollapsibleBase,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/primitives/Collapsible'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import { normalizeCollapsibleContentProps, normalizeCollapsibleTriggerProps } from '.'
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
  const rootUI = normalizeHTMLAttributes(props.ui?.root)
  const triggerUI = normalizeHTMLAttributes(props.ui?.trigger)
  const normalizedContentUI = normalizeHTMLAttributes(props.ui?.content)
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
  <CollapsibleBase v-slot="slotProps" v-model:open="open" v-bind="calculatedUI.root">
    <CollapsibleTrigger v-bind="calculatedUI.trigger"
      ><slot :open="slotProps.open"
    /></CollapsibleTrigger>
    <CollapsibleContent v-if="$slots.content" v-bind="calculatedUI.content"
      ><slot name="content" :open="slotProps.open"
    /></CollapsibleContent>
  </CollapsibleBase>
</template>
