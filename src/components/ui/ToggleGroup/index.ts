import type { HTMLAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/ui/Icon'
import type { ToggleVariants } from '@/components/ui/Toggle'
import type {
  ToggleGroupItemProps as RekaToggleGroupItemProps,
  ToggleGroupRootEmits,
  ToggleGroupRootProps,
} from 'reka-ui'

export { default as ToggleGroup } from './ToggleGroup.vue'

export type ToggleGroupValue = string | number | bigint | Record<string, unknown> | null

export interface ToggleGroupItem extends RekaToggleGroupItemProps {
  id: string | number
  label?: string
  icon?: IconName | IconProps
  trailingIcon?: IconName | IconProps
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

export interface ToggleGroupProps extends ToggleGroupRootProps<
  ToggleGroupValue | ToggleGroupValue[]
> {
  variant?: ToggleVariants['variant']
  severity?: ToggleVariants['severity']
  size?: ToggleVariants['size']
  color?: string
  spacing?: number
  mandatory?: boolean
  items?: ToggleGroupItem[]
  ui?: ToggleGroupUI
}

export function normalizeToggleGroupProps(
  source: ToggleGroupProps | null | undefined,
): ToggleGroupProps | undefined {
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
  }
}
export type ToggleGroupEmits = ToggleGroupRootEmits

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
