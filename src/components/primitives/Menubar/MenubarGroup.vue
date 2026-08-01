<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarGroupProps } from 'reka-ui'
import { MenubarGroup as MenubarGroupBase, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarGroupProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)

const groupProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarGroupBase v-bind="groupProps" data-slot="menubar-group">
    <slot />
  </MenubarGroupBase>
</template>
