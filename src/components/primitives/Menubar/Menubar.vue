<script setup lang="ts">
import { computed, mergeProps, useAttrs } from 'vue'
import type { MenubarRootEmits, MenubarRootProps } from 'reka-ui'
import { MenubarRoot as MenubarRootBase, useForwardPropsEmits } from 'reka-ui'

defineOptions({ inheritAttrs: false })

const props = defineProps<MenubarRootProps>()
const emits = defineEmits<MenubarRootEmits>()
const attrs = useAttrs()
const forwarded = useForwardPropsEmits(props, emits)

const rootProps = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return mergeProps(restAttrs, forwarded.value)
})
</script>

<template>
  <MenubarRootBase v-slot="slotProps" v-bind="rootProps" data-slot="menubar">
    <slot v-bind="slotProps" />
  </MenubarRootBase>
</template>
