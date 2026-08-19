import type { IconName } from './icons.ts'
import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'

export { default as Icon } from './Icon.vue'
export type { IconName } from './icons.ts'

export const iconVariants = cva('shrink-0', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

// Variants
export type IconVariants = VariantProps<typeof iconVariants>
export type IconSize = NonNullable<IconVariants['size']>

// Props
export interface IconProps {
  name: IconName
  size?: IconSize
  color?: string
}

// Normalize

export type IconConfig = IconProps & HTMLAttributes
export type NormalizeIconProps = IconName | IconConfig
