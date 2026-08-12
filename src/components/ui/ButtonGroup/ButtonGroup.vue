<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Primitive } from 'reka-ui'
import { useUi } from '@/composables/useUi'
import { cn } from '@/lib/utils'
import {
  buttonGroupVariants,
  createButtonGroupContext,
  type ButtonGroupProps,
  type ButtonGroupSlots,
} from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonGroupProps>(), {
  as: 'div',
  orientation: 'horizontal',
  size: 'md',
  ui: undefined,
})
defineSlots<ButtonGroupSlots>()

const buttonGroupContext = computed(() => createButtonGroupContext(props))

const attrs = useAttrs()
const rootProps = computed(() => {
  const rootUI = useUi(props.ui?.root, buttonGroupContext.value)

  return {
    ...attrs,
    ...rootUI,
    as: props.as,
    role: 'group',
    'data-orientation': props.orientation,
    'data-size': props.size,
    class: cn(
      buttonGroupVariants({ orientation: props.orientation, size: props.size }),
      attrs.class,
      rootUI.class,
    ),
    style: [attrs.style, rootUI.style],
  }
})
</script>

<template>
  <Primitive v-bind="rootProps" data-button-group-ui="root" data-button-group-slot="default">
    <slot v-bind="buttonGroupContext" />
  </Primitive>
</template>
