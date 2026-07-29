<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { ButtonGroupText as ButtonGroupTextBase } from '@/components/ui/ButtonGroup'
import type { ButtonGroupTextProps, ButtonGroupTextSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<ButtonGroupTextSlots>()

const props = withDefaults(defineProps<ButtonGroupTextProps>(), {
  as: 'div',
  asChild: false,
})
const attrs = useAttrs()
const calculatedProps = computed(() => ({
  ...attrs,
  as: props.as,
  asChild: props.asChild,
}))
</script>

<template>
  <ButtonGroupTextBase v-bind="calculatedProps">
    <slot>{{ props.label }}</slot>
  </ButtonGroupTextBase>
</template>
