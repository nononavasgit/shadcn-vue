import { cva, type VariantProps } from 'class-variance-authority'

export const botonVariantes = cva('gap-2 transition-colors', {
  variants: {
    variante: {
      solido: '',
      delineado: 'border bg-transparent',
      plano: 'border-transparent bg-transparent shadow-none',
      suave: 'border-transparent shadow-none',
      sutil: 'border shadow-none',
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

    personalizado: {
      true: 'focus-visible:border-(--boton-color) focus-visible:ring-(--boton-suave-hover)',
      false: '',
    },
  },

  compoundVariants: [
    {
      tamano: 'xs',
      cuadrado: true,
      class: 'size-6 p-0',
    },
    {
      tamano: 'sm',
      cuadrado: true,
      class: 'size-8 p-0',
    },
    {
      tamano: 'md',
      cuadrado: true,
      class: 'size-9 p-0',
    },
    {
      tamano: 'lg',
      cuadrado: true,
      class: 'size-10 p-0',
    },
    {
      variante: 'solido',
      paleta: 'primario',
      class: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
    },
    {
      variante: 'solido',
      paleta: 'secundario',
      class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70',
    },
    {
      variante: 'solido',
      paleta: 'alerta',
      class: 'bg-alerta text-alerta-foreground hover:bg-alerta/90 active:bg-alerta/80',
    },

    // Delineado
    {
      variante: 'delineado',
      paleta: 'primario',
      class: 'border-primary text-primary hover:bg-primary/10 active:bg-primary/20',
    },
    {
      variante: 'delineado',
      paleta: 'secundario',
      class:
        'border-secondary text-secondary-foreground hover:bg-secondary/20 active:bg-secondary/30',
    },
    {
      variante: 'delineado',
      paleta: 'alerta',
      class: 'border-alerta text-alerta hover:bg-alerta/10 active:bg-alerta/20',
    },

    // Suave
    {
      variante: 'suave',
      paleta: 'primario',
      class: 'bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30',
    },
    {
      variante: 'suave',
      paleta: 'secundario',
      class: 'bg-secondary/60 text-secondary-foreground hover:bg-secondary/80 active:bg-secondary',
    },
    {
      variante: 'suave',
      paleta: 'alerta',
      class: 'bg-alerta/10 text-alerta hover:bg-alerta/20 active:bg-alerta/30',
    },

    // Sutil: fondo suave con borde delineado
    {
      variante: 'sutil',
      paleta: 'primario',
      class: 'border-primary bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30',
    },
    {
      variante: 'sutil',
      paleta: 'secundario',
      class:
        'border-secondary bg-secondary/60 text-secondary-foreground hover:bg-secondary/80 active:bg-secondary',
    },
    {
      variante: 'sutil',
      paleta: 'alerta',
      class: 'border-alerta bg-alerta/10 text-alerta hover:bg-alerta/20 active:bg-alerta/30',
    },

    // Plano
    {
      variante: 'plano',
      paleta: 'primario',
      class: 'text-primary hover:bg-primary/10 active:bg-primary/20',
    },
    {
      variante: 'plano',
      paleta: 'secundario',
      class: 'text-secondary-foreground hover:bg-secondary/20 active:bg-secondary/30',
    },
    {
      variante: 'plano',
      paleta: 'alerta',
      class: 'text-alerta hover:bg-alerta/10 active:bg-alerta/20',
    },

    // Color personalizado. Se declara al final para que prevalezca sobre la paleta.
    {
      variante: 'solido',
      personalizado: true,
      class:
        'bg-(--boton-color) text-(--boton-contraste) hover:bg-(--boton-hover) active:bg-(--boton-active)',
    },
    {
      variante: 'delineado',
      personalizado: true,
      class:
        'border-(--boton-color) bg-transparent text-(--boton-color) hover:bg-(--boton-suave) active:bg-(--boton-suave-active)',
    },
    {
      variante: 'plano',
      personalizado: true,
      class:
        'bg-transparent text-(--boton-color) hover:bg-(--boton-suave) active:bg-(--boton-suave-active)',
    },
    {
      variante: 'suave',
      personalizado: true,
      class:
        'bg-(--boton-suave) text-(--boton-color) hover:bg-(--boton-suave-hover) active:bg-(--boton-suave-active)',
    },
    {
      variante: 'sutil',
      personalizado: true,
      class:
        'border-(--boton-color) bg-(--boton-suave) text-(--boton-color) hover:bg-(--boton-suave-hover) active:bg-(--boton-suave-active)',
    },
  ],

  defaultVariants: {
    variante: 'solido',
    paleta: 'primario',
    tamano: 'md',
    fluido: false,
    redondeado: false,
    cuadrado: false,
    personalizado: false,
  },
})

export type BotonVariantes = VariantProps<typeof botonVariantes>
