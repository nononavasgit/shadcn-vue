import type { NombreIcono } from '@/components/app/Icono'
import type { HTMLAttributes } from 'vue'
import type { EtiquetaVariantes } from './variantes'

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
}

export type EtiquetaProps = EtiquetaBaseProps & HTMLAttributes
