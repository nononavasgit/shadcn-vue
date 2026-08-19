import type { HTMLAttributes } from 'vue'
import type { LinkProps } from '@/components/ui/Link'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Breadcrumb } from './Breadcrumb.vue'

// Item
export interface BreadcrumbItem {
  value: string | number
  link: LinkProps
}

// Props
export interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  ellipsisIndex?: [start: number, end: number]
  ellipsisIcon?: IconConfig
  separatorIcon?: IconConfig
  ui?: BreadcrumbUI
}

// Fn
export type BreadcrumbFn<T> = () => T
export type BreadcrumbItemFn<T> = (context: BreadcrumbItemContext) => T

// UI
export interface BreadcrumbUI {
  list?: BreadcrumbFn<HTMLAttributes>
  ellipsisContainer?: BreadcrumbFn<HTMLAttributes>
  separatorContainer?: BreadcrumbFn<HTMLAttributes>
  item?: BreadcrumbItemFn<HTMLAttributes>
  link?: BreadcrumbItemFn<HTMLAttributes>
  page?: BreadcrumbItemFn<HTMLAttributes>
  label?: BreadcrumbItemFn<HTMLAttributes>
}

// Context
export interface BreadcrumbItemContext {
  item: BreadcrumbItem
  index: number
  first: boolean
  last: boolean
  linked: boolean
  ellipsis: boolean
}

export interface BreadcrumbEllipsisContext {
  items: BreadcrumbItem[]
}

// Slots
export type BreadcrumbSlots = {
  ellipsis?(props: BreadcrumbEllipsisContext): unknown
  separator?(): unknown
  item?(props: BreadcrumbItemContext): unknown
  icon?(props: BreadcrumbItemContext): unknown
} & {
  [name: `item-${string}`]: ((props: BreadcrumbItemContext) => unknown) | undefined
  [name: `icon-${string}`]: ((props: BreadcrumbItemContext) => unknown) | undefined
}
