<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { useResolve } from '@/composables/useResolve'
import { cn } from '@/lib/utils'
import type { InputContext, InputEmits, InputProps, InputValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputProps>(), {
  defaultValue: undefined,
  ui: undefined,
})
defineEmits<InputEmits>()

const inputContext = computed<InputContext>(() => {
  const { ui, ...inputProps } = props
  void ui

  return {
    props: inputProps,
  }
})

const attrs = useAttrs()
const modelValue = defineModel<InputValue>()
const value = computed({
  get: () => modelValue.value ?? props.defaultValue,
  set: (nextValue: InputValue) => {
    modelValue.value = nextValue
  },
})
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(useResolve(props.ui?.root, inputContext.value))

  return {
    root: {
      ...attrs,
      ...rootUI,
      class: cn(
        'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
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
  <input v-model="value" v-bind="calculatedUI.root" data-slot="input" />
</template>
