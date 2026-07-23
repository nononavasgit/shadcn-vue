import type { NombreIcono } from '@/assets/icons'
import { cva, type VariantProps } from 'class-variance-authority'

export { default as Icono } from './Icono.vue'
export type { NombreIcono } from '@/assets/icons'

export const variantesIcono = cva('shrink-0', {
  variants: {
    tamano: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
  },
  defaultVariants: {
    tamano: 'md',
  },
})

export type VariantesIcono = VariantProps<typeof variantesIcono>

export interface IconoProps {
  nombre: NombreIcono
  tamano?: VariantesIcono['tamano']
  color?: string
}
