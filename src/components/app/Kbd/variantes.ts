import { cva, type VariantProps } from 'class-variance-authority'

export const kbdVariantes = cva('', {
  variants: {
    tamano: {
      sm: 'h-4 min-w-4 px-1 text-sm',
      md: 'h-5 min-w-5 px-1 text-base',
      lg: 'h-6 min-w-6 px-1.5 text-lg',
    },
  },
  defaultVariants: {
    tamano: 'md',
  },
})

export type KbdVariantes = VariantProps<typeof kbdVariantes>
