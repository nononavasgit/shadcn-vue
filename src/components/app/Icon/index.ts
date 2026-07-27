import type { IconoNombre } from './icons.ts'
import { cva, type VariantProps } from 'class-variance-authority'

export { default as Icon } from './Icon.vue'
export type { IconoNombre } from './icons.ts'

export const iconoVariantes = cva('shrink-0', {
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

export type IconoVariantes = VariantProps<typeof iconoVariantes>

export interface IconoProps {
  nombre: IconoNombre
  tamano?: IconoVariantes['tamano']
  color?: string
}
