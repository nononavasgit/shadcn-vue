import type { Component, HTMLAttributes } from 'vue'

export { default as Accordeon } from './Accordion.vue'

export type AccordeonValor = string | string[] | undefined

export type AccordeonNodoUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}

export type AccordeonContenidoUI = AccordeonNodoUI & { forzarMontaje?: boolean }
export type AccordeonValorUI<T> = T | ((contexto: AccordeonContextoUI) => T)

export interface AccordeonUI {
  elemento?: AccordeonValorUI<AccordeonNodoUI>
  activador?: AccordeonValorUI<AccordeonNodoUI>
  contenido?: AccordeonValorUI<AccordeonContenidoUI>
}

export interface AccordeonElemento {
  valor: string
  titulo?: string
  contenido?: string
  deshabilitado?: boolean
  forzarMontaje?: boolean
}

// Contexto UI
export interface AccordeonContextoUI {
  elemento: AccordeonElemento
  indice: number
  abierto: boolean
  primero: boolean
  ultimo: boolean
}

// Props
export interface AccordeonProps {
  tipo?: 'unico' | 'multiple'
  colapsable?: boolean
  valorPredeterminado?: string | string[]
  deshabilitado?: boolean
  dir?: 'ltr' | 'rtl'
  orientacion?: 'horizontal' | 'vertical'
  desmontarAlOcultar?: boolean
  elementos?: AccordeonElemento[]
  ui?: AccordeonUI
}

// Emits
export interface AccordeonEmits {
  'update:modelValue': [valor: AccordeonValor]
}

// SlotProps
export interface AccordeonSlotProps {
  elemento: AccordeonElemento
  indice: number
  abierto: boolean
}

// Slots
export type AccordeonSlots = {
  activador?(props: AccordeonSlotProps): unknown
  default?(props: AccordeonSlotProps): unknown
} & {
  [nombre: `activador-${string}`]: ((props: AccordeonSlotProps) => unknown) | undefined
  [nombre: `contenido-${string}`]: ((props: AccordeonSlotProps) => unknown) | undefined
}
