<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Switch as SwitchBase } from '@/components/ui/Switch'
import { cn } from '@/lib/utils'
import type { SwitchEmits, SwitchProps, SwitchSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<SwitchSlots>()

const props = withDefaults(defineProps<SwitchProps>(), {
  valorVerdadero: true,
  valorFalso: false,
})

defineEmits<SwitchEmits>()

const attrs = useAttrs()
const valorModelo = defineModel<boolean | null>()

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    defaultValue: props.valorPredeterminado,
    trueValue: props.valorVerdadero,
    falseValue: props.valorFalso,
    required: props.required,
    class: cn('focus-visible:border-primary focus-visible:ring-primary/50', attrs.class),
  },
}))
</script>

<template>
  <SwitchBase v-model="valorModelo" v-bind="uiCalculado.raiz">
    <template v-if="$slots.indicador" #thumb="slotProps">
      <slot name="indicador" :activado="slotProps.checked" :valor="slotProps.modelValue" />
    </template>
  </SwitchBase>
</template>
