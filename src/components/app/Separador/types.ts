import type { HTMLAttributes } from 'vue'

interface SeparadorUI {
  root?: HTMLAttributes
}

export type OrientacionSeparador = 'horizontal' | 'vertical'

export interface SeparadorBaseProps {
  orientacion?: OrientacionSeparador
  decorativo?: boolean
  ui?: SeparadorUI
}

export type SeparadorProps = SeparadorBaseProps & HTMLAttributes
