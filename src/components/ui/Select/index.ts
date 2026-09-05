import type { HTMLAttributes } from 'vue'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Select } from './Select.vue'
export { selectDefaults } from './defaults'

export type SelectValue = string | number
export type SelectModelValue = SelectValue | undefined

export interface SelectItem {
  value: SelectValue
  label: string
  icon?: IconConfig
  disabled?: boolean
  textValue?: string
}

export interface SelectGroup {
  label: string
  items: SelectItem[]
}

export type SelectFn<T> = (context: SelectContext) => T
export type SelectItemFn<T> = (context: SelectItemContext) => T
export type SelectGroupFn<T> = (context: SelectGroupContext) => T

export interface SelectUI {
  root?: SelectFn<HTMLAttributes>
  trigger?: SelectFn<HTMLAttributes>
  value?: SelectFn<HTMLAttributes>
  icon?: SelectFn<HTMLAttributes>
  content?: SelectFn<HTMLAttributes>
  viewport?: SelectFn<HTMLAttributes>
  scrollUpButton?: SelectFn<HTMLAttributes>
  scrollDownButton?: SelectFn<HTMLAttributes>
  group?: SelectGroupFn<HTMLAttributes>
  groupLabel?: SelectGroupFn<HTMLAttributes>
  item?: SelectItemFn<HTMLAttributes>
  itemText?: SelectItemFn<HTMLAttributes>
  indicator?: SelectItemFn<HTMLAttributes>
}

export interface SelectProps {
  value?: SelectModelValue
  disabled?: boolean
  loading?: boolean
  placeholder?: string
  items?: SelectItem[]
  groups?: SelectGroup[]
  ui?: SelectUI
}

export interface SelectEmits {
  'update:value': [value: SelectModelValue]
  'update:open': [value: boolean]
}

export interface SelectContext {
  value: SelectModelValue
  open: boolean
}

export interface SelectItemContext extends SelectContext {
  item: SelectItem
  index: number
  selected: boolean
  group?: SelectGroup
}

export interface SelectGroupContext extends SelectContext {
  group: SelectGroup
  index: number
}

export interface SelectSlots {
  loading?(props: SelectContext): unknown
  value?(props: SelectContext): unknown
  icon?(props: SelectContext): unknown
  item?(props: SelectItemContext): unknown
  'item-leading'?(props: SelectItemContext): unknown
  'item-label'?(props: SelectItemContext): unknown
  indicator?(props: SelectItemContext): unknown
  'group-label'?(props: SelectGroupContext): unknown
  'scroll-up'?(props: SelectContext): unknown
  'scroll-down'?(props: SelectContext): unknown
}
