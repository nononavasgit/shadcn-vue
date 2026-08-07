import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { NormalizeIconProps } from '@/components/ui/Icon'
import type { PrimitiveProps } from 'reka-ui'

export { default as Button } from './Button.vue'

export const buttonVariants = cva('', {
  variants: {
    variant: {
      solid: '',
      outline: 'border bg-transparent',
      plain: 'bg-transparent',
      subtle: 'border',
      soft: '',
      link: 'bg-transparent underline underline-offset-4 hover:no-underline',
    },
    severity: {
      primary: 'focus-visible:border-primary focus-visible:ring-primary/30',
      secondary:
        'focus-visible:border-secondary-foreground focus-visible:ring-secondary-foreground/20',
      warning: 'focus-visible:border-warning focus-visible:ring-warning/30',
      success: 'focus-visible:border-success focus-visible:ring-success/30',
      error: 'focus-visible:border-error focus-visible:ring-error/30',
    },
    size: {
      xs: 'h-7 gap-1 px-2.5 text-xs has-[>svg]:px-2',
      sm: 'h-8 gap-1.5 px-3 text-sm has-[>svg]:px-2.5',
      md: 'h-9 px-4 py-2 text-base has-[>svg]:px-3',
      lg: 'h-10 px-6 text-lg has-[>svg]:px-4',
    },
    rounded: {
      true: 'rounded-full',
      false: '',
    },
    square: {
      true: '',
      false: '',
    },
    color: {
      true: 'focus-visible:border-(--button-color) focus-visible:ring-(--button-color)/30',
      false: '',
    },
  },
  compoundVariants: [
    { square: true, size: 'xs', class: 'size-7 p-0' },
    { square: true, size: 'sm', class: 'size-8 p-0' },
    { square: true, size: 'md', class: 'size-9 p-0' },
    { square: true, size: 'lg', class: 'size-10 p-0' },
    {
      variant: 'solid',
      severity: 'primary',
      class: 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80',
    },
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
      variant: 'link',
      severity: 'primary',
      class: 'text-primary',
    },
    {
      variant: 'solid',
      severity: 'secondary',
      class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/70',
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
      variant: 'link',
      severity: 'secondary',
      class: 'text-secondary-foreground',
    },
    {
      variant: 'solid',
      severity: 'warning',
      class: 'bg-warning text-warning-foreground hover:bg-warning/90 active:bg-warning/80',
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
      variant: 'link',
      severity: 'warning',
      class: 'text-warning',
    },
    {
      variant: 'solid',
      severity: 'success',
      class: 'bg-success text-success-foreground hover:bg-success/90 active:bg-success/80',
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
      variant: 'link',
      severity: 'success',
      class: 'text-success',
    },
    {
      variant: 'solid',
      severity: 'error',
      class: 'bg-error text-error-foreground hover:bg-error/90 active:bg-error/80',
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
      variant: 'link',
      severity: 'error',
      class: 'text-error',
    },
    {
      color: true,
      variant: 'solid',
      class:
        'bg-(--button-color) text-(--button-color-foreground) hover:bg-(--button-color)/90 active:bg-(--button-color)/80',
    },
    {
      color: true,
      variant: 'outline',
      class:
        'border-(--button-color)/40 text-(--button-color) hover:bg-(--button-color)/10 active:border-(--button-color)/60 active:bg-(--button-color)/20',
    },
    {
      color: true,
      variant: 'plain',
      class: 'text-(--button-color) hover:bg-(--button-color)/10 active:bg-(--button-color)/20',
    },
    {
      color: true,
      variant: 'subtle',
      class:
        'border-(--button-color)/20 bg-(--button-color)/10 text-(--button-color) hover:bg-(--button-color)/15 active:bg-(--button-color)/25',
    },
    {
      color: true,
      variant: 'soft',
      class:
        'bg-(--button-color)/10 text-(--button-color) hover:bg-(--button-color)/20 active:bg-(--button-color)/30',
    },
    {
      color: true,
      variant: 'link',
      class: 'text-(--button-color)',
    },
  ],
  defaultVariants: {
    variant: 'solid',
    severity: 'primary',
    size: 'md',
    rounded: false,
    square: false,
    color: false,
  },
})

// Variants
export type ButtonVariants = VariantProps<typeof buttonVariants>

// Fn
export type ButtonFn<T> = T | ((context: ButtonContext) => T)

// Props
export interface ButtonProps extends Pick<PrimitiveProps, 'as' | 'asChild'> {
  label?: string
  variant?: ButtonVariants['variant']
  severity?: ButtonVariants['severity']
  size?: ButtonVariants['size']
  rounded?: ButtonVariants['rounded'] | boolean
  square?: ButtonVariants['square'] | boolean
  loading?: boolean
  color?: string
  icon?: NormalizeIconProps
  trailingIcon?: NormalizeIconProps
  ui?: ButtonUI
}

// UI
export interface ButtonUI {
  root?: ButtonFn<HTMLAttributes>
  icon?: ButtonFn<HTMLAttributes>
  trailingIcon?: ButtonFn<HTMLAttributes>
  loadingIcon?: ButtonFn<HTMLAttributes>
}

// Context
export interface ButtonContext {
  props: Omit<ButtonProps, 'ui' | 'icon' | 'trailingIcon'>
}

// Emits
export interface ButtonEmits {
  click: [event: PointerEvent]
}

// Slots
export interface ButtonSlots {
  default?(props: ButtonContext): unknown
  leading?(props: ButtonContext): unknown
  loading?(props: ButtonContext): unknown
  trailing?(props: ButtonContext): unknown
}

export function normalizeButtonProps(
  source: ButtonProps | null | undefined,
): ButtonProps | undefined {
  if (!source) return undefined

  return {
    as: source.as,
    asChild: source.asChild,
    label: source.label,
    variant: source.variant,
    severity: source.severity,
    size: source.size,
    rounded: source.rounded,
    square: source.square,
    loading: source.loading,
    color: source.color,
    icon: source.icon,
    trailingIcon: source.trailingIcon,
    ui: source.ui,
  }
}
