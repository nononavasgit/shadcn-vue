import { cva, type VariantProps } from 'class-variance-authority'

export const kbdVariantes = cva('leading-none', {
  variants: {
    variante: {
      delineado: 'border border-border bg-transparent text-muted-foreground',
      suave: 'bg-muted text-muted-foreground',
      sutil: 'border border-border bg-muted text-muted-foreground',
    },
    tamano: {
      sm: 'h-4 min-w-4 px-1 text-sm',
      md: 'h-5 min-w-5 px-1 text-base',
      lg: 'h-6 min-w-6 px-1.5 text-lg',
    },
  },
  defaultVariants: {
    variante: 'suave',
    tamano: 'md',
  },
})

export type KbdVariantes = VariantProps<typeof kbdVariantes>
