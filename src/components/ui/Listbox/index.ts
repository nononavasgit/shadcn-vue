import type { HTMLAttributes } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ListboxRootProps as RekaListboxRootProps } from 'reka-ui'
import type { IconConfig } from '@/components/ui/Icon'
import type { NormalizeInputProps } from '@/components/ui/Input'
import type { FilterMode } from '@/composables/useFilter'

export { default as Listbox } from './Listbox.vue'
export { listboxDefaults } from './defaults'

export const listboxVariants = cva('', {
  variants: {
    size: {
      xs: 'min-h-7 text-sm',
      sm: 'min-h-8 text-sm',
      md: 'min-h-9 text-base',
      lg: 'min-h-10 text-lg',
      xl: 'min-h-11 text-xl',
    },
  },
  defaultVariants: { size: 'md' },
})

export type ListboxSize = NonNullable<VariantProps<typeof listboxVariants>['size']>

export type ListboxValue = string | number
export type ListboxModelValue = ListboxValue | ListboxValue[] | undefined
export type ListboxRootProps = Pick<
  RekaListboxRootProps<ListboxValue>,
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
  icon?: IconConfig
  disabled?: boolean
}

export interface ListboxGroup {
  id: string | number
  label: string
  items: ListboxItem[]
}

export interface ListboxProps extends ListboxRootProps {
  size?: ListboxSize
  loading?: boolean
  value?: ListboxModelValue
  search?: string
  filter?: boolean
  filterMode?: FilterMode
  ignoreFilter?: boolean
  inputFilter?: NormalizeInputProps
  iconFilter?: IconConfig
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
  content?: ListboxFn<HTMLAttributes>
  empty?: ListboxFn<HTMLAttributes>
  noResults?: ListboxFn<HTMLAttributes>
  loading?: ListboxFn<HTMLAttributes>
  group?: ListboxGroupFn<HTMLAttributes>
  groupLabel?: ListboxGroupFn<HTMLAttributes>
  item?: ListboxItemFn<HTMLAttributes>
  itemLeading?: ListboxItemFn<HTMLAttributes>
  itemLabel?: ListboxItemFn<HTMLAttributes>
  itemIndicator?: ListboxItemFn<HTMLAttributes>
}

export interface ListboxContext {
  value: ListboxModelValue
  search: string
}

export interface ListboxItemContext {
  item: ListboxItem
  index: number
  selected: boolean
  group?: ListboxGroup
}

export interface ListboxGroupContext {
  group: ListboxGroup
  index: number
}

export interface ListboxEmits {
  'update:value': [value: ListboxModelValue]
  'update:search': [value: string]
}

export type ListboxSlots = {
  item?(props: ListboxItemContext): unknown
  'item-label'?(props: ListboxItemContext): unknown
  'item-leading'?(props: ListboxItemContext): unknown
  'group-label'?(props: ListboxGroupContext): unknown
  empty?(props: ListboxContext): unknown
  'no-results'?(props: ListboxContext): unknown
  loading?(props: ListboxContext): unknown
  'filter-leading'?(props: ListboxContext): unknown
  'item-indicator'?(props: ListboxItemContext): unknown
}
