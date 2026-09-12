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
      none: 'rounded-md border-0 bg-transparent shadow-none',
      subtle: 'rounded-md border shadow-xs',
      soft: 'rounded-md border-transparent shadow-none',
    },
    severity: {
      primary: 'focus-within:border-primary focus-within:ring-primary/50',
      secondary:
        'focus-within:border-secondary-foreground focus-within:ring-secondary-foreground/20',
      error: 'focus-within:border-error focus-within:ring-error/30',
      warning: 'focus-within:border-warning focus-within:ring-warning/30',
      success: 'focus-within:border-success focus-within:ring-success/30',
    },
    color: {
      true: 'focus-within:border-(--input-color) focus-within:ring-(--input-color)/30',
      false: '',
    },
    highlight: {
      true: '',
      false: 'border-input',
    },
  },
  compoundVariants: [
    { variant: 'none', class: 'focus-within:border-0 focus-within:ring-0' },
    { variant: 'outline', severity: 'primary', class: 'text-primary' },
    { variant: 'plain', severity: 'primary', class: 'text-primary' },
    { variant: 'subtle', severity: 'primary', class: 'bg-primary/10 text-primary' },
    { variant: 'soft', severity: 'primary', class: 'bg-primary/10 text-primary' },
    { variant: 'outline', severity: 'secondary', class: 'text-secondary-foreground' },
    { variant: 'plain', severity: 'secondary', class: 'text-secondary-foreground' },
    { variant: 'subtle', severity: 'secondary', class: 'bg-secondary/60 text-secondary-foreground' },
    { variant: 'soft', severity: 'secondary', class: 'bg-secondary/60 text-secondary-foreground' },
    { variant: 'outline', severity: 'error', class: 'text-error' },
    { variant: 'plain', severity: 'error', class: 'text-error' },
    { variant: 'subtle', severity: 'error', class: 'bg-error/10 text-error' },
    { variant: 'soft', severity: 'error', class: 'bg-error/10 text-error' },
    { variant: 'outline', severity: 'warning', class: 'text-warning' },
    { variant: 'plain', severity: 'warning', class: 'text-warning' },
    { variant: 'subtle', severity: 'warning', class: 'bg-warning/10 text-warning' },
    { variant: 'soft', severity: 'warning', class: 'bg-warning/10 text-warning' },
    { variant: 'outline', severity: 'success', class: 'text-success' },
    { variant: 'plain', severity: 'success', class: 'text-success' },
    { variant: 'subtle', severity: 'success', class: 'bg-success/10 text-success' },
    { variant: 'soft', severity: 'success', class: 'bg-success/10 text-success' },
    { severity: 'secondary', highlight: true, class: 'border-secondary-foreground/30' },
    { severity: 'error', highlight: true, class: 'border-error/40' },
    { severity: 'warning', highlight: true, class: 'border-warning/40' },
    { severity: 'success', highlight: true, class: 'border-success/40' },
    {
      highlight: true,
      severity: 'primary',
      variant: 'outline',
      class: 'border-primary/40',
    },
    {
      highlight: true,
      severity: 'primary',
      variant: 'plain',
      class: 'border-primary/40',
    },
    {
      highlight: true,
      severity: 'primary',
      variant: 'subtle',
      class: 'border-primary/20',
    },
    {
      highlight: true,
      severity: 'primary',
      variant: 'soft',
      class: 'border-primary/40',
    },
    {
      color: true,
      variant: 'outline',
      class: 'text-(--input-color)',
    },
    {
      color: true,
      variant: 'plain',
      class: 'text-(--input-color)',
    },
    {
      color: true,
      variant: 'subtle',
      class: 'bg-(--input-color)/10 text-(--input-color)',
    },
    {
      color: true,
      variant: 'soft',
      class: 'bg-(--input-color)/10 text-(--input-color)',
    },
    {
      color: true,
      highlight: true,
      variant: 'outline',
      class: 'border-(--input-color)/40',
    },
    {
      color: true,
      highlight: true,
      variant: 'plain',
      class: 'border-(--input-color)/40',
    },
    {
      color: true,
      highlight: true,
      variant: 'subtle',
      class: 'border-(--input-color)/20',
    },
    {
      color: true,
      highlight: true,
      variant: 'soft',
      class: 'border-(--input-color)/40',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'outline',
    severity: 'primary',
    color: false,
    highlight: false,
  },
})

export type InputVariants = VariantProps<typeof inputVariants>
export type InputSize = NonNullable<InputVariants['size']>
export type InputVariant = NonNullable<InputVariants['variant']>
export type InputSeverity = NonNullable<InputVariants['severity']>

export type InputValue = string

// Props
export interface InputProps {
  value?: InputValue
  size?: InputSize
  variant?: InputVariant
  severity?: InputSeverity
  color?: string
  highlight?: boolean
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
