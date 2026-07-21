import type { HTMLAttributes } from 'vue'
import type { KbdVariantes } from './variantes'

interface KbdUI {
  root?: HTMLAttributes
}

export interface KbdBaseProps {
  titulo?: string
  variante?: KbdVariantes['variante']
  tamano?: KbdVariantes['tamano']
  ui?: KbdUI
}

export type KbdProps = KbdBaseProps & HTMLAttributes
