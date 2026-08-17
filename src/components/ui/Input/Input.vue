<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { cn } from '@/lib/utils'
import type { InputProps, InputValue } from '.'

defineOptions({ inheritAttrs: false })

defineProps<InputProps>()
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
const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(
      'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
      'focus-visible:border-primary focus-visible:ring-primary/50',
      attrs.class,
    ),
    style: [attrs.style],
  }
})
</script>

<template>
  <input v-model="value" v-bind="rootProps" data-test-input-root />
</template>
