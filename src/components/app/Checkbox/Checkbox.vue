<template>
  <Checkbox v-model="activo" v-bind="uiCalculado.root" :value="valor?.toString()" @update:model-value="handleCambio">
    <template v-if="slots.indicador" #indicator>
      <slot name="indicador"></slot>
    </template>
  </Checkbox>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import type { CheckboxBaseProps, ValorCheckbox } from './types'

defineOptions({
  inheritAttrs: false,
})

const valor = defineModel<ValorCheckbox>({ default: 0 })
const attrs = useAttrs()
const slots = defineSlots<{
  indicador?: unknown
}>()
const emit = defineEmits<{
  cambio: [evt: boolean | 'indeterminate']
}>()
const props = withDefaults(defineProps<CheckboxBaseProps>(), {
  valorVerdadero: 1,
  valorFalso: 0,
  ui: undefined,
})


const activo = computed<boolean | 'indeterminate'>({
  get: () => {
    if (valor.value === 'indeterminate') return 'indeterminate'
    return valor.value === props.valorVerdadero
  },
  set: (estado) => {
    valor.value =
      estado === 'indeterminate' ? estado : estado ? props.valorVerdadero : props.valorFalso
  },
})


function handleCambio(evt: boolean | 'indeterminate') {
  emit('cambio', evt)
}

const uiCalculado = computed(() => {
  return {
    root: {
      ...attrs,
      ...props.ui?.root,
      class: cn(attrs.class, props.ui?.root?.class),
      'data-slot': 'root',
    },
  }
})
</script>
