<script setup lang="ts">
import { useAttrs } from 'vue'
import { Textarea as TextareaBase } from '@/components/ui/Textarea'
import { cn } from '@/lib/utils'
import type { TextareaEmits, TextareaProps } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<TextareaProps>()
defineEmits<TextareaEmits>()

const attrs = useAttrs()
const modelValue = defineModel<string | number>()
</script>

<template>
  <TextareaBase
    v-bind="attrs"
    v-model="modelValue"
    :class="cn('focus-visible:border-primary focus-visible:ring-primary/50', attrs.class)"
    :default-value="props.defaultValue"
  />
</template>
