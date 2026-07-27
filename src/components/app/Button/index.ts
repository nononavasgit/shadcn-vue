import { cva, type VariantProps } from 'class-variance-authority'
import type { SVGAttributes } from 'vue'
import type { IconoProps, IconoNombre } from '@/components/app/Icon'

export { default as Button } from './Button.vue'

export const botonVariantes = cva('', {
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
      alerta: 'focus-visible:border-warning focus-visible:ring-warning/30',
      exito: 'focus-visible:border-success focus-visible:ring-success/30',
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
    color: {
      true: 'focus-visible:border-(--button-color) focus-visible:ring-(--button-color)/30',
      false: '',
    },
  },
  compoundVariants: [
    { cuadrado: true, tamano: 'xs', class: 'tamano-7 p-0' },
    { cuadrado: true, tamano: 'sm', class: 'tamano-8 p-0' },
    { cuadrado: true, tamano: 'md', class: 'tamano-9 p-0' },
    { cuadrado: true, tamano: 'lg', class: 'tamano-10 p-0' },
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
      class: 'bg-warning text-warning-foreground hover:bg-warning/90 active:bg-warning/80',
    },
    {
      variante: 'delineado',
      gravedad: 'alerta',
      class:
        'border-warning/40 text-warning hover:bg-warning/10 active:border-warning/60 active:bg-warning/20',
    },
    {
      variante: 'plano',
      gravedad: 'alerta',
      class: 'text-warning hover:bg-warning/10 active:bg-warning/20',
    },
    {
      variante: 'sutil',
      gravedad: 'alerta',
      class:
        'border-warning/20 bg-warning/10 text-warning hover:bg-warning/15 active:bg-warning/25',
    },
    {
      variante: 'suave',
      gravedad: 'alerta',
      class: 'bg-warning/10 text-warning hover:bg-warning/20 active:bg-warning/30',
    },
    {
      variante: 'solido',
      gravedad: 'exito',
      class: 'bg-success text-success-foreground hover:bg-success/90 active:bg-success/80',
    },
    {
      variante: 'delineado',
      gravedad: 'exito',
      class:
        'border-success/40 text-success hover:bg-success/10 active:border-success/60 active:bg-success/20',
    },
    {
      variante: 'plano',
      gravedad: 'exito',
      class: 'text-success hover:bg-success/10 active:bg-success/20',
    },
    {
      variante: 'sutil',
      gravedad: 'exito',
      class:
        'border-success/20 bg-success/10 text-success hover:bg-success/15 active:bg-success/25',
    },
    {
      variante: 'suave',
      gravedad: 'exito',
      class: 'bg-success/10 text-success hover:bg-success/20 active:bg-success/30',
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
    {
      color: true,
      variante: 'solido',
      class:
        'bg-(--button-color) text-(--button-color-foreground) hover:bg-(--button-color)/90 active:bg-(--button-color)/80',
    },
    {
      color: true,
      variante: 'delineado',
      class:
        'border-(--button-color)/40 text-(--button-color) hover:bg-(--button-color)/10 active:border-(--button-color)/60 active:bg-(--button-color)/20',
    },
    {
      color: true,
      variante: 'plano',
      class: 'text-(--button-color) hover:bg-(--button-color)/10 active:bg-(--button-color)/20',
    },
    {
      color: true,
      variante: 'sutil',
      class:
        'border-(--button-color)/20 bg-(--button-color)/10 text-(--button-color) hover:bg-(--button-color)/15 active:bg-(--button-color)/25',
    },
    {
      color: true,
      variante: 'suave',
      class:
        'bg-(--button-color)/10 text-(--button-color) hover:bg-(--button-color)/20 active:bg-(--button-color)/30',
    },
  ],
  defaultVariants: {
    variante: 'solido',
    gravedad: 'primario',
    tamano: 'md',
    redondeado: false,
    cuadrado: false,
    color: false,
  },
})

export type BotonVariantes = VariantProps<typeof botonVariantes>

export interface BotonUI {
  icono?: IconoProps & SVGAttributes
  iconoFinal?: IconoProps & SVGAttributes
  iconoCargando?: IconoProps & SVGAttributes
}

export interface BotonProps {
  titulo?: string
  variante?: BotonVariantes['variante']
  gravedad?: BotonVariantes['gravedad']
  tamano?: BotonVariantes['tamano']
  redondeado?: BotonVariantes['redondeado'] | boolean
  cuadrado?: BotonVariantes['cuadrado'] | boolean
  cargando?: boolean
  color?: string
  icono?: IconoNombre | (IconoProps & SVGAttributes)
  iconoFinal?: IconoNombre | (IconoProps & SVGAttributes)
  ui?: BotonUI
}

export interface BotonEmits {
  click: [evt: MouseEvent]
}

export interface BotonSlots {
  default?(): unknown
  inicio?(): unknown
  cargando?(): unknown
  final?(): unknown
}
