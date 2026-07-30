<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { cn } from '@/lib/utils'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
}>()
const emits = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const attrs = useAttrs()
const internalValue = ref<string | number | undefined>(props.defaultValue)
const inputAttrs = computed(() => {
  const restAttrs = { ...attrs }
  delete restAttrs.class
  return restAttrs
})
const value = computed({
  get: () => props.modelValue ?? internalValue.value,
  set: (nextValue: string | number) => {
    internalValue.value = nextValue
    emits('update:modelValue', nextValue)
  },
})
</script>

<template>
  <input
    v-bind="inputAttrs"
    v-model="value"
    data-slot="input"
    :class="
      cn(
        'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40',
        attrs.class,
      )
    "
  />
</template>
