<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarContentProps } from 'reka-ui'
import { MenubarContent as MenubarContentBase, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarContentProps>()
const emits = defineEmits<{
  escapeKeyDown: [event: KeyboardEvent]
  pointerDownOutside: [event: Event]
  focusOutside: [event: Event]
  interactOutside: [event: Event]
  closeAutoFocus: [event: Event]
}>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)

const contentProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarContentBase v-slot="slotProps" v-bind="contentProps" data-slot="menubar-content">
    <slot v-bind="slotProps" />
  </MenubarContentBase>
</template>
