<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarSubContentProps } from 'reka-ui'
import { MenubarSubContent as MenubarSubContentBase, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarSubContentProps>()
const emits = defineEmits<{
  escapeKeyDown: [event: KeyboardEvent]
  pointerDownOutside: [event: Event]
  focusOutside: [event: Event]
  interactOutside: [event: Event]
  entryFocus: [event: Event]
  openAutoFocus: [event: Event]
  closeAutoFocus: [event: Event]
}>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)

const contentProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarSubContentBase v-slot="slotProps" v-bind="contentProps" data-slot="menubar-sub-content">
    <slot v-bind="slotProps" />
  </MenubarSubContentBase>
</template>
