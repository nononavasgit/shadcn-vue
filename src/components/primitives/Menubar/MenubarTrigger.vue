<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarTriggerProps } from 'reka-ui'
import { MenubarTrigger as MenubarTriggerBase, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarTriggerProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)

const triggerProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarTriggerBase v-bind="triggerProps" data-slot="menubar-trigger">
    <slot />
  </MenubarTriggerBase>
</template>
