<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'
import type { TimePickerProps, TimePickerValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TimePickerProps>(), {
  showClock: true,
  ui: undefined,
})
const emit = defineEmits<{ valueChange: [value: TimePickerValue] }>()

const attrs = useAttrs()
const value = defineModel<TimePickerValue>('value', { default: '' })

const inputProps = computed(() => {
  const { showClock, ...inputProps } = props

  return {
    ...attrs,
    ...inputProps,
    class: cn(
      attrs.class,
      !showClock &&
        'appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none',
    ),
  }
})
</script>

<template>
  <Input
    v-bind="inputProps"
    v-model:value="value"
    type="time"
    @value-change="emit('valueChange', $event)"
  />
</template>
