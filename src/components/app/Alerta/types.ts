import type { IconoProps, NombreIcono } from '@/components/app/Icono'
import type { HTMLAttributes } from 'vue'
import type { AlertaVariantes } from './variantes'

export interface AlertaBaseProps {
  titulo?: string
  descripcion?: string
  icono?: NombreIcono | IconoProps
  variante?: AlertaVariantes['variante']
  paleta?: AlertaVariantes['paleta']
  cerrable?: boolean
  color?: string
}

export type AlertaProps = AlertaBaseProps & HTMLAttributes
