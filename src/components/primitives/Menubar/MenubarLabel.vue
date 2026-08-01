<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarLabelProps } from 'reka-ui'
import { MenubarLabel as MenubarLabelBase, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarLabelProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)

const labelProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarLabelBase v-bind="labelProps" data-slot="menubar-label">
    <slot />
  </MenubarLabelBase>
</template>
