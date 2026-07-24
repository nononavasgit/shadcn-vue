<script setup lang="ts">
import { useAttrs } from 'vue'
import {
  Collapsible as CollapsibleBase,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible'
import type { CollapsibleEmits, CollapsibleProps, CollapsibleSlotProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(props: CollapsibleSlotProps): unknown
  content?(props: CollapsibleSlotProps): unknown
}>()

const props = withDefaults(defineProps<CollapsibleProps>(), {
  unmountOnHide: true,
})
defineEmits<CollapsibleEmits>()

const attrs = useAttrs()
const open = defineModel<boolean>('open')
</script>

<template>
  <CollapsibleBase
    v-slot="slotProps"
    v-bind="attrs"
    v-model:open="open"
    :as="props.as"
    :as-child="props.asChild"
    :default-open="props.defaultOpen"
    :disabled="props.disabled"
    :unmount-on-hide="props.unmountOnHide"
  >
    <CollapsibleTrigger v-bind="props.ui?.trigger" :as-child="props.ui?.trigger?.asChild ?? true">
      <slot v-bind="slotProps" />
    </CollapsibleTrigger>

    <CollapsibleContent
      v-if="$slots.content"
      v-bind="props.ui?.content"
      :force-mount="props.forceMount"
    >
      <slot name="content" v-bind="slotProps" />
    </CollapsibleContent>
  </CollapsibleBase>
</template>
