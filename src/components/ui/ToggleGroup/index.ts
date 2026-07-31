import type { Component, HTMLAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/ui/Icon'
import type { ToggleVariants } from '@/components/ui/Toggle'

export { default as ToggleGroup } from './ToggleGroup.vue'

export type ToggleGroupValue = string | number | bigint | Record<string, unknown> | null

export interface ToggleGroupItem {
  id: string | number
  value: ToggleGroupValue
  label?: string
  icon?: IconName | IconProps
  trailingIcon?: IconName | IconProps
  disabled?: boolean
  as?: string | Component
  asChild?: boolean
}

export interface ToggleGroupUIContext {
  item: ToggleGroupItem
  index: number
  selected: boolean
  first: boolean
  last: boolean
}

export type ToggleGroupUIValue<T> = T | ((context: ToggleGroupUIContext) => T)

export interface ToggleGroupUI {
  root?: HTMLAttributes
  item?: ToggleGroupUIValue<HTMLAttributes>
  icon?: ToggleGroupUIValue<HTMLAttributes>
  label?: ToggleGroupUIValue<HTMLAttributes>
  trailingIcon?: ToggleGroupUIValue<HTMLAttributes>
}

export interface ToggleGroupProps {
  modelValue?: ToggleGroupValue | ToggleGroupValue[]
  defaultValue?: ToggleGroupValue | ToggleGroupValue[]
  type?: 'single' | 'multiple'
  rovingFocus?: boolean
  orientation?: 'horizontal' | 'vertical'
  dir?: 'ltr' | 'rtl'
  loop?: boolean
  as?: string | Component
  asChild?: boolean
  variant?: ToggleVariants['variant']
  severity?: ToggleVariants['severity']
  size?: ToggleVariants['size']
  color?: string
  spacing?: number
  mandatory?: boolean
  items?: ToggleGroupItem[]
  ui?: ToggleGroupUI
}

export interface ToggleGroupEmits {
  'update:modelValue': [value: ToggleGroupValue | ToggleGroupValue[] | undefined]
}

export type ToggleGroupSlotProps = ToggleGroupUIContext

export type ToggleGroupSlots = {
  default?(props: { modelValue: ToggleGroupValue | ToggleGroupValue[] | undefined }): unknown
  item?(props: ToggleGroupSlotProps): unknown
  leading?(props: ToggleGroupSlotProps): unknown
  trailing?(props: ToggleGroupSlotProps): unknown
} & {
  [name: `item-${string}`]: ((props: ToggleGroupSlotProps) => unknown) | undefined
  [name: `leading-${string}`]: ((props: ToggleGroupSlotProps) => unknown) | undefined
  [name: `trailing-${string}`]: ((props: ToggleGroupSlotProps) => unknown) | undefined
}
