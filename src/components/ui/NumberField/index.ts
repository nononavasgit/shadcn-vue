import { cva, type VariantProps } from 'class-variance-authority'
import type { NumberFieldRootProps as RekaNumberFieldRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { IconConfig } from '@/components/ui/Icon'

export { default as NumberField } from './NumberField.vue'
export { numberFieldDefaults } from './defaults'

export type NumberFieldValue = RekaNumberFieldRootProps['modelValue']

export const numberFieldVariants = cva('mt-1 flex items-center focus-within:ring-3', {
  variants: {
    size: {
      xs: 'h-7 text-sm',
      sm: 'h-8 text-sm',
      md: 'h-9 text-base',
      lg: 'h-10 text-lg',
      xl: 'h-11 text-xl',
    },
    variant: {
      outline: 'rounded-lg border bg-white shadow-sm',
      plain: 'rounded-lg border-transparent bg-transparent shadow-none',
      subtle: 'rounded-lg border shadow-sm',
      soft: 'rounded-lg border-transparent shadow-none',
    },
    severity: {
      primary: 'focus-within:border-primary focus-within:ring-primary/50',
      secondary:
        'focus-within:border-secondary-foreground focus-within:ring-secondary-foreground/20',
      warning: 'focus-within:border-warning focus-within:ring-warning/30',
      success: 'focus-within:border-success focus-within:ring-success/30',
      error: 'focus-within:border-error focus-within:ring-error/30',
    },
    color: {
      true: 'focus-within:border-(--number-field-color) focus-within:ring-(--number-field-color)/30',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      severity: 'primary',
      class:
        'border-primary/40 text-primary hover:bg-primary/10 active:border-primary/60 active:bg-primary/20',
    },
    {
      variant: 'plain',
      severity: 'primary',
      class: 'text-primary hover:bg-primary/10 active:bg-primary/20',
    },
    {
      variant: 'subtle',
      severity: 'primary',
      class:
        'border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 active:bg-primary/25',
    },
    {
      variant: 'soft',
      severity: 'primary',
      class: 'bg-primary/10 text-primary hover:bg-primary/20 active:bg-primary/30',
    },
    {
      variant: 'outline',
      severity: 'secondary',
      class:
        'border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary active:bg-secondary/70',
    },
    {
      variant: 'plain',
      severity: 'secondary',
      class: 'text-secondary-foreground hover:bg-secondary active:bg-secondary/70',
    },
    {
      variant: 'subtle',
      severity: 'secondary',
      class:
        'border-secondary-foreground/15 bg-secondary/60 text-secondary-foreground hover:bg-secondary/80 active:bg-secondary',
    },
    {
      variant: 'soft',
      severity: 'secondary',
      class: 'bg-secondary/60 text-secondary-foreground hover:bg-secondary/80 active:bg-secondary',
    },
    {
      variant: 'outline',
      severity: 'warning',
      class:
        'border-warning/40 text-warning hover:bg-warning/10 active:border-warning/60 active:bg-warning/20',
    },
    {
      variant: 'plain',
      severity: 'warning',
      class: 'text-warning hover:bg-warning/10 active:bg-warning/20',
    },
    {
      variant: 'subtle',
      severity: 'warning',
      class:
        'border-warning/20 bg-warning/10 text-warning hover:bg-warning/15 active:bg-warning/25',
    },
    {
      variant: 'soft',
      severity: 'warning',
      class: 'bg-warning/10 text-warning hover:bg-warning/20 active:bg-warning/30',
    },
    {
      variant: 'outline',
      severity: 'success',
      class:
        'border-success/40 text-success hover:bg-success/10 active:border-success/60 active:bg-success/20',
    },
    {
      variant: 'plain',
      severity: 'success',
      class: 'text-success hover:bg-success/10 active:bg-success/20',
    },
    {
      variant: 'subtle',
      severity: 'success',
      class:
        'border-success/20 bg-success/10 text-success hover:bg-success/15 active:bg-success/25',
    },
    {
      variant: 'soft',
      severity: 'success',
      class: 'bg-success/10 text-success hover:bg-success/20 active:bg-success/30',
    },
    {
      variant: 'outline',
      severity: 'error',
      class:
        'border-error/40 text-error hover:bg-error/10 active:border-error/60 active:bg-error/20',
    },
    {
      variant: 'plain',
      severity: 'error',
      class: 'text-error hover:bg-error/10 active:bg-error/20',
    },
    {
      variant: 'subtle',
      severity: 'error',
      class: 'border-error/20 bg-error/10 text-error hover:bg-error/15 active:bg-error/25',
    },
    {
      variant: 'soft',
      severity: 'error',
      class: 'bg-error/10 text-error hover:bg-error/20 active:bg-error/30',
    },
    {
      color: true,
      variant: 'outline',
      class:
        'border-(--number-field-color)/40 text-(--number-field-color) hover:bg-(--number-field-color)/10 active:border-(--number-field-color)/60 active:bg-(--number-field-color)/20',
    },
    {
      color: true,
      variant: 'plain',
      class:
        'text-(--number-field-color) hover:bg-(--number-field-color)/10 active:bg-(--number-field-color)/20',
    },
    {
      color: true,
      variant: 'subtle',
      class:
        'border-(--number-field-color)/20 bg-(--number-field-color)/10 text-(--number-field-color) hover:bg-(--number-field-color)/15 active:bg-(--number-field-color)/25',
    },
    {
      color: true,
      variant: 'soft',
      class:
        'bg-(--number-field-color)/10 text-(--number-field-color) hover:bg-(--number-field-color)/20 active:bg-(--number-field-color)/30',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'outline',
    severity: 'primary',
    color: false,
  },
})

export const numberFieldControlVariants = cva('disabled:opacity-20', {
  variants: {
    size: {
      xs: 'p-1',
      sm: 'p-1.5',
      md: 'p-2',
      lg: 'p-2',
      xl: 'p-2.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const numberFieldInputVariants = cva(
  'w-20 bg-transparent text-center text-foreground tabular-nums focus:outline-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        xs: 'p-0.5',
        sm: 'p-0.5',
        md: 'p-1',
        lg: 'p-1.5',
        xl: 'p-1.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
)

export type NumberFieldVariants = VariantProps<typeof numberFieldVariants>
export type NumberFieldSize = NonNullable<NumberFieldVariants['size']>
export type NumberFieldVariant = NonNullable<NumberFieldVariants['variant']>
export type NumberFieldSeverity = NonNullable<NumberFieldVariants['severity']>

export type NumberFieldFn<T> = () => T

export interface NumberFieldUI {
  input?: NumberFieldFn<HTMLAttributes>
  increment?: NumberFieldFn<HTMLAttributes>
  decrement?: NumberFieldFn<HTMLAttributes>
}

export interface NumberFieldProps extends Pick<
  RekaNumberFieldRootProps,
  | 'min'
  | 'max'
  | 'disabled'
  | 'disableWheelChange'
  | 'focusOnChange'
  | 'formatOptions'
  | 'id'
  | 'locale'
  | 'name'
  | 'readonly'
  | 'required'
  | 'step'
  | 'stepSnapping'
> {
  size?: NumberFieldSize
  variant?: NumberFieldVariant
  severity?: NumberFieldSeverity
  color?: string
  increment?: boolean
  decrement?: boolean
  iconDecrement?: IconConfig
  iconIncrement?: IconConfig
  ui?: NumberFieldUI
}

export interface NumberFieldSlots {
  decrement?(): unknown
  increment?(): unknown
}
