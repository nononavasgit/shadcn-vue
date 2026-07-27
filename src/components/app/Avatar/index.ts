import type { HTMLAttributes, ImgHTMLAttributes, SVGAttributes } from 'vue'
import type { IconoNombre, IconoProps } from '@/components/app/Icon'

export { default as Avatar } from './Avatar.vue'

export type AvatarEstadoCarga = boolean

export interface AvatarUI {
  raiz?: HTMLAttributes
  imagen?: ImgHTMLAttributes
  fallback?: HTMLAttributes
  icono?: IconoProps & SVGAttributes
}

export interface AvatarProps {
  src?: string
  alt?: string
  icono?: IconoNombre | (IconoProps & SVGAttributes)
  titulo?: string
  ui?: AvatarUI
}

export interface AvatarEmits {
  cambioEstadoCarga: [valor: AvatarEstadoCarga]
}
