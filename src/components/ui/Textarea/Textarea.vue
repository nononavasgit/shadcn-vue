<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Textarea as TextareaBase } from '@/components/primitives/Textarea'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { TextareaEmits, TextareaProps, TextareaValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TextareaProps>(), {
  defaultValue: undefined,
  ui: undefined,
})
defineEmits<TextareaEmits>()

const attrs = useAttrs()
const modelValue = defineModel<TextareaValue>()
const calculatedUI = computed(() => {
  const rootUI = normalizeHTMLAttributes(props.ui?.root)

  return {
    root: {
      ...attrs,
      ...rootUI,
      defaultValue: props.defaultValue,
      class: cn(
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
  <TextareaBase v-model="modelValue" v-bind="calculatedUI.root" />
</template>
