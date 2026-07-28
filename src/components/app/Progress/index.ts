import type { ProgressRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'

export { default as Progress } from './Progress.vue'

export interface ProgressUI {
  indicador?: HTMLAttributes
  titulo?: HTMLAttributes
}

export interface ProgressProps {
  valor?: number | null
  maximo?: number
  titulo?: string
  color?: string
  colorPista?: string
  getTituloValor?: ProgressRootProps['getValueLabel']
  getTextoValor?: ProgressRootProps['getValueText']
  ui?: ProgressUI
}

export interface ProgressLabelSlotProps {
  valor: number | null
  maximo: number
  porcentaje: number
}

export interface ProgressSlots {
  titulo?(props: ProgressLabelSlotProps): unknown
}
