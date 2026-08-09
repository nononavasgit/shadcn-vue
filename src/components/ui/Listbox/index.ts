import type { HTMLAttributes } from 'vue'
import type { ListboxRootProps as RekaListboxRootProps } from 'reka-ui'

export { default as Listbox } from './Listbox.vue'

export type ListboxValue = string | number
export type ListboxModelValue = ListboxValue | ListboxValue[] | undefined

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
  disabled?: boolean
}

export interface ListboxProps extends ListboxRootProps {
  value?: ListboxModelValue
  items?: ListboxItem[]
  ui?: ListboxUI
}

export type ListboxFn<T> = T | ((context: ListboxContext) => T)
export type ListboxItemFn<T> = T | ((context: ListboxItemContext) => T)

export interface ListboxUI {
  root?: ListboxFn<HTMLAttributes>
  content?: ListboxFn<HTMLAttributes>
  item?: ListboxItemFn<HTMLAttributes>
  label?: ListboxItemFn<HTMLAttributes>
  indicator?: ListboxItemFn<HTMLAttributes>
}

export interface ListboxContext {
  props: Omit<ListboxProps, 'ui'>
  value: ListboxModelValue
}

export interface ListboxItemContext extends ListboxContext {
  item: ListboxItem
  index: number
  selected: boolean
}

export interface ListboxEmits {
  'update:value': [value: ListboxModelValue]
  valueChange: [value: ListboxModelValue]
}

export interface ListboxSlots {
  default?(props: ListboxContext): unknown
  item?(props: ListboxItemContext): unknown
  indicator?(props: ListboxItemContext): unknown
}
