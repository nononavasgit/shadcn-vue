import type { Component, HTMLAttributes } from 'vue'

export { default as HoverCard } from './HoverCard.vue'

export type HoverCardLado = 'arriba' | 'derecha' | 'abajo' | 'izquierda'
export type HoverCardAlineacion = 'inicio' | 'centro' | 'final'
export type HoverCardAdherencia = 'parcial' | 'siempre'
export type HoverCardEstrategiaPosicion = 'absoluta' | 'fija'
export type HoverCardEstrategiaActualizacionPosicion = 'optimizada' | 'siempre'

export type HoverCardNodoUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type HoverCardContenidoUI = HoverCardNodoUI & {
  forceMount?: boolean
}

export interface HoverCardUI {
  activador?: HoverCardNodoUI
  contenido?: HoverCardContenidoUI
}

export interface HoverCardProps {
  abierto?: boolean
  abiertoPredeterminado?: boolean
  contenido?: string
  retrasoApertura?: number
  retrasoCierre?: number
  habilitarTactil?: boolean
  lado?: HoverCardLado
  desplazamientoLado?: number
  alineacion?: HoverCardAlineacion
  desplazamientoAlineacion?: number
  evitarColisiones?: boolean
  rellenoColision?: number | Partial<Record<HoverCardLado, number>>
  rellenoFlecha?: number
  adherencia?: HoverCardAdherencia
  ocultarAlSeparar?: boolean
  estrategiaPosicion?: HoverCardEstrategiaPosicion
  estrategiaActualizacionPosicion?: HoverCardEstrategiaActualizacionPosicion
  montajeForzado?: boolean
  ui?: HoverCardUI
}

export interface HoverCardEmits {
  'update:abierto': [valor: boolean]
}

export interface HoverCardSlotProps {
  abierto: boolean
}

export interface HoverCardSlots {
  default?(props: HoverCardSlotProps): unknown
  contenido?(props: HoverCardSlotProps): unknown
}
