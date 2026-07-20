import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const iconoVariantes = cva('', {
  variants: {
    tamano: {
      xs: 'size-4',
      sm: 'size-5',
      md: 'size-6',
      lg: 'size-7',
    },
  },
  defaultVariants: {
    tamano: 'md',
  },
})

export type IconoVariantes = VariantProps<typeof iconoVariantes>
