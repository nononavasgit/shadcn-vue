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
      primario: 'text-primary',
      secundario: 'text-secondary-foreground',
      alerta: 'text-alerta',
    },
    personalizado: {
      true: 'text-(--avatar-color)',
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
