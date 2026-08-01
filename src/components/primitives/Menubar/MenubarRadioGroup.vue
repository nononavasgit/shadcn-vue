<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarRadioGroupEmits, MenubarRadioGroupProps } from 'reka-ui'
import { MenubarRadioGroup as MenubarRadioGroupBase, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarRadioGroupProps>()
const emits = defineEmits<MenubarRadioGroupEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)

const groupProps = computed(() => mergeProps(attrs, forwarded.value))
</script>

<template>
  <MenubarRadioGroupBase v-slot="slotProps" v-bind="groupProps" data-slot="menubar-radio-group">
    <slot v-bind="slotProps" />
  </MenubarRadioGroupBase>
</template>
