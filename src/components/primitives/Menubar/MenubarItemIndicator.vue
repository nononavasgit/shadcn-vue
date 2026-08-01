<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarItemIndicatorProps } from 'reka-ui'
import { MenubarItemIndicator as MenubarItemIndicatorBase, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarItemIndicatorProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)

const indicatorProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarItemIndicatorBase v-bind="indicatorProps" data-slot="menubar-item-indicator">
    <slot />
  </MenubarItemIndicatorBase>
</template>
