import type { HTMLAttributes } from 'vue'
import type { ToolbarRootProps as RekaToolbarRootProps } from 'reka-ui'
import type { NormalizeButtonProps } from '@/components/ui/Button'
import type { NormalizeLinkProps } from '@/components/ui/Link'
import type { SeparatorProps } from '@/components/ui/Separator'
import type { NormalizeToggleProps } from '@/components/ui/Toggle'
import type { NormalizeToggleGroupProps } from '@/components/ui/ToggleGroup'

export { default as Toolbar } from './Toolbar.vue'

export type ToolbarValue = string | number
export type ToolbarItemType = 'button' | 'link' | 'toggle' | 'toggleGroup' | 'separator' | 'custom'

// Props Reka
export type ToolbarRootProps = Pick<
  RekaToolbarRootProps,
  'dir' | 'orientation' | 'loop' | 'as' | 'asChild'
>

// Item
export interface ToolbarItemBase {
  value: ToolbarValue
  type: ToolbarItemType
}

export interface ToolbarButtonItem extends ToolbarItemBase {
  type: 'button'
  props?: NormalizeButtonProps
}

export interface ToolbarLinkItem extends ToolbarItemBase {
  type: 'link'
  props: NormalizeLinkProps
}

export interface ToolbarToggleItem extends ToolbarItemBase {
  type: 'toggle'
  props?: NormalizeToggleProps
}

export interface ToolbarToggleGroupItem extends ToolbarItemBase {
  type: 'toggleGroup'
  props?: NormalizeToggleGroupProps
}

export interface ToolbarSeparatorItem extends ToolbarItemBase {
  type: 'separator'
  props?: SeparatorProps
}

export interface ToolbarCustomItem extends ToolbarItemBase {
  type: 'custom'
  props?: Record<string, unknown>
}

export type ToolbarItem =
  | ToolbarButtonItem
  | ToolbarLinkItem
  | ToolbarToggleItem
  | ToolbarToggleGroupItem
  | ToolbarSeparatorItem
  | ToolbarCustomItem

// Props
export interface ToolbarProps extends ToolbarRootProps {
  items?: ToolbarItem[]
  ui?: ToolbarUI
}

// Fn
export type ToolbarFn<T> = T | ((context: ToolbarContext) => T)
export type ToolbarItemFn<T> = T | ((context: ToolbarItemContext) => T)

// UI
export interface ToolbarUI {
  root?: ToolbarFn<HTMLAttributes>
  item?: ToolbarItemFn<HTMLAttributes>
}

// Context
export interface ToolbarContext {
  props: Omit<ToolbarProps, 'ui'>
}

export interface ToolbarItemContext extends ToolbarContext {
  item: ToolbarItem
  index: number
  first: boolean
  last: boolean
}

// Slots
export type ToolbarSlots = {
  default?(props: ToolbarContext): unknown
  item?(props: ToolbarItemContext): unknown
  custom?(props: ToolbarItemContext): unknown
} & {
  [name: `item-${string}`]: ((props: ToolbarItemContext) => unknown) | undefined
}
