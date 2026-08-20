<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import { buttonGroupVariants, type ButtonGroupProps, type ButtonGroupSlots } from '.'
import { buttonGroupDefaults } from './default'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<ButtonGroupProps>(), buttonGroupDefaults)
defineSlots<ButtonGroupSlots>()

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
    <slot />
  </div>
</template>
