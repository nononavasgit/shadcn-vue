import { cva, type VariantProps } from 'class-variance-authority'
import type { NormalizeIconProps } from '@/components/ui/Icon'

export { default as Avatar } from './Avatar.vue'

export const avatarVariants = cva('relative flex shrink-0 overflow-hidden ', {
  variants: {
    size: {
      xs: 'size-6 text-xs',
      sm: 'size-8 text-sm',
      md: 'size-10 text-base',
      lg: 'size-12 text-lg',
    },
    shape: {
      rounded: 'rounded-full',
      square: 'rounded-none',
    },
  },
  defaultVariants: {
    size: 'md',
    shape: 'rounded',
  },
})

export type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>['size']>
export type AvatarShape = NonNullable<VariantProps<typeof avatarVariants>['shape']>

// Props
export interface AvatarProps {
  src?: string
  size?: AvatarSize
  shape?: AvatarShape
  delayMs?: number
  icon?: NormalizeIconProps
  label?: string
}

// Slots
export interface AvatarSlots {
  fallback?(props: Record<string, never>): unknown
}
