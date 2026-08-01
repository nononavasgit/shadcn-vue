<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarSubTriggerProps } from 'reka-ui'
import { MenubarSubTrigger as MenubarSubTriggerBase, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarSubTriggerProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)

const triggerProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarSubTriggerBase v-slot="slotProps" v-bind="triggerProps" data-slot="menubar-sub-trigger">
    <slot v-bind="slotProps" />
  </MenubarSubTriggerBase>
</template>
