<template>
  <Switch v-bind="uiCalculado.root" v-model="activo" :value="valor?.toString()" @update:model-value="handleCambio">
    <template v-if="true || slots.pulgar">
      <slot name="pulgar"></slot>
    </template>
  </Switch>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import type { SwitchBaseProps, ValorSwitch } from './types'

defineOptions({
  inheritAttrs: false,
})

const slots = defineSlots<{
  pulgar?: unknown
}>()

const valor = defineModel<ValorSwitch>({ default: 0 })
const attrs = useAttrs()
const emit = defineEmits<{
  cambio: [valor: ValorSwitch]
}>()
const props = withDefaults(defineProps<SwitchBaseProps>(), {
  valorVerdadero: 1,
  valorFalso: 0,
  ui: undefined,
})

const activo = computed({
  get: () => valor.value === props.valorVerdadero,
  set: (estado: boolean) => {
    valor.value = estado ? props.valorVerdadero : props.valorFalso
  },
})

const handleCambio = (evt: ValorSwitch) => {
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
