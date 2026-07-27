<script setup lang="ts">
import { useAttrs } from 'vue'
import { Checkbox as CheckboxBase } from '@/components/ui/Checkbox'
import { cn } from '@/lib/utils'
import type { CheckboxEmits, CheckboxProps, CheckboxSlots, ValorCheckbox } from '.'

defineOptions({ inheritAttrs: false })
defineSlots<CheckboxSlots>()
defineEmits<CheckboxEmits>()

const props = withDefaults(defineProps<CheckboxProps>(), {
  valorVerdadero: true,
  valorFalso: false,
})

const attrs = useAttrs()
const valorModelo = defineModel<ValorCheckbox | 'indeterminate' | null>()
</script>

<template>
  <CheckboxBase
    v-model="valorModelo"
    v-bind="attrs"
    :as="props.as"
    :as-child="props.asChild"
    :class="cn('focus-visible:border-primary focus-visible:ring-primary/50', attrs.class)"
    :default-value="props.valorPredeterminado"
    :false-value="props.valorFalso"
    :true-value="props.valorVerdadero"
  >
    <template v-if="$slots.indicador" #default="slotProps">
      <slot name="indicador" :estado="slotProps.state" :valor="slotProps.modelValue" />
    </template>
  </CheckboxBase>
</template>
