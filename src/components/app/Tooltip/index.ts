import type { Component, HTMLAttributes } from 'vue'

export { default as Tooltip } from './Tooltip.vue'

export const LADOS = {
  arriba: 'top',
  derecha: 'right',
  abajo: 'bottom',
  izquierda: 'left',
} as const

export const ALINEACIONES = {
  inicio: 'start',
  centro: 'center',
  final: 'end',
} as const

export const ADHERENCIAS = {
  parcial: 'partial',
  siempre: 'always',
} as const

export const ESTRATEGIAS_POSICION = {
  absoluta: 'absolute',
  fija: 'fixed',
} as const

export const ESTRATEGIAS_ACTUALIZACION_POSICION = {
  optimizada: 'optimized',
  siempre: 'always',
} as const

export type TooltipSide = keyof typeof LADOS
export type TooltipAlign = keyof typeof ALINEACIONES
export type TooltipSticky = keyof typeof ADHERENCIAS
export type TooltipPositionStrategy = keyof typeof ESTRATEGIAS_POSICION
export type TooltipUpdatePositionStrategy = keyof typeof ESTRATEGIAS_ACTUALIZACION_POSICION

export type TooltipNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type TooltipContentUI = TooltipNodeUI & {
  montajeForzado?: boolean
}

export type TooltipArrowUI = TooltipNodeUI

export interface TooltipUI {
  activador?: TooltipNodeUI
  contenido?: TooltipContentUI
  flecha?: TooltipArrowUI
}

export interface TooltipProps {
  abierto?: boolean
  abiertoPredeterminado?: boolean
  contenido?: string
  retrasoApertura?: number
  retrasoEntreTooltips?: number
  deshabilitarContenidoInteractivo?: boolean
  deshabilitarCierreActivador?: boolean
  deshabilitado?: boolean
  ignorarFocoNoTeclado?: boolean
  lado?: TooltipSide
  desplazamientoLado?: number
  alineacion?: TooltipAlign
  desplazamientoAlineacion?: number
  evitarColisiones?: boolean
  rellenoColision?: number | Partial<Record<TooltipSide, number>>
  rellenoFlecha?: number
  anchoFlecha?: number
  altoFlecha?: number
  adherencia?: TooltipSticky
  ocultarAlSeparar?: boolean
  estrategiaPosicion?: TooltipPositionStrategy
  estrategiaActualizacionPosicion?: TooltipUpdatePositionStrategy
  montajeForzado?: boolean
  ui?: TooltipUI
}

export interface TooltipEmits {
  'update:abierto': [valor: boolean]
}

export interface TooltipSlotProps {
  abierto: boolean
}

export interface TooltipSlots {
  default?(props: TooltipSlotProps): unknown
  contenido?(props: TooltipSlotProps): unknown
}

export function mapearRellenoColision(
  relleno: number | Partial<Record<TooltipSide, number>> | undefined,
) {
  if (relleno === undefined || typeof relleno === 'number') return relleno

  return Object.fromEntries(
    Object.entries(relleno).map(([lado, valor]) => [LADOS[lado as TooltipSide], valor]),
  ) as Partial<Record<(typeof LADOS)[TooltipSide], number>>
}
