import type { HTMLAttributes } from 'vue'
import type { IconName, IconProps } from '@/components/ui/Icon'
import type { ButtonProps } from '@/components/ui/Button'
import type { PaginationRootEmits, PaginationRootProps as RekaPaginationRootProps } from 'reka-ui'
import { useResolve } from '@/composables/useResolve'

export { default as Pagination } from './Pagination.vue'

export type PaginationIcon = IconName | IconProps

// Types
export type PaginationRootProps = Pick<
  RekaPaginationRootProps,
  'page' | 'defaultPage' | 'total' | 'itemsPerPage' | 'siblingCount' | 'showEdges' | 'disabled'
>

export function normalizeRootProps(
  source: PaginationRootProps | null | undefined,
): PaginationRootProps | undefined {
  if (!source) return undefined

  const { page, defaultPage, total, itemsPerPage, siblingCount, showEdges, disabled } = source
  return {
    page,
    defaultPage,
    total,
    itemsPerPage,
    siblingCount,
    showEdges,
    disabled,
  }
}

export type PaginationGeneratedItem = { type: 'page'; value: number } | { type: 'ellipsis' }

// Context
export interface PaginationUIContext {
  page?: number
  pageCount: number
  total: number
  itemsPerPage: number
}

export interface PaginationItemUIContext extends PaginationUIContext {
  item: PaginationGeneratedItem
  index: number
  active: boolean
  first: boolean
  last: boolean
}

export type PaginationUIValue<T> = T | ((context: PaginationUIContext) => T)
export type PaginationItemUIValue<T> = T | ((context: PaginationItemUIContext) => T)

export function resolvePaginationUIValue<T>(
  value: PaginationUIValue<T> | undefined,
  context: PaginationUIContext,
): T | undefined {
  return useResolve(value, context)
}
export function resolvePaginationItemUIValue<T>(
  value: PaginationItemUIValue<T> | undefined,
  context: PaginationItemUIContext,
): T | undefined {
  return useResolve(value, context)
}

// UI
export interface PaginationUI {
  item?: PaginationItemUIValue<HTMLAttributes>
  ellipsis?: PaginationItemUIValue<HTMLAttributes>
  root?: PaginationUIValue<HTMLAttributes>
  list?: PaginationUIValue<HTMLAttributes>
  first?: PaginationUIValue<HTMLAttributes>
  previous?: PaginationUIValue<HTMLAttributes>
  next?: PaginationUIValue<HTMLAttributes>
  last?: PaginationUIValue<HTMLAttributes>
}

// Props
export interface PaginationProps extends PaginationRootProps {
  showControls?: boolean
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  severity?: ButtonProps['severity']
  activeColor?: ButtonProps['color']
  activeVariant?: ButtonProps['variant']
  firstIcon?: PaginationIcon
  prevIcon?: PaginationIcon
  nextIcon?: PaginationIcon
  lastIcon?: PaginationIcon
  ellipsisIcon?: PaginationIcon
  ui?: PaginationUI
}

// Emits
export type PaginationEmits = PaginationRootEmits

// Slots
export type PaginationSlots = {
  preContent?(props: PaginationUIContext): unknown
  postContent?(props: PaginationUIContext): unknown
  item?(props: PaginationItemUIContext): unknown
  ellipsis?(props: PaginationItemUIContext): unknown
  first?(props: PaginationUIContext): unknown
  previous?(props: PaginationUIContext): unknown
  next?(props: PaginationUIContext): unknown
  last?(props: PaginationUIContext): unknown
}
