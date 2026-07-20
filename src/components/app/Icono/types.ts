import type { NombreIcono } from '@/assets/iconos'
import type { IconoVariantes } from './variantes'
import type { SVGAttributes } from 'vue'

export interface IconoBaseProps {
  nombre: NombreIcono
  color?: string
  tamano?: IconoVariantes['tamano']
}

export type IconoProps = IconoBaseProps & SVGAttributes
