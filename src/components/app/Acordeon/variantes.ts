import { cva, type VariantProps } from 'class-variance-authority'

export const acordeonVariantes = cva('w-full', {
  variants: {
    variante: {
      simple: '',
      contenido: 'rounded-lg border px-4',
      separado:
        'space-y-2 [&>[data-slot=accordion-item]]:rounded-lg [&>[data-slot=accordion-item]]:border [&>[data-slot=accordion-item]]:px-4',
    },
    tamano: {
      sm: '[&_[data-slot=accordion-trigger]]:py-2 [&_[data-slot=accordion-content]>div]:pb-2',
      md: '',
      lg: '[&_[data-slot=accordion-trigger]]:py-5 [&_[data-slot=accordion-trigger]]:text-base [&_[data-slot=accordion-content]]:text-base [&_[data-slot=accordion-content]>div]:pb-5',
    },
  },
  defaultVariants: {
    variante: 'simple',
    tamano: 'md',
  },
})

export type AcordeonVariantes = VariantProps<typeof acordeonVariantes>
