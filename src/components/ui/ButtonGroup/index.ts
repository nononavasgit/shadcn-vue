import { cva, type VariantProps } from 'class-variance-authority'

export { default as ButtonGroup } from './ButtonGroup.vue'

export const buttonGroupVariants = cva(
  'relative flex w-fit items-stretch [&>*]:focus-visible:relative [&>*]:focus-visible:z-10',
  {
    variants: {
      orientation: {
        horizontal:
          'flex-row [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none',
        vertical:
          'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none',
      },
      size: {
        xs: '[&>*]:h-7 [&>*]:px-2.5 [&>*]:text-xs',
        sm: '[&>*]:h-8 [&>*]:px-3 [&>*]:text-sm',
        md: '[&>*]:h-9 [&>*]:px-4 [&>*]:text-base',
        lg: '[&>*]:h-10 [&>*]:px-6 [&>*]:text-lg',
      },
    },
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  },
)

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>
export type ButtonGroupOrientation = NonNullable<ButtonGroupVariants['orientation']>
export type ButtonGroupSize = NonNullable<ButtonGroupVariants['size']>

export interface ButtonGroupProps {
  orientation?: ButtonGroupOrientation
  size?: ButtonGroupSize
}

export interface ButtonGroupContext {
  orientation: ButtonGroupOrientation
  size: ButtonGroupSize
}

export function createButtonGroupContext(props: ButtonGroupProps): ButtonGroupContext {
  return {
    orientation: props.orientation ?? 'horizontal',
    size: props.size ?? 'md',
  }
}

export interface ButtonGroupSlots {
  default?(props: ButtonGroupContext): unknown
}
