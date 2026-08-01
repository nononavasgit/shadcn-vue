<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarMenuProps } from 'reka-ui'
import { MenubarMenu as MenubarMenuBase, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarMenuProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)

const menuProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarMenuBase v-bind="menuProps" data-slot="menubar-menu">
    <slot />
  </MenubarMenuBase>
</template>
