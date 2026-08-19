import { cva, type VariantProps } from 'class-variance-authority'
import type { ToggleProps as RekaToggleProps } from 'reka-ui'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Toggle } from './Toggle.vue'

export const toggleVariants = cva('', {
  variants: {
    variant: {
      outline: 'border bg-transparent',
      plain: 'bg-transparent',
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
  ],
  defaultVariants: {
    variant: 'outline',
    severity: 'default',
    size: 'md',
    color: false,
  },
})

export type ToggleVariants = VariantProps<typeof toggleVariants>

export type ToggleValue = boolean
export type ToggleState = 'on' | 'off'

// Props
export interface ToggleProps extends Pick<RekaToggleProps, 'disabled'> {
  value?: ToggleValue
  label?: string
  icon?: IconConfig
  trailingIcon?: IconConfig
  variant?: ToggleVariants['variant']
  severity?: ToggleVariants['severity']
  size?: ToggleVariants['size']
  color?: string
}

// Emits
export interface ToggleEmits {
  'update:value': [value: ToggleValue]
  valueChange: [value: ToggleValue]
}

// Context
export interface ToggleContext {
  value: ToggleValue
  state: ToggleState
  pressed: boolean
}

export function createToggleContext(value: ToggleValue): ToggleContext {
  const pressed = value === true

  return {
    value,
    state: pressed ? 'on' : 'off',
    pressed,
  }
}

// Slots
export interface ToggleSlots {
  default?(props: ToggleContext): unknown
  leading?(props: ToggleContext): unknown
  trailing?(props: ToggleContext): unknown
}
