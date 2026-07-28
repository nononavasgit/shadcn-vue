import type { HTMLAttributes, SVGAttributes } from 'vue'

export { default as ProgressCircular } from './ProgressCircular.vue'

export interface ProgressCircularUI {
  svg?: SVGAttributes
  pista?: SVGAttributes
  indicador?: SVGAttributes
  titulo?: HTMLAttributes
}

export interface ProgressCircularProps {
  valor?: number | null
  maximo?: number
  titulo?: string
  color?: string
  colorPista?: string
  tamano?: number | string
  grosor?: number
  ui?: ProgressCircularUI
}

export interface ProgressCircularTituloSlotProps {
  valor: number | null
  maximo: number
  porcentaje: number
}
