<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarPortalProps } from 'reka-ui'
import { MenubarPortal as MenubarPortalBase, useForwardProps } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarPortalProps>()
const attrs = useAttrs()
const forwarded = useForwardProps(props)

const portalProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarPortalBase v-bind="portalProps" data-slot="menubar-portal">
    <slot />
  </MenubarPortalBase>
</template>
