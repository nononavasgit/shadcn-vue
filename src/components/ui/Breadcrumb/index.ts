import type { HTMLAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/ui/Icon'
import type { LinkProps } from '@/components/ui/Link'

export { default as Breadcrumb } from './Breadcrumb.vue'

export type BreadcrumbIcon = IconName | IconProps

// Item
export interface BreadcrumbItem {
  id: string | number
  label?: string
  to?: LinkProps['to']
  icon?: BreadcrumbIcon
  disabled?: boolean
  ellipsis?: boolean
}

// Context
export interface BreadcrumbUIContext {
  items: BreadcrumbItem[]
}

export interface BreadcrumbItemUIContext {
  item: BreadcrumbItem
  index: number
  first: boolean
  last: boolean
  linked: boolean
}

export type BreadcrumbItemUIValue<T> = T | ((context: BreadcrumbItemUIContext) => T)

export function resolveBreadcrumbItemUIValue<T>(
  value: BreadcrumbItemUIValue<T> | undefined,
  context: BreadcrumbItemUIContext,
): T | undefined {
  return typeof value === 'function'
    ? (value as (context: BreadcrumbItemUIContext) => T)(context)
    : value
}

// UI
export interface BreadcrumbUI {
  root?: HTMLAttributes
  list?: HTMLAttributes
  item?: BreadcrumbItemUIValue<HTMLAttributes>
  link?: BreadcrumbItemUIValue<HTMLAttributes>
  page?: BreadcrumbItemUIValue<HTMLAttributes>
  icon?: BreadcrumbItemUIValue<HTMLAttributes>
  ellipsis?: BreadcrumbItemUIValue<HTMLAttributes>
  label?: BreadcrumbItemUIValue<HTMLAttributes>
  separator?: BreadcrumbItemUIValue<HTMLAttributes>
}

// Props
export interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  ellipsisIcon?: BreadcrumbIcon
  separatorIcon?: BreadcrumbIcon
  ui?: BreadcrumbUI
}

// Slots
export type BreadcrumbSlots = {
  item?(): ((props: BreadcrumbItemUIContext) => unknown) | undefined
  icon?(): ((props: BreadcrumbItemUIContext) => unknown) | undefined
  ellipsis?(): ((props: BreadcrumbItemUIContext) => unknown) | undefined
  separator?(): ((props: BreadcrumbItemUIContext) => unknown) | undefined
} & {
  [name: `item-${string}`]: ((props: BreadcrumbItemUIContext) => unknown) | undefined
  [name: `icon-${string}`]: ((props: BreadcrumbItemUIContext) => unknown) | undefined
  [name: `ellipsis-${string}`]: ((props: BreadcrumbItemUIContext) => unknown) | undefined
}
