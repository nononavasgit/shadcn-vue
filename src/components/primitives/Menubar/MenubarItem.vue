<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarItemEmits, MenubarItemProps } from 'reka-ui'
import { MenubarItem as MenubarItemBase, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarItemProps>()
const emits = defineEmits<MenubarItemEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)

const itemProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarItemBase v-slot="slotProps" v-bind="itemProps" data-slot="menubar-item">
    <slot v-bind="slotProps" />
  </MenubarItemBase>
</template>
