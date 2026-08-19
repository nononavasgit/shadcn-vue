<script setup lang="ts">
import { computed, useAttrs, useSlots, watch } from 'vue'
import { InputGroupAddon } from '@/components/internal/InputGroup'
import { cn } from '@/lib/utils'
import type { InputProps, InputSlots, InputValue } from '.'

defineOptions({ inheritAttrs: false })

defineProps<InputProps>()
defineSlots<InputSlots>()
const value = defineModel<InputValue>('value', { default: '' })

watch(
  value,
  () => {
    if (typeof value.value !== 'string') value.value = ''
  },
  {
    immediate: true,
  },
)

const attrs = useAttrs()
const slots = useSlots()

const rootProps = computed(() => {
  return {
    class: cn(
      'relative flex h-9 w-full min-w-0 items-center overflow-hidden rounded-md border border-input bg-transparent text-base shadow-xs transition-[color,box-shadow] focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/50 has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]]:ring-3 has-[[aria-invalid=true]]:ring-destructive/20 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 md:text-sm dark:bg-input/30 dark:has-[[aria-invalid=true]]:ring-destructive/40',
      attrs.class,
    ),
    style: attrs.style,
  }
})

const inputProps = computed(() => {
  return {
    ...attrs,
    class: cn(
      'flex h-full w-full min-w-0 flex-1 border-0 bg-transparent px-3 py-1 outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed md:text-sm',
      attrs.class,
    ),
    style: [attrs.style],
  }
})
</script>

<template>
  <div v-bind="rootProps" data-test-input-group-root>
    <InputGroupAddon v-if="slots.leading">
      <slot name="leading" />
    </InputGroupAddon>

    <input v-model="value" v-bind="inputProps" data-test-input-root />

    <InputGroupAddon v-if="slots.trailing" align="inline-end">
      <slot name="trailing" />
    </InputGroupAddon>
  </div>
</template>
