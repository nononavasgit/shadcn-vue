import type { HTMLAttributes } from 'vue'
import type { IconoProps, NombreIcono } from '@/components/app/Icono'
import type { AcordeonVariantes } from './variantes'

export interface AcordeonElemento {
  valor: string
  titulo: string
  contenido?: string
  icono?: NombreIcono | IconoProps
  deshabilitado?: boolean
}

export interface AcordeonBaseProps {
  elementos: readonly AcordeonElemento[]
  modelValue?: string | string[]
  tipo?: 'unico' | 'multiple'
  colapsable?: boolean
  deshabilitado?: boolean
  variante?: AcordeonVariantes['variante']
  tamano?: AcordeonVariantes['tamano']
  class?: HTMLAttributes['class']
}

export type AcordeonProps = AcordeonBaseProps & HTMLAttributes
