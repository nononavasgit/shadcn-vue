<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarRadioItemEmits, MenubarRadioItemProps } from 'reka-ui'
import { MenubarRadioItem as MenubarRadioItemBase, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarRadioItemProps>()
const emits = defineEmits<MenubarRadioItemEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)

const itemProps = computed(
  () =>
    mergeProps(attrs, forwarded.value, {
      'data-slot': 'menubar-radio-item',
    }) as MenubarRadioItemProps & Record<string, unknown>,
)
</script>

<template>
  <MenubarRadioItemBase v-slot="slotProps" v-bind="itemProps">
    <slot v-bind="slotProps" />
  </MenubarRadioItemBase>
</template>
