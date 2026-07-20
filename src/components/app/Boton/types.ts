import type { NombreIcono } from '@/assets/iconos'
import type { IconoProps } from '@/components/app/Icono'
import type { ButtonHTMLAttributes } from 'vue'
import type { BotonVariantes } from './variantes'

export interface BotonBaseProps {
  titulo?: string
  icono?: NombreIcono | IconoProps
  iconoDerecho?: NombreIcono | IconoProps
  variante?: BotonVariantes['variante']
  paleta?: BotonVariantes['paleta']
  tamano?: BotonVariantes['tamano']
  fluido?: BotonVariantes['fluido']
  redondeado?: boolean
  cuadrado?: BotonVariantes['cuadrado']
  cargando?: boolean
}

export type BotonProps = BotonBaseProps & ButtonHTMLAttributes
