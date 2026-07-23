import { cva, type VariantProps } from 'class-variance-authority'
import { ButtonHTMLAttributes, SVGAttributes } from 'vue'

export { default as Boton } from './Boton.vue'

export const variantesBoton = cva('', {
  variants: {
    variante: {
      solido: '',
      delineado: 'border bg-transparent',
      plano: 'bg-transparent',
      sutil: 'border',
      suave: '',
    },
    gravedad: {
      primario: 'focus-visible:border-primary focus-visible:ring-primary/30',
      secundario:
        'focus-visible:border-secondary-foreground focus-visible:ring-secondary-foreground/20',
      alerta: 'focus-visible:border-alerta focus-visible:ring-alerta/30',
      exito: 'focus-visible:border-exito focus-visible:ring-exito/30',
      error: 'focus-visible:border-error focus-visible:ring-error/30',
    },
    tamano: {
      xs: 'h-7 gap-1 px-2.5 text-xs has-[>svg]:px-2',
      sm: 'h-8 gap-1.5 px-3 text-sm has-[>svg]:px-2.5',
      md: 'h-9 px-4 py-2 text-base has-[>svg]:px-3',
      lg: 'h-10 px-6 text-lg has-[>svg]:px-4',
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
    { cuadrado: true, tamano: 'xs', class: 'size-7 p-0' },
    { cuadrado: true, tamano: 'sm', class: 'size-8 p-0' },
    { cuadrado: true, tamano: 'md', class: 'size-9 p-0' },
    { cuadrado: true, tamano: 'lg', class: 'size-10 p-0' },
    {
      variante: 'solido',
      gravedad: 'primario',
      class: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
    },
    {
      variante: 'delineado',
      gravedad: 'primario',
      class:
        'border-primary/40 text-primary hover:bg-primary/10 active:border-primary/60 active:bg-primary/20',
    },
    {
      variante: 'plano',
      gravedad: 'primario',
      class: 'text-primary hover:bg-primary/10 active:bg-primary/20',
    },
    {
      variante: 'sutil',
      gravedad: 'primario',
      class:
        'border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 active:bg-primary/25',
    },
    {
      variante: 'suave',
      gravedad: 'primario',
      class: 'bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30',
    },
    {
      variante: 'solido',
      gravedad: 'secundario',
      class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70',
    },
    {
      variante: 'delineado',
      gravedad: 'secundario',
      class:
        'border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary active:bg-secondary/70',
    },
    {
      variante: 'plano',
      gravedad: 'secundario',
      class: 'text-secondary-foreground hover:bg-secondary active:bg-secondary/70',
    },
    {
      variante: 'sutil',
      gravedad: 'secundario',
      class:
        'border-secondary-foreground/15 bg-secondary/60 text-secondary-foreground hover:bg-secondary/80 active:bg-secondary',
    },
    {
      variante: 'suave',
      gravedad: 'secundario',
      class: 'bg-secondary/60 text-secondary-foreground hover:bg-secondary/80 active:bg-secondary',
    },
    {
      variante: 'solido',
      gravedad: 'alerta',
      class: 'bg-alerta text-alerta-foreground hover:bg-alerta/90 active:bg-alerta/80',
    },
    {
      variante: 'delineado',
      gravedad: 'alerta',
      class:
        'border-alerta/40 text-alerta hover:bg-alerta/10 active:border-alerta/60 active:bg-alerta/20',
    },
    {
      variante: 'plano',
      gravedad: 'alerta',
      class: 'text-alerta hover:bg-alerta/10 active:bg-alerta/20',
    },
    {
      variante: 'sutil',
      gravedad: 'alerta',
      class: 'border-alerta/20 bg-alerta/10 text-alerta hover:bg-alerta/15 active:bg-alerta/25',
    },
    {
      variante: 'suave',
      gravedad: 'alerta',
      class: 'bg-alerta/10 text-alerta hover:bg-alerta/20 active:bg-alerta/30',
    },
    {
      variante: 'solido',
      gravedad: 'exito',
      class: 'bg-exito text-exito-foreground hover:bg-exito/90 active:bg-exito/80',
    },
    {
      variante: 'delineado',
      gravedad: 'exito',
      class:
        'border-exito/40 text-exito hover:bg-exito/10 active:border-exito/60 active:bg-exito/20',
    },
    {
      variante: 'plano',
      gravedad: 'exito',
      class: 'text-exito hover:bg-exito/10 active:bg-exito/20',
    },
    {
      variante: 'sutil',
      gravedad: 'exito',
      class: 'border-exito/20 bg-exito/10 text-exito hover:bg-exito/15 active:bg-exito/25',
    },
    {
      variante: 'suave',
      gravedad: 'exito',
      class: 'bg-exito/10 text-exito hover:bg-exito/20 active:bg-exito/30',
    },
    {
      variante: 'solido',
      gravedad: 'error',
      class: 'bg-error text-error-foreground hover:bg-error/90 active:bg-error/80',
    },
    {
      variante: 'delineado',
      gravedad: 'error',
      class:
        'border-error/40 text-error hover:bg-error/10 active:border-error/60 active:bg-error/20',
    },
    {
      variante: 'plano',
      gravedad: 'error',
      class: 'text-error hover:bg-error/10 active:bg-error/20',
    },
    {
      variante: 'sutil',
      gravedad: 'error',
      class: 'border-error/20 bg-error/10 text-error hover:bg-error/15 active:bg-error/25',
    },
    {
      variante: 'suave',
      gravedad: 'error',
      class: 'bg-error/10 text-error hover:bg-error/20 active:bg-error/30',
    },
  ],
  defaultVariants: {
    variante: 'solido',
    gravedad: 'primario',
    tamano: 'md',
    redondeado: false,
    cuadrado: false,
  },
})

export type VariantesBoton = VariantProps<typeof variantesBoton>

type BotonUI = {
  root: ButtonHTMLAttributes
  icono: SVGAttributes
  iconoDerecho: SVGAttributes
  iconoCargando: SVGAttributes
}

export interface BotonProps {
  variante?: VariantesBoton['variante']
  gravedad?: VariantesBoton['gravedad']
  tamano?: VariantesBoton['tamano']
  redondeado?: VariantesBoton['redondeado'] | boolean
  cuadrado?: VariantesBoton['cuadrado'] | boolean
  cargando?: boolean
  ui?: BotonUI
}
