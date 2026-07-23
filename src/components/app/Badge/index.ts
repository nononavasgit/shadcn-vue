import { cva, type VariantProps } from 'class-variance-authority'
import type { PrimitiveProps } from 'reka-ui'
import type { SVGAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/app/Icon'

export { default as Badge } from './Badge.vue'

export const badgeVariants = cva('', {
  variants: {
    size: {
      sm: 'gap-0.5 px-0.5 text-sm [&>svg]:size-2.5',
      md: 'gap-1 px-1 text-base [&>svg]:size-3',
      lg: 'gap-1.5 px-2 text-lg [&>svg]:size-3.5',
    },
    variant: {
      solid: '',
      outlined: 'border bg-transparent',
      plain: 'bg-transparent',
      subtle: 'border',
      soft: '',
    },
    severity: {
      primary: 'focus-visible:border-primary focus-visible:ring-primary/30',
      secondary:
        'focus-visible:border-secondary-foreground focus-visible:ring-secondary-foreground/20',
      warning: 'focus-visible:border-warning focus-visible:ring-warning/30',
      success: 'focus-visible:border-success focus-visible:ring-success/30',
      error: 'focus-visible:border-error focus-visible:ring-error/30',
    },
    color: {
      true: 'focus-visible:border-(--badge-color) focus-visible:ring-(--badge-color)/30',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'solid',
      severity: 'primary',
      class: 'border-transparent bg-primary text-primary-foreground',
    },
    {
      variant: 'outlined',
      severity: 'primary',
      class: 'border-primary/40 text-primary',
    },
    {
      variant: 'plain',
      severity: 'primary',
      class: 'border-transparent text-primary',
    },
    {
      variant: 'subtle',
      severity: 'primary',
      class: 'border-primary/20 bg-primary/10 text-primary',
    },
    {
      variant: 'soft',
      severity: 'primary',
      class: 'border-transparent bg-primary/10 text-primary',
    },
    {
      variant: 'solid',
      severity: 'secondary',
      class: 'border-transparent bg-secondary text-secondary-foreground',
    },
    {
      variant: 'outlined',
      severity: 'secondary',
      class: 'border-secondary-foreground/30 text-secondary-foreground',
    },
    {
      variant: 'plain',
      severity: 'secondary',
      class: 'border-transparent text-secondary-foreground',
    },
    {
      variant: 'subtle',
      severity: 'secondary',
      class: 'border-secondary-foreground/15 bg-secondary/60 text-secondary-foreground',
    },
    {
      variant: 'soft',
      severity: 'secondary',
      class: 'border-transparent bg-secondary/60 text-secondary-foreground',
    },
    {
      variant: 'solid',
      severity: 'warning',
      class: 'border-transparent bg-warning text-warning-foreground',
    },
    {
      variant: 'outlined',
      severity: 'warning',
      class: 'border-warning/40 text-warning',
    },
    {
      variant: 'plain',
      severity: 'warning',
      class: 'border-transparent text-warning',
    },
    {
      variant: 'subtle',
      severity: 'warning',
      class: 'border-warning/20 bg-warning/10 text-warning',
    },
    {
      variant: 'soft',
      severity: 'warning',
      class: 'border-transparent bg-warning/10 text-warning',
    },
    {
      variant: 'solid',
      severity: 'success',
      class: 'border-transparent bg-success text-success-foreground',
    },
    {
      variant: 'outlined',
      severity: 'success',
      class: 'border-success/40 text-success',
    },
    {
      variant: 'plain',
      severity: 'success',
      class: 'border-transparent text-success',
    },
    {
      variant: 'subtle',
      severity: 'success',
      class: 'border-success/20 bg-success/10 text-success',
    },
    {
      variant: 'soft',
      severity: 'success',
      class: 'border-transparent bg-success/10 text-success',
    },
    {
      variant: 'solid',
      severity: 'error',
      class: 'border-transparent bg-error text-error-foreground',
    },
    {
      variant: 'outlined',
      severity: 'error',
      class: 'border-error/40 text-error',
    },
    {
      variant: 'plain',
      severity: 'error',
      class: 'border-transparent text-error',
    },
    {
      variant: 'subtle',
      severity: 'error',
      class: 'border-error/20 bg-error/10 text-error',
    },
    {
      variant: 'soft',
      severity: 'error',
      class: 'border-transparent bg-error/10 text-error',
    },
    {
      color: true,
      variant: 'solid',
      class: 'border-transparent bg-(--badge-color) text-(--badge-color-foreground)',
    },
    {
      color: true,
      variant: 'outlined',
      class: 'border-(--badge-color)/40 bg-transparent text-(--badge-color)',
    },
    {
      color: true,
      variant: 'plain',
      class: 'border-transparent bg-transparent text-(--badge-color)',
    },
    {
      color: true,
      variant: 'subtle',
      class: 'border-(--badge-color)/20 bg-(--badge-color)/10 text-(--badge-color)',
    },
    {
      color: true,
      variant: 'soft',
      class: 'border-transparent bg-(--badge-color)/10 text-(--badge-color)',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'solid',
    severity: 'primary',
    color: false,
  },
})

export type BadgeVariants = VariantProps<typeof badgeVariants>
export type BadgeIcon = IconName | (IconProps & SVGAttributes)

export interface BadgeProps extends PrimitiveProps {
  label?: string
  size?: BadgeVariants['size']
  variant?: BadgeVariants['variant']
  severity?: BadgeVariants['severity']
  color?: string
  icon?: BadgeIcon
  trailingIcon?: BadgeIcon
}
