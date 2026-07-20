import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const iconoVariantes = cva('', {
  variants: {
    tamano: {
      xs: 'size-3',
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
