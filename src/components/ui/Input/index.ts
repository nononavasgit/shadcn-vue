import { cva, type VariantProps } from 'class-variance-authority'
import type { EmitsAsProps } from '@/types/emits'

export { default as Input } from './Input.vue'
export { inputDefaults } from './default'

export const inputVariants = cva('', {
  variants: {
    size: {
      xs: 'h-7 text-sm',
      sm: 'h-8 text-sm',
      md: 'h-9 text-base',
      lg: 'h-10 text-lg',
      xl: 'h-11 text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type InputVariants = VariantProps<typeof inputVariants>
export type InputSize = NonNullable<InputVariants['size']>

export type InputValue = string

// Props
export interface InputProps {
  value?: InputValue
  size?: InputSize
}

// Emits
export interface InputEmits {
  'update:value': [value: InputValue]
}

// Slots
export interface InputSlots {
  leading?(): unknown
  trailing?(): unknown
}

// Normalize
export type NormalizeInputProps = InputProps & EmitsAsProps<InputEmits>
