import type { IconoProps, NombreIcono } from '@/components/app/Icono'
import type { HTMLAttributes } from 'vue'
import type { EtiquetaVariantes } from './variantes'

interface EtiquetaUI {
  root?: HTMLAttributes
  icono?: Omit<IconoProps, 'nombre'>
  iconoDerecho?: Omit<IconoProps, 'nombre'>
}

export interface EtiquetaBaseProps {
  titulo?: string
  como?: string
  comoHijo?: boolean
  icono?: NombreIcono
  iconoDerecho?: NombreIcono
  variante?: EtiquetaVariantes['variante']
  paleta?: EtiquetaVariantes['paleta']
  tamano?: EtiquetaVariantes['tamano']
  redondeado?: EtiquetaVariantes['redondeado'] | boolean
  color?: string
  ui?: EtiquetaUI
}

export type EtiquetaProps = EtiquetaBaseProps & HTMLAttributes
