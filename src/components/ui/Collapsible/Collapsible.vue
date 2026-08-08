<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { CollapsibleContext, CollapsibleProps, CollapsibleSlots } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CollapsibleProps>(), {
  as: 'div',
  asChild: false,
  disabled: false,
  unmountOnHide: false,
  trigger: undefined,
  content: undefined,
  ui: undefined,
})
const emit = defineEmits<{ valueChange: [value: boolean] }>()
defineSlots<CollapsibleSlots>()

const attrs = useAttrs()
const open = defineModel<boolean>('open', { default: false })

watch(open, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const collapsibleContext = computed<CollapsibleContext>(() => {
  const { ui, ...collapsibleProps } = props
  void ui

  return {
    props: collapsibleProps,
    open: open.value,
  }
})

const rootProps = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, collapsibleContext.value))

  return {
    ...attrs,
    ...rootUI,
    as: props.as,
    asChild: props.asChild,
    disabled: props.disabled,
    unmountOnHide: props.unmountOnHide,
    'data-slot': 'collapsible',
    class: cn(attrs.class, rootUI.class),
    style: [attrs.style, rootUI.style],
  }
})

const triggerProps = computed(() => {
  const triggerUI = normalizeHTMLAttributes(useResolve(props.ui?.trigger, collapsibleContext.value))

  return {
    ...triggerUI,
    as: props.trigger?.as,
    asChild: props.trigger?.asChild ?? true,
    'data-slot': 'collapsible-trigger',
    class: cn(triggerUI.class),
    style: triggerUI.style,
  }
})

const contentProps = computed(() => {
  const normalizedContentUI = normalizeHTMLAttributes(
    useResolve(props.ui?.content, collapsibleContext.value),
  )
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  void contentDirection

  return {
    ...contentUI,
    as: props.content?.as,
    asChild: props.content?.asChild,
    forceMount: props.content?.forceMount,
    'data-slot': 'collapsible-content',
    class: cn(contentUI.class),
    style: contentUI.style,
  }
})
</script>

<template>
  <CollapsibleRoot v-model:open="open" v-bind="rootProps">
    <CollapsibleTrigger v-bind="triggerProps">
      <slot name="trigger" v-bind="collapsibleContext">
        <slot v-bind="collapsibleContext" />
      </slot>
    </CollapsibleTrigger>

    <CollapsibleContent v-if="$slots.content" v-bind="contentProps">
      <slot name="content" v-bind="collapsibleContext" />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
