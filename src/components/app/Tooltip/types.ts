import type { HTMLAttributes } from 'vue'
import type { TooltipVariantes } from './variantes'

type TooltipPosicion = 'arriba' | 'derecha' | 'abajo' | 'izquierda'
type TooltipAlineacion = 'inicio' | 'centro' | 'fin'

interface TooltipUI {
  activador?: HTMLAttributes
  contenido?: HTMLAttributes
}

export interface TooltipBaseProps {
  texto?: string
  variante?: TooltipVariantes['variante']
  retraso?: number
  deshabilitado?: boolean
  posicion?: TooltipPosicion
  alineacion?: TooltipAlineacion
  distancia?: number
  anchoMaximo?: number | string
  ui?: TooltipUI
}

export type TooltipProps = TooltipBaseProps & HTMLAttributes
