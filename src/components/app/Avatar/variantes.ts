import { cva, type VariantProps } from 'class-variance-authority'

export const avatarVariantes = cva('font-medium', {
  variants: {
    tamano: {
      xs: 'size-6 text-xs',
      sm: 'size-8 text-sm',
      md: 'size-10 text-base',
      lg: 'size-12 text-lg',
    },
  },
  defaultVariants: {
    tamano: 'md',
  },
})

export const avatarFallbackVariantes = cva('', {
  variants: {
    paleta: {
      primario: 'bg-primary text-primary-foreground',
      secundario: 'bg-secondary text-secondary-foreground',
      alerta: 'bg-alerta text-alerta-foreground',
    },
    personalizado: {
      true: 'bg-(--avatar-color) text-(--avatar-contraste)',
      false: '',
    },
  },
  defaultVariants: {
    paleta: 'primario',
    personalizado: false,
  },
})

export type AvatarVariantes = VariantProps<typeof avatarVariantes> &
  VariantProps<typeof avatarFallbackVariantes>
