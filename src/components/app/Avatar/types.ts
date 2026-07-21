import type { IconoProps, NombreIcono } from '@/components/app/Icono'
import type { AvatarFallbackProps, AvatarImageProps } from 'reka-ui'
import type { HTMLAttributes, ImgHTMLAttributes } from 'vue'
import type { AvatarVariantes } from './variantes'

export interface AvatarUI {
  root?: { class?: HTMLAttributes['class'] }
  imagen?: Omit<AvatarImageProps, 'src'> & Omit<ImgHTMLAttributes, 'src'>
  icono?: Omit<IconoProps, 'nombre'>
  fallback?: AvatarFallbackProps & HTMLAttributes
}

export interface AvatarBaseProps {
  imagen?: string
  titulo?: string
  icono?: NombreIcono
  paleta?: AvatarVariantes['paleta']
  tamano?: AvatarVariantes['tamano']
  color?: string
  ui?: AvatarUI
}

export type AvatarProps = AvatarBaseProps & HTMLAttributes
