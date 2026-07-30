import type { HTMLAttributes } from 'vue'
import type { NormalizeIconProps, NormalizedIconProps } from '@/components/app/Icon'
import type { useFilter } from '@/composables'

export { default as Command } from './Command.vue'

export interface CommandItem {
  /** Identificador único utilizado por los slots individuales. */
  id: string | number
  /** Valor seleccionado. Si se omite, se utiliza `id` convertido a texto. */
  value?: string
  label?: string
  icon?: NormalizeIconProps
  disabled?: boolean
}

export interface CommandGroup {
  id: string | number
  label?: string
  items: CommandItem[]
}

export type CommandEntry = CommandItem | CommandGroup

// Context group
export interface CommandGroupContext {
  group: CommandGroup
  groupIndex: number
  first: boolean
  last: boolean
}

// Context search
export interface CommandSearchContext {
  search: string
}

// Context item
export interface CommandItemContext {
  item: CommandItem
  itemIndex: number
  value: string
  selected: boolean
  firstItem: boolean
  lastItem: boolean
  group?: CommandGroup
  groupIndex?: number
  first: boolean
  last: boolean
}

export type CommandUIValue<T, C> = T | ((context: C) => T)

export interface CommandUI {
  input?: HTMLAttributes
  list?: HTMLAttributes
  footer?: HTMLAttributes
  header?: HTMLAttributes
  empty?: HTMLAttributes
  group?: CommandUIValue<HTMLAttributes, CommandGroupContext>
  heading?: CommandUIValue<HTMLAttributes, CommandGroupContext>
  item?: CommandUIValue<HTMLAttributes, CommandItemContext>
  icon?: CommandUIValue<NormalizedIconProps, CommandItemContext>
  indicator?: CommandUIValue<HTMLAttributes, CommandItemContext>
  label?: CommandUIValue<HTMLAttributes, CommandItemContext>
  separator?: CommandUIValue<HTMLAttributes, CommandGroupContext>
}

// Props
export interface CommandProps {
  items?: CommandEntry[]
  placeholder?: string
  emptyLabel?: string
  filter?: boolean
  selectable?: boolean
  defaultValue?: string | string[]
  multiple?: boolean
  disabled?: boolean
  dir?: 'ltr' | 'rtl'
  orientation?: 'horizontal' | 'vertical'
  highlightOnHover?: boolean
  selectionBehavior?: 'toggle' | 'replace'
  ui?: CommandUI
}

// Emits
export type CommandFilter = ReturnType<typeof useFilter>

export interface CommandEmits {
  'update:modelValue': [value: string | string[] | undefined]
  search: [value: string, filter: CommandFilter]
  select: [item: CommandItem, group?: CommandGroup]
}

// Slots
export type CommandSlots = {
  empty?(): unknown
  footer?(props: CommandSearchContext): unknown
  header?(props: CommandSearchContext): unknown
  inputIcon?(props: CommandSearchContext): unknown
  heading?(props: CommandGroupContext): unknown
  item?(props: CommandItemContext): unknown
  indicator?(props: CommandItemContext): unknown
  icon?(props: CommandItemContext): unknown
  label?(props: CommandItemContext): unknown
} & {
  [name: `heading-${string}`]: ((props: CommandGroupContext) => unknown) | undefined
  [name: `item-${string}`]: ((props: CommandItemContext) => unknown) | undefined
  [name: `indicator-${string}`]: ((props: CommandItemContext) => unknown) | undefined
  [name: `icon-${string}`]: ((props: CommandItemContext) => unknown) | undefined
  [name: `label-${string}`]: ((props: CommandItemContext) => unknown) | undefined
}
