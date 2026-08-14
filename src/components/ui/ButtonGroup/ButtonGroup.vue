<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import {
  buttonGroupVariants,
  createButtonGroupContext,
  type ButtonGroupProps,
  type ButtonGroupSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  orientation: 'horizontal',
  size: 'md',
})
defineSlots<ButtonGroupSlots>()

const buttonGroupContext = computed(() => createButtonGroupContext(props))

const attrs = useAttrs()
const rootProps = computed(() => {
  return {
    ...attrs,
    role: 'group',
    class: cn(
      buttonGroupVariants({ orientation: props.orientation, size: props.size }),
      attrs.class,
    ),
    style: attrs.style,
  }
})
</script>

<template>
  <div v-bind="rootProps" data-test-button-group-root>
    <slot v-bind="buttonGroupContext" />
  </div>
</template>
