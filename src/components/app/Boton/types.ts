import type { NombreIcono } from '@/assets/iconos'
import type { IconoProps } from '@/components/app/Icono'
import type { ButtonHTMLAttributes } from 'vue'
import type { AppBotonVariantes } from './variantes'

export interface BotonBaseProps {
  titulo?: string
  icono?: NombreIcono | IconoProps
  iconoDerecho?: NombreIcono | IconoProps
  variante?: AppBotonVariantes['variante']
  paleta?: AppBotonVariantes['paleta']
  tamano?: AppBotonVariantes['tamano']
  fluido?: AppBotonVariantes['fluido']
  redondeado?: boolean
  cargando?: boolean
}

export type BotonProps = BotonBaseProps & ButtonHTMLAttributes
