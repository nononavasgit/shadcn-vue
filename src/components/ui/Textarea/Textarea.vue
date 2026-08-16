<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue'
import { cn } from '@/lib/utils'
import type { TextareaProps, TextareaValue } from '.'

defineOptions({ inheritAttrs: false })

defineProps<TextareaProps>()
const emit = defineEmits<{ valueChange: [value: TextareaValue] }>()
const value = defineModel<TextareaValue>('value', { default: '' })

watch(value, (nextValue, previousValue) => {
  if (nextValue !== previousValue) emit('valueChange', nextValue)
})

const attrs = useAttrs()
const rootProps = computed(() => {
  return {
    ...attrs,
    class: cn(
      'flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
      'focus-visible:border-primary focus-visible:ring-primary/50',
      attrs.class,
    ),
    style: [attrs.style],
  }
})
</script>

<template>
  <textarea v-model="value" v-bind="rootProps" data-test-textarea-root />
</template>
