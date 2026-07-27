<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import {
  Tooltip as TooltipBase,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip'
import { cn } from '@/lib/utils'
import {
  mapearRellenoColision,
  ADHERENCIAS,
  ALINEACIONES,
  ESTRATEGIAS_ACTUALIZACION_POSICION,
  ESTRATEGIAS_POSICION,
  LADOS,
} from '.'
import type { TooltipEmits, TooltipProps, TooltipSlots } from '.'

defineOptions({ inheritAttrs: false })

defineSlots<TooltipSlots>()

const props = withDefaults(defineProps<TooltipProps>(), {
  retrasoApertura: 0,
  lado: 'arriba',
  desplazamientoLado: 2,
  alineacion: 'centro',
})
defineEmits<TooltipEmits>()

const attrs = useAttrs()
const abierto = defineModel<boolean>('abierto')

const uiCalculado = computed(() => {
  const { montajeForzado: montajeForzadoContenido, ...contenidoUI } = props.ui?.contenido ?? {}
  const flechaUI = props.ui?.flecha ?? {}

  return {
    proveedor: {
      delayDuration: props.retrasoApertura,
      disableClosingTrigger: props.deshabilitarCierreActivador,
      disableHoverableContent: props.deshabilitarContenidoInteractivo,
      disabled: props.deshabilitado,
      ignoreNonKeyboardFocus: props.ignorarFocoNoTeclado,
      skipDelayDuration: props.retrasoEntreTooltips,
    },
    raiz: {
      ...attrs,
      defaultOpen: props.abiertoPredeterminado,
      disableClosingTrigger: props.deshabilitarCierreActivador,
      disableHoverableContent: props.deshabilitarContenidoInteractivo,
      disabled: props.deshabilitado,
      ignoreNonKeyboardFocus: props.ignorarFocoNoTeclado,
    },
    activador: {
      ...props.ui?.activador,
      asChild: props.ui?.activador?.asChild ?? true,
    },
    contenido: {
      ...contenidoUI,
      align: ALINEACIONES[props.alineacion],
      alignOffset: props.desplazamientoAlineacion,
      arrowPadding: props.rellenoFlecha,
      avoidCollisions: props.evitarColisiones,
      class: cn('border border-zinc-200 bg-white text-zinc-950 shadow-md', contenidoUI.class),
      collisionPadding: mapearRellenoColision(props.rellenoColision),
      forceMount: props.montajeForzado ?? montajeForzadoContenido,
      hideWhenDetached: props.ocultarAlSeparar,
      positionStrategy: props.estrategiaPosicion
        ? ESTRATEGIAS_POSICION[props.estrategiaPosicion]
        : undefined,
      side: LADOS[props.lado],
      sideOffset: props.desplazamientoLado,
      sticky: props.adherencia ? ADHERENCIAS[props.adherencia] : undefined,
      updatePositionStrategy: props.estrategiaActualizacionPosicion
        ? ESTRATEGIAS_ACTUALIZACION_POSICION[props.estrategiaActualizacionPosicion]
        : undefined,
    },
    flecha: {
      ...flechaUI,
      width: props.anchoFlecha,
      height: props.altoFlecha,
      class: cn('', flechaUI.class),
    },
  }
})
</script>

<template>
  <TooltipProvider v-bind="uiCalculado.proveedor">
    <TooltipBase v-slot="slotProps" v-model:open="abierto" v-bind="uiCalculado.raiz">
      <TooltipTrigger v-bind="uiCalculado.activador">
        <slot :abierto="slotProps.open" />
      </TooltipTrigger>

      <TooltipContent v-bind="uiCalculado.contenido">
        <slot name="contenido" :abierto="slotProps.open">{{ props.contenido }}</slot>

        <TooltipArrow v-bind="uiCalculado.flecha" />
      </TooltipContent>
    </TooltipBase>
  </TooltipProvider>
</template>
