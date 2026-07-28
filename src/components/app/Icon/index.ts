import type { IconName } from './icons.ts'
import { cva, type VariantProps } from 'class-variance-authority'

export { default as Icon } from './Icon.vue'
export type { IconName } from './icons.ts'

export const iconVariants = cva('shrink-0', {
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type IconVariants = VariantProps<typeof iconVariants>

export interface IconProps {
  name: IconName
  size?: IconVariants['size']
  color?: string
}
