import type { IconName } from './icons.ts'
import { cva, type VariantProps } from 'class-variance-authority'
import { HTMLAttributes, toValue } from 'vue'

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

// Variants
export type IconVariants = VariantProps<typeof iconVariants>

// Fn
export type IconFn<T> = T | ((context: IconContext) => T)

// Props
export interface IconProps {
  name: IconName
  size?: IconVariants['size']
  color?: string
  ui?: IconUI
}

// UI
export interface IconUI {
  root?: IconFn<HTMLAttributes>
}

// Context
export interface IconContext {
  props: Omit<IconProps, 'ui'>
}

export function normalizeIconProps(
  source: IconProps | string | null | undefined | IconName,
): IconProps | undefined {
  const res = toValue(source)

  if (!res) return undefined
  if (typeof res === 'string') return { name: res as IconName }
  if (typeof res === 'object')
    return {
      name: res?.name,
      size: res?.size,
      color: res?.color,
      ui: res?.ui,
    }
  return undefined
}
