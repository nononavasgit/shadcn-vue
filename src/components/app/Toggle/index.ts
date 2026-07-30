import { cva, type VariantProps } from 'class-variance-authority'
import type { Component } from 'vue'
import type { NormalizedIconProps, NormalizeIconProps } from '@/components/app/Icon'

export { default as Toggle } from './Toggle.vue'

export const toggleVariants = cva('', {
  variants: {
    variant: {
      solid: '',
      outline: 'border bg-transparent',
      plain: 'bg-transparent',
      subtle: 'border',
      soft: '',
    },
    severity: {
      default: 'focus-visible:border-ring focus-visible:ring-ring/50',
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
    color: {
      true: 'focus-visible:border-(--toggle-color) focus-visible:ring-(--toggle-color)/30',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      severity: 'default',
      class: 'bg-accent text-accent-foreground hover:bg-accent/80 data-[state=on]:bg-accent/70',
    },
    {
      variant: 'outline',
      severity: 'default',
      class:
        'border-input bg-transparent hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
    },
    {
      variant: 'plain',
      severity: 'default',
      class:
        'bg-transparent hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
    },
    {
      variant: 'subtle',
      severity: 'default',
      class:
        'border-input bg-muted/50 text-foreground hover:bg-muted data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
    },
    {
      variant: 'soft',
      severity: 'default',
      class:
        'bg-muted text-muted-foreground hover:bg-muted/80 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
    },
    {
      variant: 'solid',
      severity: 'primary',
      class: 'bg-primary text-primary-foreground hover:bg-primary/90 data-[state=on]:bg-primary/75',
    },
    {
      variant: 'outline',
      severity: 'primary',
      class:
        'border-primary/40 text-primary hover:bg-primary/10 data-[state=on]:border-primary/60 data-[state=on]:bg-primary/20',
    },
    {
      variant: 'plain',
      severity: 'primary',
      class: 'text-primary hover:bg-primary/10 data-[state=on]:bg-primary/20',
    },
    {
      variant: 'subtle',
      severity: 'primary',
      class:
        'border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 data-[state=on]:bg-primary/25',
    },
    {
      variant: 'soft',
      severity: 'primary',
      class: 'bg-primary/10 text-primary hover:bg-primary/20 data-[state=on]:bg-primary/30',
    },
    {
      variant: 'solid',
      severity: 'secondary',
      class:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 data-[state=on]:bg-secondary/70',
    },
    {
      variant: 'outline',
      severity: 'secondary',
      class:
        'border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary data-[state=on]:border-secondary-foreground/50 data-[state=on]:bg-secondary/70',
    },
    {
      variant: 'plain',
      severity: 'secondary',
      class: 'text-secondary-foreground hover:bg-secondary data-[state=on]:bg-secondary/70',
    },
    {
      variant: 'subtle',
      severity: 'secondary',
      class:
        'border-secondary-foreground/15 bg-secondary/60 text-secondary-foreground hover:bg-secondary/80 data-[state=on]:bg-secondary',
    },
    {
      variant: 'soft',
      severity: 'secondary',
      class:
        'bg-secondary/60 text-secondary-foreground hover:bg-secondary/80 data-[state=on]:bg-secondary',
    },
    {
      variant: 'solid',
      severity: 'warning',
      class: 'bg-warning text-warning-foreground hover:bg-warning/90 data-[state=on]:bg-warning/75',
    },
    {
      variant: 'outline',
      severity: 'warning',
      class:
        'border-warning/40 text-warning hover:bg-warning/10 data-[state=on]:border-warning/60 data-[state=on]:bg-warning/20',
    },
    {
      variant: 'plain',
      severity: 'warning',
      class: 'text-warning hover:bg-warning/10 data-[state=on]:bg-warning/20',
    },
    {
      variant: 'subtle',
      severity: 'warning',
      class:
        'border-warning/20 bg-warning/10 text-warning hover:bg-warning/15 data-[state=on]:bg-warning/25',
    },
    {
      variant: 'soft',
      severity: 'warning',
      class: 'bg-warning/10 text-warning hover:bg-warning/20 data-[state=on]:bg-warning/30',
    },
    {
      variant: 'solid',
      severity: 'success',
      class: 'bg-success text-success-foreground hover:bg-success/90 data-[state=on]:bg-success/75',
    },
    {
      variant: 'outline',
      severity: 'success',
      class:
        'border-success/40 text-success hover:bg-success/10 data-[state=on]:border-success/60 data-[state=on]:bg-success/20',
    },
    {
      variant: 'plain',
      severity: 'success',
      class: 'text-success hover:bg-success/10 data-[state=on]:bg-success/20',
    },
    {
      variant: 'subtle',
      severity: 'success',
      class:
        'border-success/20 bg-success/10 text-success hover:bg-success/15 data-[state=on]:bg-success/25',
    },
    {
      variant: 'soft',
      severity: 'success',
      class: 'bg-success/10 text-success hover:bg-success/20 data-[state=on]:bg-success/30',
    },
    {
      variant: 'solid',
      severity: 'error',
      class: 'bg-error text-error-foreground hover:bg-error/90 data-[state=on]:bg-error/75',
    },
    {
      variant: 'outline',
      severity: 'error',
      class:
        'border-error/40 text-error hover:bg-error/10 data-[state=on]:border-error/60 data-[state=on]:bg-error/20',
    },
    {
      variant: 'plain',
      severity: 'error',
      class: 'text-error hover:bg-error/10 data-[state=on]:bg-error/20',
    },
    {
      variant: 'subtle',
      severity: 'error',
      class: 'border-error/20 bg-error/10 text-error hover:bg-error/15 data-[state=on]:bg-error/25',
    },
    {
      variant: 'soft',
      severity: 'error',
      class: 'bg-error/10 text-error hover:bg-error/20 data-[state=on]:bg-error/30',
    },
    {
      color: true,
      variant: 'solid',
      class:
        'bg-(--toggle-color) text-(--toggle-color-foreground) hover:bg-(--toggle-color)/90 data-[state=on]:bg-(--toggle-color)/75',
    },
    {
      color: true,
      variant: 'outline',
      class:
        'border-(--toggle-color)/40 text-(--toggle-color) hover:bg-(--toggle-color)/10 data-[state=on]:border-(--toggle-color)/60 data-[state=on]:bg-(--toggle-color)/20',
    },
    {
      color: true,
      variant: 'plain',
      class:
        'text-(--toggle-color) hover:bg-(--toggle-color)/10 data-[state=on]:bg-(--toggle-color)/20',
    },
    {
      color: true,
      variant: 'subtle',
      class:
        'border-(--toggle-color)/20 bg-(--toggle-color)/10 text-(--toggle-color) hover:bg-(--toggle-color)/15 data-[state=on]:bg-(--toggle-color)/25',
    },
    {
      color: true,
      variant: 'soft',
      class:
        'bg-(--toggle-color)/10 text-(--toggle-color) hover:bg-(--toggle-color)/20 data-[state=on]:bg-(--toggle-color)/30',
    },
  ],
  defaultVariants: {
    variant: 'plain',
    severity: 'default',
    size: 'md',
    color: false,
  },
})

export type ToggleVariants = VariantProps<typeof toggleVariants>

export interface ToggleUI {
  icon?: NormalizedIconProps
  trailingIcon?: NormalizedIconProps
}

export interface ToggleProps {
  modelValue?: boolean | null
  defaultValue?: boolean
  as?: string | Component
  asChild?: boolean
  label?: string
  icon?: NormalizeIconProps
  trailingIcon?: NormalizeIconProps
  variant?: ToggleVariants['variant']
  severity?: ToggleVariants['severity']
  size?: ToggleVariants['size']
  color?: string
  ui?: ToggleUI
}

export interface ToggleEmits {
  'update:modelValue': [value: boolean]
}

export interface ToggleSlotProps {
  modelValue: boolean
  state: 'on' | 'off'
  pressed: boolean
  disabled: boolean
}

export interface ToggleSlots {
  default?(props: ToggleSlotProps): unknown
  leading?(props: ToggleSlotProps): unknown
  trailing?(props: ToggleSlotProps): unknown
}
