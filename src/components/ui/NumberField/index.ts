import { cva, type VariantProps } from 'class-variance-authority'
import type { NumberFieldRootProps as RekaNumberFieldRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import type { IconConfig } from '@/components/ui/Icon'

export { default as NumberField } from './NumberField.vue'
export { numberFieldDefaults } from './defaults'

export type NumberFieldValue = RekaNumberFieldRootProps['modelValue']

export const numberFieldVariants = cva(
  'mt-1 flex items-center rounded-lg border bg-white shadow-sm focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/50 hover:bg-stone-50',
  {
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
  },
)

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
  'w-20 bg-transparent text-center tabular-nums focus:outline-0',
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
  iconDecrement?: IconConfig
  iconIncrement?: IconConfig
  ui?: NumberFieldUI
}

export interface NumberFieldSlots {
  decrement?(): unknown
  increment?(): unknown
}
