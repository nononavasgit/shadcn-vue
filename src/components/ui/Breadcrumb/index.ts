import type { HTMLAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/ui/Icon'
import type { LinkProps } from '@/components/ui/Link'

export { default as Breadcrumb } from './Breadcrumb.vue'

export interface BreadcrumbItem {
  id: string | number
  label?: string
  to?: LinkProps['to']
  icon?: IconName | IconProps
  disabled?: boolean
  ellipsis?: boolean
}

export interface BreadcrumbUIContext {
  item: BreadcrumbItem
  index: number
  first: boolean
  last: boolean
  linked: boolean
}

export type BreadcrumbUIValue<T> = T | ((context: BreadcrumbUIContext) => T)

export interface BreadcrumbUI {
  root?: HTMLAttributes
  list?: HTMLAttributes
  item?: BreadcrumbUIValue<HTMLAttributes>
  link?: BreadcrumbUIValue<HTMLAttributes>
  page?: BreadcrumbUIValue<HTMLAttributes>
  icon?: BreadcrumbUIValue<HTMLAttributes>
  ellipsis?: BreadcrumbUIValue<HTMLAttributes>
  label?: BreadcrumbUIValue<HTMLAttributes>
  separator?: BreadcrumbUIValue<HTMLAttributes>
}

export interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  ui?: BreadcrumbUI
}

export type BreadcrumbSlotProps = BreadcrumbUIContext

export type BreadcrumbSlots = {
  item?(props: BreadcrumbSlotProps): unknown
  icon?(props: BreadcrumbSlotProps): unknown
  ellipsis?(props: BreadcrumbSlotProps): unknown
  separator?(props: BreadcrumbSlotProps): unknown
} & {
  [name: `item-${string}`]: ((props: BreadcrumbSlotProps) => unknown) | undefined
  [name: `icon-${string}`]: ((props: BreadcrumbSlotProps) => unknown) | undefined
  [name: `ellipsis-${string}`]: ((props: BreadcrumbSlotProps) => unknown) | undefined
  [name: `separator-${string}`]: ((props: BreadcrumbSlotProps) => unknown) | undefined
}
