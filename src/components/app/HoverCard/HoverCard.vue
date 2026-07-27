<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/HoverCard'
import type {
  HoverCardAlineacion,
  HoverCardEmits,
  HoverCardLado,
  HoverCardProps,
  HoverCardSlots,
} from '.'

defineOptions({ inheritAttrs: false })

defineSlots<HoverCardSlots>()

const props = withDefaults(defineProps<HoverCardProps>(), {
  retrasoApertura: 700,
  retrasoCierre: 300,
  lado: 'abajo',
  desplazamientoLado: 4,
  alineacion: 'centro',
  evitarColisiones: true,
})
defineEmits<HoverCardEmits>()

const attrs = useAttrs()
const abierto = defineModel<boolean>('abierto')

const mapaLado = {
  arriba: 'top',
  derecha: 'right',
  abajo: 'bottom',
  izquierda: 'left',
} as const

const mapaAlineacion = {
  inicio: 'start',
  centro: 'center',
  final: 'end',
} as const

const mapaAdherencia = {
  parcial: 'partial',
  siempre: 'always',
} as const

const mapaEstrategiaPosicion = {
  absoluta: 'absolute',
  fija: 'fixed',
} as const

const mapaEstrategiaActualizacionPosicion = {
  optimizada: 'optimized',
  siempre: 'always',
} as const

function calcularRellenoColision(
  relleno: number | Partial<Record<HoverCardLado, number>> | undefined,
) {
  if (relleno === undefined || typeof relleno === 'number') return relleno

  return Object.fromEntries(
    Object.entries(relleno).map(([lado, valor]) => [mapaLado[lado as HoverCardLado], valor]),
  ) as Partial<Record<(typeof mapaLado)[HoverCardLado], number>>
}

const uiCalculado = computed(() => ({
  raiz: {
    ...attrs,
    defaultOpen: props.abiertoPredeterminado,
    openDelay: props.retrasoApertura,
    closeDelay: props.retrasoCierre,
    enableTouch: props.habilitarTactil,
  },
  activador: {
    ...props.ui?.activador,
    asChild: props.ui?.activador?.asChild ?? true,
  },
  contenido: {
    ...props.ui?.contenido,
    align: mapaAlineacion[props.alineacion as HoverCardAlineacion],
    alignOffset: props.desplazamientoAlineacion,
    arrowPadding: props.rellenoFlecha,
    avoidCollisions: props.evitarColisiones,
    collisionPadding: calcularRellenoColision(props.rellenoColision),
    forceMount: props.montajeForzado,
    hideWhenDetached: props.ocultarAlSeparar,
    positionStrategy: props.estrategiaPosicion
      ? mapaEstrategiaPosicion[props.estrategiaPosicion]
      : undefined,
    side: mapaLado[props.lado as HoverCardLado],
    sideOffset: props.desplazamientoLado,
    sticky: props.adherencia ? mapaAdherencia[props.adherencia] : undefined,
    updatePositionStrategy: props.estrategiaActualizacionPosicion
      ? mapaEstrategiaActualizacionPosicion[props.estrategiaActualizacionPosicion]
      : undefined,
  },
}))
</script>

<template>
  <HoverCard v-slot="slotProps" v-model:open="abierto" v-bind="uiCalculado.raiz">
    <HoverCardTrigger v-bind="uiCalculado.activador">
      <slot :abierto="slotProps.open" />
    </HoverCardTrigger>

    <HoverCardContent
      v-if="$slots.contenido || props.contenido !== undefined"
      v-bind="uiCalculado.contenido"
    >
      <slot name="contenido" :abierto="slotProps.open">{{ props.contenido }}</slot>
    </HoverCardContent>
  </HoverCard>
</template>
