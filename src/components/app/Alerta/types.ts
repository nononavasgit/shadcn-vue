import type { BotonProps } from '@/components/app/Boton'
import type { IconoProps, NombreIcono } from '@/components/app/Icono'
import type { HTMLAttributes } from 'vue'
import type { AlertaVariantes } from './variantes'

interface AlertaUI {
  root?: HTMLAttributes
  base?: HTMLAttributes
  titulo?: HTMLAttributes
  descripcion?: HTMLAttributes
  cerrarContenedor?: HTMLAttributes
  cerrarBoton?: BotonProps
  iconoContenedor?: HTMLAttributes
  icono?: IconoProps
  contenido?: HTMLAttributes
}

export interface AlertaBaseProps {
  titulo?: string
  descripcion?: string
  icono?: NombreIcono
  variante?: AlertaVariantes['variante']
  paleta?: AlertaVariantes['paleta']
  cerrable?: boolean
  color?: string
  ui?: AlertaUI
}

export type AlertaProps = AlertaBaseProps & HTMLAttributes
