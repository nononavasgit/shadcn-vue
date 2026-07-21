import type { NombreIcono } from '@/components/app/Icono'
import type { ButtonHTMLAttributes } from 'vue'
import type { BotonVariantes } from './variantes'

export interface BotonBaseProps {
  titulo?: string
  icono?: NombreIcono
  iconoDerecho?: NombreIcono
  variante?: BotonVariantes['variante']
  paleta?: BotonVariantes['paleta']
  tamano?: BotonVariantes['tamano']
  fluido?: BotonVariantes['fluido'] | boolean
  redondeado?: BotonVariantes['redondeado'] | boolean
  cuadrado?: BotonVariantes['cuadrado'] | boolean
  cargando?: boolean
  color?: string
}

export type BotonProps = BotonBaseProps & ButtonHTMLAttributes
