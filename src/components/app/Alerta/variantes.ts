import { cva, type VariantProps } from 'class-variance-authority'

export const alertaVariantes = cva('relative block py-3 pr-4 pl-4 transition-colors', {
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
    cerrable: {
      true: '',
      false: '',
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
      class: 'border-alerta text-alerta',
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
      class: 'bg-secondary/60 text-secondary-foreground',
    },
    {
      variante: 'suave',
      paleta: 'alerta',
      class: 'bg-alerta/10 text-alerta',
    },

    // Sutil
    {
      variante: 'sutil',
      paleta: 'primario',
      class: 'border-primary bg-primary/10 text-primary',
    },
    {
      variante: 'sutil',
      paleta: 'secundario',
      class: 'border-secondary bg-secondary/60 text-secondary-foreground',
    },
    {
      variante: 'sutil',
      paleta: 'alerta',
      class: 'border-alerta bg-alerta/10 text-alerta',
    },

    // Color personalizado
    {
      variante: 'solido',
      personalizado: true,
      class: 'bg-(--alerta-color) text-(--alerta-contraste)',
    },
    {
      variante: 'delineado',
      personalizado: true,
      class: 'border-(--alerta-color) bg-transparent text-(--alerta-color)',
    },
    {
      variante: 'suave',
      personalizado: true,
      class: 'bg-(--alerta-suave) text-(--alerta-color)',
    },
    {
      variante: 'sutil',
      personalizado: true,
      class: 'border-(--alerta-color) bg-(--alerta-suave) text-(--alerta-color)',
    },
  ],
  defaultVariants: {
    variante: 'suave',
    paleta: 'primario',
    cerrable: false,
    personalizado: false,
  },
})

export type AlertaVariantes = VariantProps<typeof alertaVariantes>
