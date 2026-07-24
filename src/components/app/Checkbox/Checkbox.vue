<script setup lang="ts">
import { useAttrs } from 'vue'
import { Checkbox as CheckboxBase } from '@/components/ui/Checkbox'
import { cn } from '@/lib/utils'
import type { CheckboxEmits, CheckboxProps, CheckboxSlotProps, CheckboxValue } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  indicator?(props: CheckboxSlotProps): unknown
}>()

const props = withDefaults(defineProps<CheckboxProps>(), {
  trueValue: true,
  falseValue: false,
})
defineEmits<CheckboxEmits>()

const attrs = useAttrs()
const modelValue = defineModel<CheckboxValue | 'indeterminate' | null>()
</script>

<template>
  <CheckboxBase
    v-model="modelValue"
    v-bind="attrs"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('focus-visible:border-primary focus-visible:ring-primary/50', attrs.class)"
    :default-value="props.defaultValue"
    :false-value="props.falseValue"
    :true-value="props.trueValue"
  >
    <template v-if="$slots.indicator" #default="slotProps">
      <slot name="indicator" v-bind="slotProps" />
    </template>
  </CheckboxBase>
</template>
