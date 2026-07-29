<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ButtonGroup as ButtonGroupBase } from '@/components/ui/ButtonGroup'
import type { ButtonGroupProps, ButtonGroupSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<ButtonGroupSlots>()

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
})
const attrs = useAttrs()
const calculatedProps = computed(() => ({
  ...attrs,
  orientation: props.orientation,
}))
</script>

<template>
  <ButtonGroupBase v-bind="calculatedProps">
    <slot />
  </ButtonGroupBase>
</template>
