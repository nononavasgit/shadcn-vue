import type { Component, HTMLAttributes } from 'vue'

export { default as Popover } from './Popover.vue'

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

export type PopoverSide = keyof typeof LADOS
export type PopoverAlign = keyof typeof ALINEACIONES
export type PopoverSticky = keyof typeof ADHERENCIAS
export type PopoverPositionStrategy = keyof typeof ESTRATEGIAS_POSICION
export type PopoverUpdatePositionStrategy = keyof typeof ESTRATEGIAS_ACTUALIZACION_POSICION

export type PopoverNodeUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type PopoverContentUI = PopoverNodeUI & {
  montajeForzado?: boolean
}

export interface PopoverUI {
  activador?: PopoverNodeUI
  contenido?: PopoverContentUI
}

export interface PopoverProps {
  abierto?: boolean
  abiertoPredeterminado?: boolean
  modal?: boolean
  lado?: PopoverSide
  desplazamientoLado?: number
  invertirLado?: boolean
  alineacion?: PopoverAlign
  desplazamientoAlineacion?: number
  invertirAlineacion?: boolean
  evitarColisiones?: boolean
  rellenoColision?: number | Partial<Record<PopoverSide, number>>
  adherencia?: PopoverSticky
  ocultarAlSeparar?: boolean
  estrategiaPosicion?: PopoverPositionStrategy
  estrategiaActualizacionPosicion?: PopoverUpdatePositionStrategy
  montajeForzado?: boolean
  ui?: PopoverUI
}

export interface PopoverEmits {
  'update:abierto': [valor: boolean]
}

export interface PopoverSlotProps {
  abierto: boolean
  cerrar: () => void
}

export interface PopoverSlots {
  default?(props: PopoverSlotProps): unknown
  contenido?(props: PopoverSlotProps): unknown
}

export function mapearRellenoColision(
  relleno: number | Partial<Record<PopoverSide, number>> | undefined,
) {
  if (relleno === undefined || typeof relleno === 'number') return relleno

  return Object.fromEntries(
    Object.entries(relleno).map(([lado, valor]) => [LADOS[lado as PopoverSide], valor]),
  ) as Partial<Record<(typeof LADOS)[PopoverSide], number>>
}
