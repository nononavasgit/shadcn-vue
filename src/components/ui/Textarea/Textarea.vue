<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Textarea as TextareaBase } from '@/components/primitives/Textarea'
import { cn } from '@/lib/utils'
import type { TextareaEmits, TextareaProps, TextareaValue } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<TextareaProps>()
defineEmits<TextareaEmits>()

const attrs = useAttrs()
const modelValue = defineModel<TextareaValue>()
const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    defaultValue: props.defaultValue,
    class: cn('focus-visible:border-primary focus-visible:ring-primary/50', attrs.class),
  },
}))
</script>

<template>
  <TextareaBase v-model="modelValue" v-bind="calculatedUI.root" />
</template>
