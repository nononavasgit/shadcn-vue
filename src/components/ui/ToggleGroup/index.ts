import type { HTMLAttributes } from 'vue'
import type {
  ToggleGroupItemProps as RekaToggleGroupItemProps,
  ToggleGroupRootEmits as RekaToggleGroupRootEmits,
  ToggleGroupRootProps as RekaToggleGroupRootProps,
} from 'reka-ui'
import type { NormalizeIconProps } from '@/components/ui/Icon'
import type { ToggleVariants } from '@/components/ui/Toggle'
import type { EmitsAsProps } from '@/types/emits'

export { default as ToggleGroup } from './ToggleGroup.vue'

export type ToggleGroupValue = string | number | bigint | Record<string, unknown> | null
export type ToggleGroupModelValue = ToggleGroupValue | ToggleGroupValue[] | undefined

// Props Reka
export type ToggleGroupRootProps = Pick<
  RekaToggleGroupRootProps<ToggleGroupModelValue>,
  | 'as'
  | 'asChild'
  | 'name'
  | 'required'
  | 'type'
  | 'modelValue'
  | 'defaultValue'
  | 'dir'
  | 'loop'
  | 'rovingFocus'
  | 'disabled'
  | 'orientation'
>

export type ToggleGroupItemProps = Pick<
  RekaToggleGroupItemProps,
  'as' | 'asChild' | 'value' | 'disabled'
>

export function normalizeToggleGroupItemProps(source: ToggleGroupItemProps): ToggleGroupItemProps {
  const { as, asChild, value, disabled } = source
  return { as, asChild, value, disabled }
}

// Item
export interface ToggleGroupItem extends ToggleGroupItemProps {
  id: string | number
  label?: string
  icon?: NormalizeIconProps
  trailingIcon?: NormalizeIconProps
}

// Props
export interface ToggleGroupProps extends ToggleGroupRootProps {
  variant?: ToggleVariants['variant']
  severity?: ToggleVariants['severity']
  size?: ToggleVariants['size']
  color?: string
  spacing?: number
  mandatory?: boolean
  items?: ToggleGroupItem[]
  ui?: ToggleGroupUI
}

// Fn
export type ToggleGroupFn<T> = T | ((context: ToggleGroupContext) => T)
export type ToggleGroupItemFn<T> = T | ((context: ToggleGroupItemContext) => T)

// UI
export interface ToggleGroupUI {
  root?: ToggleGroupFn<HTMLAttributes>
  item?: ToggleGroupItemFn<HTMLAttributes>
  label?: ToggleGroupItemFn<HTMLAttributes>
}

// Context
export interface ToggleGroupContext {
  props: Omit<ToggleGroupProps, 'ui'>
  value: ToggleGroupModelValue
}

export interface ToggleGroupItemContext extends ToggleGroupContext {
  item: ToggleGroupItem
  index: number
  selected: boolean
  first: boolean
  last: boolean
}

// Emits
export type ToggleGroupEmits = RekaToggleGroupRootEmits

// Slots
export type ToggleGroupSlots = {
  default?(props: ToggleGroupContext): unknown
  item?(props: ToggleGroupItemContext): unknown
  leading?(props: ToggleGroupItemContext): unknown
  label?(props: ToggleGroupItemContext): unknown
  trailing?(props: ToggleGroupItemContext): unknown
} & {
  [name: `item-${string}`]: ((props: ToggleGroupItemContext) => unknown) | undefined
  [name: `leading-${string}`]: ((props: ToggleGroupItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: ToggleGroupItemContext) => unknown) | undefined
  [name: `trailing-${string}`]: ((props: ToggleGroupItemContext) => unknown) | undefined
}

// Normalize
export type NormalizeToggleGroupProps = ToggleGroupProps & EmitsAsProps<ToggleGroupEmits>

export function normalizeToggleGroupProps(
  source: NormalizeToggleGroupProps | null | undefined,
): NormalizeToggleGroupProps | undefined {
  if (!source) return undefined

  const {
    as,
    asChild,
    name,
    required,
    type,
    modelValue,
    defaultValue,
    dir,
    loop,
    rovingFocus,
    disabled,
    orientation,
    variant,
    severity,
    size,
    color,
    spacing,
    mandatory,
    items,
    ui,
    'onUpdate:modelValue': onUpdateModelValue,
  } = source

  return {
    as,
    asChild,
    name,
    required,
    type,
    modelValue,
    defaultValue,
    dir,
    loop,
    rovingFocus,
    disabled,
    orientation,
    variant,
    severity,
    size,
    color,
    spacing,
    mandatory,
    items,
    ui,
    'onUpdate:modelValue': onUpdateModelValue,
  }
}
