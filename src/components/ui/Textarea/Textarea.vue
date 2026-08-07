<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { TextareaContext, TextareaEmits, TextareaProps, TextareaValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextareaProps>(), {
  defaultValue: undefined,
  ui: undefined,
})
defineEmits<TextareaEmits>()

const textareaContext = computed<TextareaContext>(() => {
  const { ui, ...textareaProps } = props
  void ui

  return {
    props: textareaProps,
  }
})

const attrs = useAttrs()
const modelValue = defineModel<TextareaValue>()
const value = computed({
  get: () => modelValue.value ?? props.defaultValue,
  set: (nextValue: TextareaValue) => {
    modelValue.value = nextValue
  },
})
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, textareaContext.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(
        'flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
        'focus-visible:border-primary focus-visible:ring-primary/50',
        attrs.class,
        rootUI.class,
      ),
      style: [attrs.style, rootUI.style],
    },
  }
})
</script>

<template>
  <textarea v-model="value" v-bind="calculatedUI.root" data-slot="textarea" />
</template>
