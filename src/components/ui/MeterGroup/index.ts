import { cva, type VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'
import type { DataOrientation } from 'reka-ui'
import type { IconConfig } from '@/components/ui/Icon'

export { default as MeterGroup } from './MeterGroup.vue'

export const meterGroupVariants = cva('gap-2', {
  variants: {
    orientation: {
      horizontal: 'grid',
      vertical: 'flex h-48 flex-row justify-center',
    },
    size: {
      '2xs': 'text-xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-sm',
      lg: 'text-sm',
      xl: 'text-base',
      '2xl': 'text-base',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
})

export const meterGroupMeterVariants = cva(
  'relative flex overflow-hidden rounded-full bg-primary/20',
  {
    variants: {
      orientation: {
        horizontal: 'h-2 w-full',
        vertical: 'h-full w-2 flex-col',
      },
      size: {
        '2xs': '',
        xs: '',
        sm: '',
        md: '',
        lg: '',
        xl: '',
        '2xl': '',
      },
    },
    compoundVariants: [
      { orientation: 'horizontal', size: '2xs', class: 'h-px' },
      { orientation: 'horizontal', size: 'xs', class: 'h-0.5' },
      { orientation: 'horizontal', size: 'sm', class: 'h-1' },
      { orientation: 'horizontal', size: 'md', class: 'h-2' },
      { orientation: 'horizontal', size: 'lg', class: 'h-3' },
      { orientation: 'horizontal', size: 'xl', class: 'h-4' },
      { orientation: 'horizontal', size: '2xl', class: 'h-5' },
      { orientation: 'vertical', size: '2xs', class: 'w-px' },
      { orientation: 'vertical', size: 'xs', class: 'w-0.5' },
      { orientation: 'vertical', size: 'sm', class: 'w-1' },
      { orientation: 'vertical', size: 'md', class: 'w-2' },
      { orientation: 'vertical', size: 'lg', class: 'w-3' },
      { orientation: 'vertical', size: 'xl', class: 'w-4' },
      { orientation: 'vertical', size: '2xl', class: 'w-5' },
    ],
    defaultVariants: {
      orientation: 'horizontal',
      size: 'md',
    },
  },
)

export const meterGroupLeadingVariants = cva('shrink-0 rounded-full bg-primary', {
  variants: {
    size: {
      '2xs': 'size-1.5',
      xs: 'size-1.5',
      sm: 'size-2',
      md: 'size-2',
      lg: 'size-2',
      xl: 'size-2.5',
      '2xl': 'size-2.5',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export type MeterGroupVariants = VariantProps<typeof meterGroupVariants>
export type MeterGroupOrientation = NonNullable<MeterGroupVariants['orientation']>
export type MeterGroupSize = NonNullable<MeterGroupVariants['size']>

export interface MeterGroupItem {
  value: number
  label?: string
  color?: string
  icon?: IconConfig
}

export interface MeterGroupProps {
  items?: MeterGroupItem[]
  max?: number
  orientation?: DataOrientation | MeterGroupOrientation
  size?: MeterGroupSize
  status?: boolean
  ui?: MeterGroupUI
}

export interface MeterGroupStatusContext {
  total: number
  percentage: number
}

export interface MeterGroupItemContext {
  index: number
  percentage: number
  item: MeterGroupItem
}

export interface MeterGroupSlots {
  status?(props: MeterGroupStatusContext): unknown
  item?(props: MeterGroupItemContext): unknown
  'item-leading'?(props: MeterGroupItemContext): unknown
  'item-label'?(props: MeterGroupItemContext): unknown
  'item-trailing'?(props: MeterGroupItemContext): unknown
}

export type MeterGroupFn<T, C = undefined> = (context: C) => T

export interface MeterGroupUI {
  status?: MeterGroupFn<HTMLAttributes, MeterGroupStatusContext>
  meter?: MeterGroupFn<HTMLAttributes, MeterGroupStatusContext>
  list?: MeterGroupFn<HTMLAttributes>
  item?: MeterGroupFn<HTMLAttributes, MeterGroupItemContext>
  label?: MeterGroupFn<HTMLAttributes, MeterGroupItemContext>
  leading?: MeterGroupFn<HTMLAttributes, MeterGroupItemContext>
  trailing?: MeterGroupFn<HTMLAttributes, MeterGroupItemContext>
}
