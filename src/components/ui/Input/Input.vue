<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Input as InputBase } from '@/components/primitives/Input'
import { normalizeHTMLAttributes } from '@/composables/useNormalize'
import { cn } from '@/lib/utils'
import type { InputEmits, InputProps, InputValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<InputProps>(), {
  defaultValue: undefined,
  ui: undefined,
})
defineEmits<InputEmits>()

const attrs = useAttrs()
const modelValue = defineModel<InputValue>()
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
  <InputBase v-model="modelValue" v-bind="calculatedUI.root" />
</template>
