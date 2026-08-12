import type { HTMLAttributes } from 'vue'
import type { NormalizeIconProps } from '@/components/ui/Icon'
import type { LinkProps } from '@/components/ui/Link'

export { default as Breadcrumb } from './Breadcrumb.vue'

// Item
export interface BreadcrumbItem {
  id: string | number
  label?: string
  to?: LinkProps['to']
  icon?: NormalizeIconProps
  disabled?: boolean
}

// Props
export interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  ellipsisIndex?: [start: number, end: number]
  ellipsisIcon?: NormalizeIconProps
  separatorIcon?: NormalizeIconProps
  ui?: BreadcrumbUI
}

// Fn
export type BreadcrumbFn<T> = (context: BreadcrumbContext) => T
export type BreadcrumbItemFn<T> = (context: BreadcrumbItemContext) => T

// UI
export interface BreadcrumbUI {
  root?: BreadcrumbFn<HTMLAttributes>
  list?: BreadcrumbFn<HTMLAttributes>
  ellipsisContainer?: BreadcrumbFn<HTMLAttributes>
  separatorContainer?: BreadcrumbFn<HTMLAttributes>
  item?: BreadcrumbItemFn<HTMLAttributes>
  link?: BreadcrumbItemFn<HTMLAttributes>
  page?: BreadcrumbItemFn<HTMLAttributes>
  label?: BreadcrumbItemFn<HTMLAttributes>
}

// Context
export interface BreadcrumbContext {
  props: Omit<BreadcrumbProps, 'ui'>
}

export interface BreadcrumbItemContext extends BreadcrumbContext {
  item: BreadcrumbItem
  index: number
  first: boolean
  last: boolean
  linked: boolean
  ellipsis: boolean
}

export interface BreadcrumbEllipsisContext extends BreadcrumbContext {
  items: BreadcrumbItem[]
}

// Slots
export type BreadcrumbSlots = {
  default?(props: BreadcrumbContext): unknown
  ellipsis?(props: BreadcrumbEllipsisContext): unknown
  separator?(props: BreadcrumbContext): unknown
  item?(props: BreadcrumbItemContext): unknown
  icon?(props: BreadcrumbItemContext): unknown
} & {
  [name: `item-${string}`]: ((props: BreadcrumbItemContext) => unknown) | undefined
  [name: `icon-${string}`]: ((props: BreadcrumbItemContext) => unknown) | undefined
}
