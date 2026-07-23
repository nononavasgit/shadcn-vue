import type { IconoProps, NombreIcono } from '@/components/app/Icono'
import type { ButtonHTMLAttributes, Component } from 'vue'
import type { BotonVariantes } from './variantes'

interface BotonUI {
  root?: ButtonHTMLAttributes
  cargando?: Omit<IconoProps, 'nombre'>
  icono?: Omit<IconoProps, 'nombre'>
  iconoDerecho?: Omit<IconoProps, 'nombre'>
}

export interface BotonBaseProps {
  como?: string | Component
  comoHijo?: boolean
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
  ui?: BotonUI
}

export type BotonProps = BotonBaseProps & ButtonHTMLAttributes
