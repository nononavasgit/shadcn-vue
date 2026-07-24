<script setup lang="ts">
import { useAttrs } from 'vue'
import { Input as InputBase } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import type { InputEmits, InputProps } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<InputProps>()
defineEmits<InputEmits>()

const attrs = useAttrs()
const modelValue = defineModel<string | number>()
</script>

<template>
  <InputBase
    v-bind="attrs"
    v-model="modelValue"
    :class="cn('focus-visible:border-primary focus-visible:ring-primary/50', attrs.class)"
    :default-value="props.defaultValue"
  />
</template>
