<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import type { FormEmits, FormSlots, FormValue } from '.'

defineOptions({ inheritAttrs: false })

const emit = defineEmits<FormEmits>()
defineSlots<FormSlots>()

const attrs = useAttrs()
const modelValue = defineModel<FormValue>()
const calculatedAttrs = computed(() => ({
  ...attrs,
  class: cn(attrs.class),
  style: attrs.style,
}))

function handleSubmit(event: SubmitEvent) {
  emit('submit', event)
}
</script>

<template>
  <form v-bind="calculatedAttrs" data-slot="form" @submit.prevent="handleSubmit">
    <slot :model-value="modelValue" />
  </form>
</template>
