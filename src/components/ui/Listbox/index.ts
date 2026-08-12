import type { HTMLAttributes, InputHTMLAttributes } from 'vue'
import type { ListboxRootProps as RekaListboxRootProps } from 'reka-ui'
import type { NormalizeIconProps } from '@/components/ui/Icon'
import type { NormalizeInputProps } from '@/components/ui/Input'

export { default as Listbox } from './Listbox.vue'

export type ListboxValue = string | number
export type ListboxModelValue = ListboxValue | ListboxValue[] | undefined
export type ListboxFilterInputProps = Omit<
  NormalizeInputProps,
  'value' | 'onUpdate:value' | 'onValueChange'
> &
  Omit<InputHTMLAttributes, 'value'>
export type ListboxRootProps = Pick<
  RekaListboxRootProps<ListboxValue>,
  | 'as'
  | 'asChild'
  | 'by'
  | 'dir'
  | 'disabled'
  | 'highlightOnHover'
  | 'multiple'
  | 'name'
  | 'orientation'
  | 'required'
  | 'selectionBehavior'
>

export interface ListboxItem {
  id?: string | number
  value: ListboxValue
  label: string
  icon?: NormalizeIconProps
  disabled?: boolean
}

export interface ListboxGroup {
  id: string | number
  label: string
  items: ListboxItem[]
}

export interface ListboxProps extends ListboxRootProps {
  value?: ListboxModelValue
  search?: string
  filter?: boolean
  ignoreFilter?: boolean
  filterInput?: ListboxFilterInputProps
  emptyText?: string
  noResultsText?: string
  items?: ListboxItem[]
  groups?: ListboxGroup[]
  ui?: ListboxUI
}

export type ListboxFn<T> = (context: ListboxContext) => T
export type ListboxItemFn<T> = (context: ListboxItemContext) => T
export type ListboxGroupFn<T> = (context: ListboxGroupContext) => T

export interface ListboxUI {
  root?: ListboxFn<HTMLAttributes>
  filter?: ListboxFn<HTMLAttributes>
  content?: ListboxFn<HTMLAttributes>
  empty?: ListboxFn<HTMLAttributes>
  noResults?: ListboxFn<HTMLAttributes>
  group?: ListboxGroupFn<HTMLAttributes>
  groupLabel?: ListboxGroupFn<HTMLAttributes>
  item?: ListboxItemFn<HTMLAttributes>
  label?: ListboxItemFn<HTMLAttributes>
  indicator?: ListboxItemFn<HTMLAttributes>
}

export interface ListboxContext {
  props: Omit<ListboxProps, 'ui'>
  value: ListboxModelValue
  search: string
}

export interface ListboxItemContext extends ListboxContext {
  item: ListboxItem
  index: number
  selected: boolean
  group?: ListboxGroup
  groupIndex?: number
}

export interface ListboxGroupContext extends ListboxContext {
  group: ListboxGroup
  index: number
}

export interface ListboxEmits {
  'update:value': [value: ListboxModelValue]
  'update:search': [value: string]
  valueChange: [value: ListboxModelValue]
  searchChange: [value: string]
}

export type ListboxSlots = {
  default?(props: ListboxContext): unknown
  item?(props: ListboxItemContext): unknown
  'item-leading'?(props: ListboxItemContext): unknown
  group?(props: ListboxGroupContext): unknown
  'group-label'?(props: ListboxGroupContext): unknown
  empty?(props: ListboxContext): unknown
  'no-results'?(props: ListboxContext): unknown
  indicator?(props: ListboxItemContext): unknown
} & {
  [name: `item-${string}`]: ((props: ListboxItemContext) => unknown) | undefined
  [name: `item-leading-${string}`]: ((props: ListboxItemContext) => unknown) | undefined
  [name: `group-${string}`]: ((props: ListboxGroupContext) => unknown) | undefined
  [name: `group-label-${string}`]: ((props: ListboxGroupContext) => unknown) | undefined
}
