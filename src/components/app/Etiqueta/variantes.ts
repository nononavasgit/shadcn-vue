import { cva, type VariantProps } from 'class-variance-authority'

export const etiquetaVariantes = cva('gap-1 transition-colors', {
  variants: {
    variante: {
      solido: 'border-transparent',
      delineado: 'bg-transparent',
      suave: 'border-transparent',
      sutil: '',
    },
    paleta: {
      primario: '',
      secundario: '',
      alerta: '',
    },
    tamano: {
      xs: 'h-5 gap-0.5 px-1.5 py-0 text-xs [&>svg]:size-3',
      sm: 'h-6 gap-1 px-2 py-0.5 text-sm [&>svg]:size-3',
      md: 'h-7 gap-1.5 px-2.5 py-1 text-md  [&>svg]:size-4',
      lg: 'h-8 gap-1.5 px-3 py-1 text-lg [&>svg]:size-5',
    },
    redondeado: {
      true: 'rounded-full',
      false: 'rounded-md',
    },
    personalizado: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    // Sólido
    {
      variante: 'solido',
      paleta: 'primario',
      class: 'bg-primary text-primary-foreground',
    },
    {
      variante: 'solido',
      paleta: 'secundario',
      class: 'bg-secondary text-secondary-foreground',
    },
    {
      variante: 'solido',
      paleta: 'alerta',
      class: 'bg-alerta text-alerta-foreground',
    },

    // Delineado
    {
      variante: 'delineado',
      paleta: 'primario',
      class: 'border-primary text-primary',
    },
    {
      variante: 'delineado',
      paleta: 'secundario',
      class: 'border-secondary text-secondary-foreground',
    },
    {
      variante: 'delineado',
      paleta: 'alerta',
      class: 'border-alerta text-alerta ',
    },

    // Suave
    {
      variante: 'suave',
      paleta: 'primario',
      class: 'bg-primary/10 text-primary',
    },
    {
      variante: 'suave',
      paleta: 'secundario',
      class: 'bg-secondary text-secondary-foreground',
    },
    {
      variante: 'suave',
      paleta: 'alerta',
      class: 'bg-alerta/10 text-alerta',
    },

    // Sutil: fondo suave con el borde de delineado
    {
      variante: 'sutil',
      paleta: 'primario',
      class: 'border-primary bg-primary/10 text-primary',
    },
    {
      variante: 'sutil',
      paleta: 'secundario',
      class: 'border-secondary bg-secondary text-secondary-foreground',
    },
    {
      variante: 'sutil',
      paleta: 'alerta',
      class: 'border-alerta bg-alerta/10 text-alerta',
    },

    // Color personalizado. Se declara al final para que prevalezca sobre la paleta.
    {
      variante: 'solido',
      personalizado: true,
      class: 'bg-(--etiqueta-color) text-(--etiqueta-contraste)',
    },
    {
      variante: 'delineado',
      personalizado: true,
      class: 'border-(--etiqueta-color) bg-transparent text-(--etiqueta-color)',
    },
    {
      variante: 'suave',
      personalizado: true,
      class: 'bg-(--etiqueta-suave) text-(--etiqueta-color)',
    },
    {
      variante: 'sutil',
      personalizado: true,
      class: 'border-(--etiqueta-color) bg-(--etiqueta-suave) text-(--etiqueta-color)',
    },
  ],
  defaultVariants: {
    variante: 'solido',
    paleta: 'primario',
    tamano: 'sm',
    redondeado: true,
    personalizado: false,
  },
})

export type EtiquetaVariantes = VariantProps<typeof etiquetaVariantes>
