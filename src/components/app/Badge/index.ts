import { cva, type VariantProps } from 'class-variance-authority'
import type { SVGAttributes } from 'vue'
import type { IconoNombre, IconoProps } from '@/components/app/Icon'

export { default as Badge } from './Badge.vue'

export const etiquetaVariantes = cva('', {
  variants: {
    tamano: {
      sm: 'gap-0.5 px-0.5 text-sm [&>svg]:tamano-2.5',
      md: 'gap-1 px-1 text-base [&>svg]:tamano-3',
      lg: 'gap-1.5 px-2 text-lg [&>svg]:tamano-3.5',
    },
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
    color: {
      true: 'focus-visible:border-(--badge-color) focus-visible:ring-(--badge-color)/30',
      false: '',
    },
  },
  compoundVariants: [
    {
      variante: 'solido',
      gravedad: 'primario',
      class: 'border-transparent bg-primary text-primary-foreground',
    },
    {
      variante: 'delineado',
      gravedad: 'primario',
      class: 'border-primary/40 text-primary',
    },
    {
      variante: 'plano',
      gravedad: 'primario',
      class: 'border-transparent text-primary',
    },
    {
      variante: 'sutil',
      gravedad: 'primario',
      class: 'border-primary/20 bg-primary/10 text-primary',
    },
    {
      variante: 'suave',
      gravedad: 'primario',
      class: 'border-transparent bg-primary/10 text-primary',
    },
    {
      variante: 'solido',
      gravedad: 'secundario',
      class: 'border-transparent bg-secondary text-secondary-foreground',
    },
    {
      variante: 'delineado',
      gravedad: 'secundario',
      class: 'border-secondary-foreground/30 text-secondary-foreground',
    },
    {
      variante: 'plano',
      gravedad: 'secundario',
      class: 'border-transparent text-secondary-foreground',
    },
    {
      variante: 'sutil',
      gravedad: 'secundario',
      class: 'border-secondary-foreground/15 bg-secondary/60 text-secondary-foreground',
    },
    {
      variante: 'suave',
      gravedad: 'secundario',
      class: 'border-transparent bg-secondary/60 text-secondary-foreground',
    },
    {
      variante: 'solido',
      gravedad: 'alerta',
      class: 'border-transparent bg-warning text-warning-foreground',
    },
    {
      variante: 'delineado',
      gravedad: 'alerta',
      class: 'border-warning/40 text-warning',
    },
    {
      variante: 'plano',
      gravedad: 'alerta',
      class: 'border-transparent text-warning',
    },
    {
      variante: 'sutil',
      gravedad: 'alerta',
      class: 'border-warning/20 bg-warning/10 text-warning',
    },
    {
      variante: 'suave',
      gravedad: 'alerta',
      class: 'border-transparent bg-warning/10 text-warning',
    },
    {
      variante: 'solido',
      gravedad: 'exito',
      class: 'border-transparent bg-success text-success-foreground',
    },
    {
      variante: 'delineado',
      gravedad: 'exito',
      class: 'border-success/40 text-success',
    },
    {
      variante: 'plano',
      gravedad: 'exito',
      class: 'border-transparent text-success',
    },
    {
      variante: 'sutil',
      gravedad: 'exito',
      class: 'border-success/20 bg-success/10 text-success',
    },
    {
      variante: 'suave',
      gravedad: 'exito',
      class: 'border-transparent bg-success/10 text-success',
    },
    {
      variante: 'solido',
      gravedad: 'error',
      class: 'border-transparent bg-error text-error-foreground',
    },
    {
      variante: 'delineado',
      gravedad: 'error',
      class: 'border-error/40 text-error',
    },
    {
      variante: 'plano',
      gravedad: 'error',
      class: 'border-transparent text-error',
    },
    {
      variante: 'sutil',
      gravedad: 'error',
      class: 'border-error/20 bg-error/10 text-error',
    },
    {
      variante: 'suave',
      gravedad: 'error',
      class: 'border-transparent bg-error/10 text-error',
    },
    {
      color: true,
      variante: 'solido',
      class: 'border-transparent bg-(--badge-color) text-(--badge-color-foreground)',
    },
    {
      color: true,
      variante: 'delineado',
      class: 'border-(--badge-color)/40 bg-transparent text-(--badge-color)',
    },
    {
      color: true,
      variante: 'plano',
      class: 'border-transparent bg-transparent text-(--badge-color)',
    },
    {
      color: true,
      variante: 'sutil',
      class: 'border-(--badge-color)/20 bg-(--badge-color)/10 text-(--badge-color)',
    },
    {
      color: true,
      variante: 'suave',
      class: 'border-transparent bg-(--badge-color)/10 text-(--badge-color)',
    },
  ],
  defaultVariants: {
    tamano: 'md',
    variante: 'solido',
    gravedad: 'primario',
    color: false,
  },
})

export type EtiquetaVariantes = VariantProps<typeof etiquetaVariantes>

export interface EtiquetaUI {
  icono?: IconoProps & SVGAttributes
  iconoFinal?: IconoProps & SVGAttributes
}

export interface EtiquetaProps {
  as?: string
  asChild?: boolean
  titulo?: string
  tamano?: EtiquetaVariantes['tamano']
  variante?: EtiquetaVariantes['variante']
  gravedad?: EtiquetaVariantes['gravedad']
  color?: string
  icono?: IconoNombre | (IconoProps & SVGAttributes)
  iconoFinal?: IconoNombre | (IconoProps & SVGAttributes)
  ui?: EtiquetaUI
}

export interface EtiquetaSlots {
  default?(): unknown
  inicio?(): unknown
  final?(): unknown
}
