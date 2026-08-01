<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarSeparatorProps } from 'reka-ui'
import { MenubarSeparator as MenubarSeparatorBase, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarSeparatorProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)

const separatorProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarSeparatorBase v-bind="separatorProps" data-slot="menubar-separator">
    <slot />
  </MenubarSeparatorBase>
</template>
