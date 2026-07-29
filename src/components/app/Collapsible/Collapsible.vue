<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Collapsible as CollapsibleBase,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible'
import type { CollapsibleEmits, CollapsibleProps, CollapsibleSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<CollapsibleSlots>()

const props = withDefaults(defineProps<CollapsibleProps>(), {
  unmountOnHide: false,
})
defineEmits<CollapsibleEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')

const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    disabled: props.disabled,
    unmountOnHide: props.unmountOnHide,
  },
  trigger: {
    ...props.ui?.trigger,
    asChild: props.ui?.trigger?.asChild ?? true,
  },
  content: {
    ...props.ui?.content,
    forceMount: props.forceMount,
  },
}))
</script>

<template>
  <CollapsibleBase v-slot="slotProps" v-model:open="open" v-bind="calculatedUI.root">
    <CollapsibleTrigger v-bind="calculatedUI.trigger">
      <slot :open="slotProps.open" />
    </CollapsibleTrigger>

    <CollapsibleContent v-if="$slots.content" v-bind="calculatedUI.content">
      <slot name="content" :open="slotProps.open" />
    </CollapsibleContent>
  </CollapsibleBase>
</template>
