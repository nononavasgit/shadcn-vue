import type { HTMLAttributes } from 'vue'

export { default as Card } from './Card.vue'

export interface TarjetaUI {
  raiz?: HTMLAttributes
  cabecera?: HTMLAttributes
  titulo?: HTMLAttributes
  descripcion?: HTMLAttributes
  accion?: HTMLAttributes
  contenido?: HTMLAttributes
  pie?: HTMLAttributes
}

export interface TarjetaProps {
  titulo?: string
  descripcion?: string
  ui?: TarjetaUI
}

export interface TarjetaSlots {
  default?(): unknown
  cabecera?(): unknown
  titulo?(): unknown
  descripcion?(): unknown
  accion?(): unknown
  pie?(): unknown
}
