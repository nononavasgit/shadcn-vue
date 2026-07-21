import type { HTMLAttributes } from 'vue'

interface TarjetaUI {
  root?: HTMLAttributes
  cabecera?: HTMLAttributes
  titulo?: HTMLAttributes
  descripcion?: HTMLAttributes
  contenido?: HTMLAttributes
  pie?: HTMLAttributes
}

export interface TarjetaBaseProps {
  titulo?: string
  descripcion?: string
  ui?: TarjetaUI
}

export type TarjetaProps = TarjetaBaseProps & HTMLAttributes
