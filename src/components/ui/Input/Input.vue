<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Input as InputBase } from '@/components/primitives/Input'
import { cn } from '@/lib/utils'
import type { InputEmits, InputProps, InputValue } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<InputProps>()
defineEmits<InputEmits>()

const attrs = useAttrs()
const modelValue = defineModel<InputValue>()
const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    defaultValue: props.defaultValue,
    class: cn('focus-visible:border-primary focus-visible:ring-primary/50', attrs.class),
  },
}))
</script>

<template>
  <InputBase v-model="modelValue" v-bind="calculatedUI.root" />
</template>
