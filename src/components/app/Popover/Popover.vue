<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Popover as PopoverBase, PopoverContent, PopoverTrigger } from '@/components/ui/Popover'
import {
  ADHERENCIAS,
  ALINEACIONES,
  ESTRATEGIAS_ACTUALIZACION_POSICION,
  ESTRATEGIAS_POSICION,
  LADOS,
  mapearRellenoColision,
} from '.'
import type { PopoverEmits, PopoverProps, PopoverSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<PopoverSlots>()

const props = withDefaults(defineProps<PopoverProps>(), {
  lado: 'abajo',
  desplazamientoLado: 4,
  alineacion: 'centro',
  evitarColisiones: true,
})
defineEmits<PopoverEmits>()

const attrs = useAttrs()
const abierto = defineModel<boolean>('abierto')

const uiCalculado = computed(() => {
  const { montajeForzado: montajeForzadoContenido, ...contenidoUI } = props.ui?.contenido ?? {}

  return {
    raiz: {
      ...attrs,
      defaultOpen: props.abiertoPredeterminado,
      modal: props.modal,
    },
    activador: {
      ...props.ui?.activador,
      asChild: props.ui?.activador?.asChild ?? true,
    },
    contenido: {
      ...contenidoUI,
      align: ALINEACIONES[props.alineacion],
      alignOffset: props.desplazamientoAlineacion,
      alignFlip: props.invertirAlineacion,
      avoidCollisions: props.evitarColisiones,
      collisionPadding: mapearRellenoColision(props.rellenoColision),
      forceMount: props.montajeForzado ?? montajeForzadoContenido,
      hideWhenDetached: props.ocultarAlSeparar,
      positionStrategy: props.estrategiaPosicion
        ? ESTRATEGIAS_POSICION[props.estrategiaPosicion]
        : undefined,
      side: LADOS[props.lado],
      sideFlip: props.invertirLado,
      sideOffset: props.desplazamientoLado,
      sticky: props.adherencia ? ADHERENCIAS[props.adherencia] : undefined,
      updatePositionStrategy: props.estrategiaActualizacionPosicion
        ? ESTRATEGIAS_ACTUALIZACION_POSICION[props.estrategiaActualizacionPosicion]
        : undefined,
    },
  }
})
</script>

<template>
  <PopoverBase v-slot="slotProps" v-model:open="abierto" v-bind="uiCalculado.raiz">
    <PopoverTrigger v-bind="uiCalculado.activador">
      <slot :abierto="slotProps.open" :cerrar="slotProps.close" />
    </PopoverTrigger>

    <PopoverContent v-if="$slots.contenido" v-bind="uiCalculado.contenido">
      <slot name="contenido" :abierto="slotProps.open" :cerrar="slotProps.close" />
    </PopoverContent>
  </PopoverBase>
</template>
