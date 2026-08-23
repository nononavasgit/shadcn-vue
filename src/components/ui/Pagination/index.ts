import type { HTMLAttributes } from 'vue'
import type {
  PaginationRootEmits as RekaPaginationRootEmits,
  PaginationRootProps as RekaPaginationRootProps,
} from 'reka-ui'
import type { ButtonProps } from '@/components/ui/Button'
import type { IconConfig } from '@/components/ui/Icon'

export { default as Pagination } from './Pagination.vue'

// Props Reka
export type PaginationRootProps = Partial<
  Pick<
    RekaPaginationRootProps,
    'page' | 'total' | 'itemsPerPage' | 'siblingCount' | 'showEdges' | 'disabled'
  >
>

export type PaginationGeneratedItem = { type: 'page'; value: number } | { type: 'ellipsis' }

// Props
export interface PaginationProps extends PaginationRootProps {
  showControls?: boolean
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  severity?: ButtonProps['severity']
  activeColor?: ButtonProps['color']
  activeVariant?: ButtonProps['variant']
  firstIcon?: IconConfig
  previousIcon?: IconConfig
  nextIcon?: IconConfig
  lastIcon?: IconConfig
  ellipsisIcon?: IconConfig
  ui?: PaginationUI
}

// Fn
export type PaginationFn<T> = (context: PaginationContext) => T
export type PaginationItemFn<T> = (context: PaginationItemContext) => T

// UI
export interface PaginationUI {
  root?: PaginationFn<HTMLAttributes>
  list?: PaginationFn<HTMLAttributes>
  first?: PaginationFn<HTMLAttributes>
  previous?: PaginationFn<HTMLAttributes>
  next?: PaginationFn<HTMLAttributes>
  last?: PaginationFn<HTMLAttributes>
  item?: PaginationItemFn<HTMLAttributes>
  ellipsis?: PaginationItemFn<HTMLAttributes>
}

// Context
export interface PaginationContext {
  page: number
  pageCount: number
}

export interface PaginationItemContext extends PaginationContext {
  item: PaginationGeneratedItem
  index: number
  active: boolean
  first: boolean
  last: boolean
}

// Emits
export type PaginationEmits = RekaPaginationRootEmits

// Slots
export type PaginationSlots = {
  default?(props: PaginationContext): unknown
  preContent?(props: PaginationContext): unknown
  postContent?(props: PaginationContext): unknown
  first?(props: PaginationContext): unknown
  previous?(props: PaginationContext): unknown
  next?(props: PaginationContext): unknown
  last?(props: PaginationContext): unknown
  item?(props: PaginationItemContext): unknown
  ellipsis?(props: PaginationItemContext): unknown
} & {
  [name: `item-${string}`]: ((props: PaginationItemContext) => unknown) | undefined
  [name: `ellipsis-${string}`]: ((props: PaginationItemContext) => unknown) | undefined
}
