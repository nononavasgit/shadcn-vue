<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Switch as SwitchBase } from '@/components/ui/Switch'
import { cn } from '@/lib/utils'
import type { SwitchEmits, SwitchProps, SwitchSlots, SwitchValue } from '.'

defineOptions({ inheritAttrs: false })

const props = defineProps<SwitchProps>()
defineEmits<SwitchEmits>()
defineSlots<SwitchSlots>()

const attrs = useAttrs()
const modelValue = defineModel<SwitchValue>()
const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    defaultValue: props.defaultValue,
    disabled: props.disabled,
    id: props.id,
    name: props.name,
    value: props.value,
    required: props.required,
    class: cn('focus-visible:border-primary focus-visible:ring-primary/50', attrs.class),
  },
}))
</script>

<template>
  <SwitchBase v-model="modelValue" v-bind="calculatedUI.root">
    <template v-if="$slots.thumb" #thumb="slotProps">
      <slot name="thumb" :checked="slotProps.checked" :value="slotProps.modelValue" />
    </template>
  </SwitchBase>
</template>
