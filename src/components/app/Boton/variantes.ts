import { cva, type VariantProps } from 'class-variance-authority'

export const appBotonVariants = cva('gap-2', {
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
      md: 'h-9 px-4 py-2 has-[>svg]:px-3',
      xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
      sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
      lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
      icon: 'size-9',
    },

    fluido: {
      true: 'w-full basis-full',
      false: '',
    },

    redondeado: {
      true: 'rounded-full',
      false: '',
    },
  },

  compoundVariants: [
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
  },
})

export type AppBotonVariantes = VariantProps<typeof appBotonVariants>
