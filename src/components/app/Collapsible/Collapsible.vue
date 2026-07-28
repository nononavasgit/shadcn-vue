<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/Collapsible'
import type { CollapsibleEmits, CollapsibleProps, CollapsibleSlotProps } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<{
  default?(props: CollapsibleSlotProps): unknown
  contenido?(props: CollapsibleSlotProps): unknown
}>()

const props = withDefaults(defineProps<CollapsibleProps>(), {
  desmontarAlOcultar: false,
})
defineEmits<CollapsibleEmits>()

const attrs = useAttrs()
const abierto = defineModel<boolean>('abierto')

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    as: props.as,
    asChild: props.asChild,
    disabled: props.deshabilitado,
    unmountOnHide: props.desmontarAlOcultar,
  },
  activador: {
    ...props.ui?.activador,
    asChild: props.ui?.activador?.asChild ?? true,
  },
  contenido: {
    ...props.ui?.contenido,
    forceMount: props.forzarMontaje,
  },
}))
</script>

<template>
  <Collapsible v-slot="slotProps" v-bind="uiCalculado.raiz" v-model:open="abierto">
    <CollapsibleTrigger v-bind="uiCalculado.activador">
      <slot :abierto="slotProps.open" />
    </CollapsibleTrigger>

    <CollapsibleContent v-if="$slots.contenido" v-bind="uiCalculado.contenido">
      <slot name="contenido" :abierto="slotProps.open" />
    </CollapsibleContent>
  </Collapsible>
</template>
