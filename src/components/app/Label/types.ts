import type { HTMLAttributes } from 'vue'

interface LabelUI {
  root?: HTMLAttributes
}

export interface LabelBaseProps {
  titulo?: string
  ui?: LabelUI
}

export type LabelProps = LabelBaseProps & HTMLAttributes
