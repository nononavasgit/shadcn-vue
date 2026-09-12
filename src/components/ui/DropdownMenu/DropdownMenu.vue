<script setup lang="ts">
import { computed } from 'vue'
import { DropdownMenuRoot, DropdownMenuTrigger } from 'reka-ui'
import { cn } from '@/lib/utils'
import type { DropdownMenuEmits, DropdownMenuProps, DropdownMenuSlots } from '.'
import { dropdownMenuDefaults } from './default'

defineOptions({ inheritAttrs: false })
defineSlots<DropdownMenuSlots>()

const props = withDefaults(defineProps<DropdownMenuProps>(), dropdownMenuDefaults)
const emit = defineEmits<DropdownMenuEmits>()
const open = defineModel<boolean>('open', { default: false })

const rootProps = computed(() => ({ modal: props.modal }))
const triggerProps = computed(() => ({
  disabled: props.disabled,
  class: cn(
    '',
  ),
}))
</script>

<template>
  <DropdownMenuRoot v-bind="rootProps" v-model:open="open" data-test-dropdown-menu-root>
    <DropdownMenuTrigger
      v-bind="triggerProps"
      as-child
      data-test-dropdown-menu-trigger
    >
      <slot></slot>
    </DropdownMenuTrigger>
  </DropdownMenuRoot>
</template>
