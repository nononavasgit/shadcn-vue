import { cva, type VariantProps } from 'class-variance-authority'

export const botonVariantes = cva('gap-2', {
  variants: {
    variante: {
      solido: '',
      delineado: 'border bg-transparent',
      plano: 'border-transparent bg-transparent shadow-none',
    },

    paleta: {
      primario: 'focus-visible:border-primary focus-visible:ring-primary/30',
      secundario: 'focus-visible:border-secondary focus-visible:ring-secondary/30',
      alerta: 'focus-visible:border-alerta focus-visible:ring-alerta/30',
    },

    tamano: {
      xs: 'h-6 gap-1 px-2 text-xs',
      md: 'h-9 px-4 py-2',
      sm: 'h-8 gap-1.5 px-3',
      lg: 'h-10 px-6',
    },

    fluido: {
      true: 'w-full basis-full',
      false: '',
    },

    redondeado: {
      true: 'rounded-full',
      false: '',
    },

    cuadrado: {
      true: '',
      false: '',
    },
  },

  compoundVariants: [
    {
      tamano: 'xs',
      cuadrado: true,
      class: 'p-1',
    },
    {
      tamano: 'sm',
      cuadrado: true,
      class: 'p-1.5 ',
    },
    {
      tamano: 'md',
      cuadrado: true,
      class: 'p-1.5',
    },
    {
      tamano: 'lg',
      cuadrado: true,
      class: 'p-2 ',
    },
    {
      variante: 'solido',
      paleta: 'primario',
      class: 'bg-primary text-primary-foreground hover:bg-primary/90',
    },
    {
      variante: 'solido',
      paleta: 'secundario',
      class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    },
    {
      variante: 'solido',
      paleta: 'alerta',
      class: 'bg-alerta text-alerta-foreground hover:bg-alerta/90',
    },

    // Delineado
    {
      variante: 'delineado',
      paleta: 'primario',
      class: 'border-primary text-primary hover:bg-primary/10',
    },
    {
      variante: 'delineado',
      paleta: 'secundario',
      class: 'border-secondary text-secondary-foreground hover:bg-secondary/20',
    },
    {
      variante: 'delineado',
      paleta: 'alerta',
      class: 'border-alerta text-alerta hover:bg-alerta/10',
    },

    // Plano
    {
      variante: 'plano',
      paleta: 'primario',
      class: 'text-primary hover:bg-primary/10',
    },
    {
      variante: 'plano',
      paleta: 'secundario',
      class: 'text-secondary-foreground hover:bg-secondary/20',
    },
    {
      variante: 'plano',
      paleta: 'alerta',
      class: 'text-alerta hover:bg-alerta/10',
    },
  ],

  defaultVariants: {
    variante: 'solido',
    paleta: 'primario',
    tamano: 'md',
    fluido: false,
    redondeado: false,
    cuadrado: false,
  },
})

export type BotonVariantes = VariantProps<typeof botonVariantes>
