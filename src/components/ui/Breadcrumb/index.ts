import type { HTMLAttributes } from 'vue'
import type { NormalizeIconProps, NormalizedIconProps } from '@/components/ui/Icon'
import type { LinkProps } from '@/components/ui/Link'

export { default as Breadcrumb } from './Breadcrumb.vue'

// Props item
export interface BreadcrumbItem {
  id: string | number
  label?: string
  to?: LinkProps['to']
  icon?: NormalizeIconProps
  disabled?: boolean
  ellipsis?: boolean
}

// Context
export interface BreadcrumbUIContext {
  item: BreadcrumbItem
  index: number
  first: boolean
  last: boolean
  linked: boolean
}

export type BreadcrumbUIValue<T> = T | ((context: BreadcrumbUIContext) => T)

// UI
export interface BreadcrumbUI {
  list?: HTMLAttributes
  item?: BreadcrumbUIValue<HTMLAttributes>
  link?: BreadcrumbUIValue<HTMLAttributes>
  page?: BreadcrumbUIValue<HTMLAttributes>
  icon?: BreadcrumbUIValue<NormalizedIconProps>
  ellipsis?: BreadcrumbUIValue<HTMLAttributes>
  label?: BreadcrumbUIValue<HTMLAttributes>
  separator?: BreadcrumbUIValue<HTMLAttributes>
}

// Props
export interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  ui?: BreadcrumbUI
}

// SlotProps
export type BreadcrumbSlotProps = BreadcrumbUIContext

// Slots
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
