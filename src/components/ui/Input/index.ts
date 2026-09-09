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
    variant: {
      outline: 'rounded-md border bg-transparent shadow-xs',
      plain: 'rounded-md border-transparent bg-transparent shadow-none',
      subtle: 'rounded-md border shadow-xs',
      soft: 'rounded-md border-transparent shadow-none',
    },
    color: {
      true: 'focus-within:border-(--input-color) focus-within:ring-(--input-color)/30',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      class:
        'border-primary/40 text-primary hover:bg-primary/10 active:border-primary/60 active:bg-primary/20',
    },
    {
      variant: 'plain',
      class: 'text-primary hover:bg-primary/10 active:bg-primary/20',
    },
    {
      variant: 'subtle',
      class:
        'border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 active:bg-primary/25',
    },
    {
      variant: 'soft',
      class: 'bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30',
    },
    {
      color: true,
      variant: 'outline',
      class:
        'border-(--input-color)/40 text-(--input-color) hover:bg-(--input-color)/10 active:border-(--input-color)/60 active:bg-(--input-color)/20',
    },
    {
      color: true,
      variant: 'plain',
      class: 'text-(--input-color) hover:bg-(--input-color)/10 active:bg-(--input-color)/20',
    },
    {
      color: true,
      variant: 'subtle',
      class:
        'border-(--input-color)/20 bg-(--input-color)/10 text-(--input-color) hover:bg-(--input-color)/15 active:bg-(--input-color)/25',
    },
    {
      color: true,
      variant: 'soft',
      class:
        'bg-(--input-color)/10 text-(--input-color) hover:bg-(--input-color)/20 active:bg-(--input-color)/30',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'outline',
    color: false,
  },
})

export type InputVariants = VariantProps<typeof inputVariants>
export type InputSize = NonNullable<InputVariants['size']>
export type InputVariant = NonNullable<InputVariants['variant']>

export type InputValue = string

// Props
export interface InputProps {
  value?: InputValue
  size?: InputSize
  variant?: InputVariant
  color?: string
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
