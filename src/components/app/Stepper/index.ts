import type { StepperSeparatorProps } from 'reka-ui'
import type { Component, HTMLAttributes, SVGAttributes } from 'vue'
import type { IconoNombre, IconoProps } from '@/components/app/Icon'

export { default as Stepper } from './Stepper.vue'

export type StepperEstado = 'completado' | 'activo' | 'inactivo'
export type StepperNodoUI = Omit<HTMLAttributes, 'dir'> & {
  as?: string | Component
  asChild?: boolean
  dir?: 'ltr' | 'rtl'
}
export type StepperSeparadorUI = Omit<HTMLAttributes, 'orientation'> & StepperSeparatorProps

export interface StepperPaso {
  clave?: string | number
  paso: number
  titulo?: string
  descripcion?: string
  icono?: IconoNombre | (IconoProps & SVGAttributes)
  contenido?: string
  deshabilitado?: boolean
  completado?: boolean
}

// Context UI
export interface StepperContextoUI {
  paso: StepperPaso
  indice: number
  estado: StepperEstado
  activo: boolean
  primero: boolean
  ultimo: boolean
}

// UI
export type StepperValorUI<T> = T | ((contexto: StepperContextoUI) => T)
export interface StepperUI {
  lista?: HTMLAttributes
  elemento?: StepperValorUI<HTMLAttributes>
  activador?: StepperValorUI<HTMLAttributes>
  indicador?: StepperValorUI<HTMLAttributes>
  encabezado?: StepperValorUI<HTMLAttributes>
  icono?: StepperValorUI<SVGAttributes>
  titulo?: StepperValorUI<HTMLAttributes>
  descripcion?: StepperValorUI<HTMLAttributes>
  separador?: StepperValorUI<StepperSeparadorUI>
  contenido?: StepperValorUI<HTMLAttributes>
}

// Props
export interface StepperProps {
  pasos?: StepperPaso[]
  orientacion?: 'vertical' | 'horizontal'
  dir?: 'ltr' | 'rtl'
  lineal?: boolean
  color?: string
  as?: string | Component
  asChild?: boolean
  ui?: StepperUI
}

export interface StepperEmits {
  'update:modelValue': [valor: number | undefined]
}

// SlotProps
export interface StepperSlotProps {
  valor: number | undefined
  totalPasos: number
  siguienteDeshabilitado: boolean
  anteriorDeshabilitado: boolean
  primerPaso: boolean
  ultimoPaso: boolean
  irAlPaso: (paso: number) => void
  siguientePaso: () => void
  pasoAnterior: () => void
  tieneSiguiente: () => boolean
  tieneAnterior: () => boolean
  paso: StepperPaso
  indice: number
  estado: StepperEstado
  activo: boolean
  primero: boolean
  ultimo: boolean
}

// Slots
export type StepperSlots = {
  default?(props: StepperSlotProps): unknown
  elemento?(props: StepperSlotProps): unknown
  encabezado?(props: StepperSlotProps): unknown
  indicador?(props: StepperSlotProps): unknown
  icono?(props: StepperSlotProps): unknown
  titulo?(props: StepperSlotProps): unknown
  descripcion?(props: StepperSlotProps): unknown
  separador?(props: StepperSlotProps): unknown
  contenido?(props: StepperSlotProps): unknown
} & {
  [nombre: `elemento-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [nombre: `encabezado-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [nombre: `indicador-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [nombre: `icono-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [nombre: `titulo-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [nombre: `descripcion-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [nombre: `separador-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
  [nombre: `contenido-${string}`]: ((props: StepperSlotProps) => unknown) | undefined
}
