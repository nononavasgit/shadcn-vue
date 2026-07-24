<script setup lang="ts">
import { useAttrs } from 'vue'
import { Switch as SwitchBase } from '@/components/ui/Switch'
import { cn } from '@/lib/utils'
import type { SwitchEmits, SwitchProps } from '.'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SwitchProps>(), {
  trueValue: true,
  falseValue: false,
})

defineEmits<SwitchEmits>()

const attrs = useAttrs()
const modelValue = defineModel<boolean | null>()
</script>

<template>
  <SwitchBase
    v-bind="attrs"
    v-model="modelValue"
    :as="props.as"
    :class="cn('focus-visible:border-primary focus-visible:ring-primary/50', attrs.class)"
    :as-child="props.asChild"
    :default-value="props.defaultValue"
    :value="props.value"
    :true-value="props.trueValue"
    :false-value="props.falseValue"
    :required="props.required"
  >
    <template #thumb="slotProps">
      <slot name="thumb" v-bind="slotProps" />
    </template>
  </SwitchBase>
</template>
