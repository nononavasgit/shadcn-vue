import type { ButtonHTMLAttributes, Component, HTMLAttributes } from 'vue'
import type { AcceptableValue } from 'reka-ui'
import type { NormalizedIconProps, NormalizeIconProps } from '@/components/app/Icon'
import type { ToggleVariants } from '@/components/app/Toggle'

export { default as ToggleGroup } from './ToggleGroup.vue'

export type ToggleGroupValue = AcceptableValue

export interface ToggleGroupItem {
  id: string | number
  value: ToggleGroupValue
  label?: string
  icon?: NormalizeIconProps
  trailingIcon?: NormalizeIconProps
  disabled?: boolean
}

// Context
export interface ToggleGroupUIContext {
  item: ToggleGroupItem
  index: number
  selected: boolean
  first: boolean
  last: boolean
}

export type ToggleGroupUIValue<T> = T | ((context: ToggleGroupUIContext) => T)

export type ToggleGroupItemUI = Omit<ButtonHTMLAttributes, 'value'> & {
  as?: string | Component
  asChild?: boolean
}

// UI
export interface ToggleGroupUI {
  item?: ToggleGroupUIValue<ToggleGroupItemUI>
  icon?: ToggleGroupUIValue<NormalizedIconProps>
  label?: ToggleGroupUIValue<HTMLAttributes>
  trailingIcon?: ToggleGroupUIValue<NormalizedIconProps>
}

// Props
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

// Emits
export interface ToggleGroupEmits {
  'update:modelValue': [value: ToggleGroupValue | ToggleGroupValue[] | undefined]
}

// SlotProps
export type ToggleGroupSlotProps = ToggleGroupUIContext

// Slots
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
