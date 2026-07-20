import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export const iconoVariantes = cva('', {
  variants: {
    tamano: {
      xs: "size-5 rounded-md [&_svg:not([class*='size-'])]:size-3",
      sm: 'size-6',
      md: 'size-7',
      lg: 'size-8',
    },
  },
  defaultVariants: {
    tamano: 'md',
  },
})

export type IconoVariantes = VariantProps<typeof iconoVariantes>
