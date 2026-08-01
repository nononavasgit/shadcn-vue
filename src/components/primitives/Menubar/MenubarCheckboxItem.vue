<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarCheckboxItemEmits, MenubarCheckboxItemProps } from 'reka-ui'
import { MenubarCheckboxItem as MenubarCheckboxItemBase, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarCheckboxItemProps>()
const emits = defineEmits<MenubarCheckboxItemEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)

const itemProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarCheckboxItemBase v-slot="slotProps" v-bind="itemProps" data-slot="menubar-checkbox-item">
    <slot v-bind="slotProps" />
  </MenubarCheckboxItemBase>
</template>
