<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import type { CollapsibleContext, CollapsibleEmits, CollapsibleProps, CollapsibleSlots } from '.'
import { collapsibleDefaults } from './default'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CollapsibleProps>(), collapsibleDefaults)
defineEmits<CollapsibleEmits>()
defineSlots<CollapsibleSlots>()

const attrs = useAttrs()
const open = defineModel<boolean>('open', { default: false })

const collapsibleContext = computed<CollapsibleContext>(() => ({ open: open.value }))

const rootProps = computed(() => {
  return {
    ...attrs,
    disabled: props.disabled,
    unmountOnHide: props.unmountOnHide,
    class: cn(attrs.class),
    style: attrs.style,
  }
})

const triggerProps = computed(() => {
  const triggerUI = useUi(props.ui?.trigger, collapsibleContext.value)

  return {
    ...triggerUI,
    asChild: true,
    class: cn(triggerUI.class),
    style: triggerUI.style,
  }
})

const contentProps = computed(() => {
  const normalizedContentUI = useUi(props.ui?.content, collapsibleContext.value)
  const { dir: contentDirection, ...contentUI } = normalizedContentUI
  void contentDirection

  return {
    ...contentUI,
    class: cn(contentUI.class),
    style: contentUI.style,
  }
})
</script>

<template>
  <CollapsibleRoot v-model:open="open" v-bind="rootProps" data-test-collapsible-root>
    <CollapsibleTrigger v-bind="triggerProps" data-test-collapsible-trigger>
      <slot v-bind="collapsibleContext" />
    </CollapsibleTrigger>

    <CollapsibleContent v-if="$slots.content" v-bind="contentProps" data-test-collapsible-content>
      <slot name="content" v-bind="collapsibleContext" />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
