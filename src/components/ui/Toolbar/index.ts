export { default as Toolbar } from './Toolbar.vue'
import { ToolbarRootProps as RekaToolbarRootProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { ButtonProps } from '../Button/index.ts'
import { LinkProps } from '../Link/index.ts'
import { SeparatorProps } from '../Separator/index.ts'
import { ToggleProps } from '../Toggle/index.ts'
import { ToggleGroupProps } from '../ToggleGroup/index.ts'

// Types
export type ToolbarRootProps = Pick<
  RekaToolbarRootProps,
  'dir' | 'orientation' | 'loop' | 'as' | 'asChild'
>

export function normalizeToolbarRootProps(
  source: ToolbarRootProps | null | undefined,
): ToolbarRootProps | undefined {
  if (!source) return undefined
  const { as, asChild, loop, dir, orientation } = source
  return { as, asChild, loop, dir, orientation }
}

// Function
export type ToolbarFn<T> = T | ((context: ToolbarContext) => T)
export type ToolbarItemFn<T> = T | ((context: ToolbarItemContext) => T)

// Props
export interface ToolbarProps extends ToolbarRootProps {
  items?: ToolbarItem[]
  ui?: ToolbarUI
}

// Prop Item
export type ToolbarItem = {
  key: string | number
  button?: ButtonProps
  link?: LinkProps
  separator?: SeparatorProps
  toggle?: ToggleProps
  toggleGroup?: ToggleGroupProps
}

// UI
export interface ToolbarUI {
  root: ToolbarFn<HTMLAttributes>
}

// Context
export interface ToolbarContext {
  items: ToolbarItem[]
}

export interface ToolbarItemContext {
  item: ToolbarItem
  index: number
  first: boolean
  last: boolean
}

// Slots
export type AccordionSlots = {
  default?(props: ToolbarContext): unknown
} & {
  [name: `item-${string}`]: ((props: ToolbarItemContext) => unknown) | undefined
}
