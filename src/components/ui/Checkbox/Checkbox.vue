<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Checkbox as CheckboxBase } from '@/components/primitives/Checkbox'
import { cn } from '@/lib/utils'
import type { CheckboxEmits, CheckboxProps, CheckboxSlots, CheckboxValue } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxProps>(), {
  trueValue: true,
  falseValue: false,
})
defineEmits<CheckboxEmits>()
defineSlots<CheckboxSlots>()

const attrs = useAttrs()
const modelValue = defineModel<CheckboxValue | 'indeterminate' | null>()
const calculatedUI = computed(() => ({
  root: {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    defaultValue: props.defaultValue,
    falseValue: props.falseValue,
    trueValue: props.trueValue,
    class: cn('focus-visible:border-primary focus-visible:ring-primary/50', attrs.class),
  },
}))
</script>

<template>
  <CheckboxBase v-model="modelValue" v-bind="calculatedUI.root">
    <template v-if="$slots.indicator" #default="slotProps">
      <slot name="indicator" :state="slotProps.state" :value="slotProps.modelValue" />
    </template>
  </CheckboxBase>
</template>
