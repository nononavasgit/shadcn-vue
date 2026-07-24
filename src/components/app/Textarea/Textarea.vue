<script setup lang="ts">
import { useAttrs } from 'vue'
import { Textarea as TextareaBase } from '@/components/ui/Textarea'
import type { TextareaEmits, TextareaProps } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<TextareaProps>()
defineEmits<TextareaEmits>()

const attrs = useAttrs()
const modelValue = defineModel<string | number>()
</script>

<template>
  <TextareaBase v-bind="attrs" v-model="modelValue" :default-value="props.defaultValue" />
</template>
