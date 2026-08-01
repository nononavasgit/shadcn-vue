<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarSubEmits, MenubarSubProps } from 'reka-ui'
import { MenubarSub as MenubarSubBase, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarSubProps>()
const emits = defineEmits<MenubarSubEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)

const subProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarSubBase v-slot="slotProps" v-bind="subProps" data-slot="menubar-sub">
    <slot v-bind="slotProps" />
  </MenubarSubBase>
</template>
