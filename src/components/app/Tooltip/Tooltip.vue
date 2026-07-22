<template>
  <TooltipProvider :delay-duration="retraso">
    <Tooltip :open="deshabilitado ? false : visible" :disabled="deshabilitado" @update:open="handleOpen">
      <TooltipTrigger v-bind="uiCalculado?.activador">
        <slot></slot>
      </TooltipTrigger>

      <TooltipContent v-if="texto || slots.contenido" v-bind="uiCalculado?.contenido">
        <slot v-if="slots.contenido" name="contenido"></slot>
        <template v-else>{{ texto }}</template>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import type { TooltipBaseProps } from './types'
import { tooltipVariantes } from './variantes'

defineOptions({
  inheritAttrs: false,
})

const slots = defineSlots<{
  default?(): unknown
  contenido?(): unknown
}>()

const emit = defineEmits<{
  abierto: [valor: boolean]
}>()

const visible = defineModel<boolean>('visible', { default: false })

const attrs = useAttrs()

function handleOpen(valor: boolean) {
  if (props.deshabilitado) {
    visible.value = false
    return
  }

  visible.value = valor
  emit('abierto', valor)
}

const POSICIONES = {
  arriba: 'top',
  derecha: 'right',
  abajo: 'bottom',
  izquierda: 'left',
} as const

const ALINEACIONES = {
  inicio: 'start',
  centro: 'center',
  fin: 'end',
} as const

const props = withDefaults(defineProps<TooltipBaseProps>(), {
  texto: '',
  variante: 'solido',
  retraso: 700,
  posicion: 'arriba',
  alineacion: 'centro',
  distancia: 4,
  anchoMaximo: 320,
  ui: undefined,
  deshabilitado: false,
})

const uiCalculado = computed(() => {
  return {
    activador: {
      ...props.ui?.activador,
      asChild: true,
      class: cn(
        attrs.class,
        props.ui?.activador?.class,
      ),
      'data-slot': 'activador',
    },
    contenido: {
      ...props.ui?.contenido,
      side: POSICIONES[props.posicion],
      align: ALINEACIONES[props.alineacion],
      sideOffset: props.distancia,
      style: [
        {
          '--tooltip-ancho-maximo':
            typeof props.anchoMaximo === 'number' ? `${props.anchoMaximo}px` : props.anchoMaximo,
        },
        props.ui?.contenido?.style,
      ],
      class: cn(tooltipVariantes({ variante: props.variante }), props.ui?.contenido?.class),
      'data-slot': 'contenido',
    },
  }
})
</script>
