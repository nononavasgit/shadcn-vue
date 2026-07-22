<template>
  <Switch v-bind="uiCalculado.root" v-model="activo" :value="valor?.toString()" @update:model-value="handleCambio">
    <template v-if="slots.pulgar" #thumb="{ checked }">
      <span class="flex size-full items-center justify-center text-[9px] leading-none font-bold">
        <slot name="pulgar" :activo="checked"></slot>
      </span>
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
  pulgar?(props: { activo: boolean }): unknown
}>()

const valor = defineModel<ValorSwitch>({ default: 0 })
const attrs = useAttrs()
const emit = defineEmits<{
  cambio: [evt: boolean]
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

const handleCambio = (evt: boolean) => {
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
