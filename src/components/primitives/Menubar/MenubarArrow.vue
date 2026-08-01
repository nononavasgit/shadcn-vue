<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarArrowProps } from 'reka-ui'
import { MenubarArrow as MenubarArrowBase, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarArrowProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)

const arrowProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarArrowBase v-bind="arrowProps" data-slot="menubar-arrow">
    <slot />
  </MenubarArrowBase>
</template>
