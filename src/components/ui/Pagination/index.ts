import type { Component, HTMLAttributes } from 'vue'

export { default as Pagination } from './Pagination.vue'

export type PaginationGeneratedItem = { type: 'page'; value: number } | { type: 'ellipsis' }

export interface PaginationProps {
  /** Página controlada actualmente. */
  page?: number
  /** Página inicial cuando el componente no está controlado. */
  defaultPage?: number
  /** Número total de elementos. */
  total?: number
  /** Número de elementos mostrado por página. */
  itemsPerPage?: number
  /** Número de páginas hermanas alrededor de la página activa. */
  siblingCount?: number
  /** Muestra siempre los extremos y genera puntos suspensivos cuando hacen falta. */
  showEdges?: boolean
  /** Deshabilita toda la paginación. */
  disabled?: boolean
  /** Muestra el botón de primera página. */
  showFirst?: boolean
  /** Muestra el botón de página anterior. */
  showPrevious?: boolean
  /** Muestra el botón de página siguiente. */
  showNext?: boolean
  /** Muestra el botón de última página. */
  showLast?: boolean
  /** Elemento o componente utilizado como raíz. */
  as?: string | Component
  /** Renderiza el hijo como raíz. */
  asChild?: boolean
  ui?: PaginationUI
}

// Emits
export interface PaginationEmits {
  'update:page': [value: number]
}

// SlotProps
export interface PaginationRootSlotProps {
  page: number
  pageCount: number
  total: number
  itemsPerPage: number
  from: number
  to: number
}

// Context
export interface PaginationUIContext extends PaginationRootSlotProps {
  item: PaginationGeneratedItem
  index: number
  active: boolean
  first: boolean
  last: boolean
}

export type PaginationUIValue<T> = T | ((context: PaginationUIContext) => T)

// UI
export interface PaginationUI {
  root?: HTMLAttributes
  content?: HTMLAttributes
  item?: PaginationUIValue<HTMLAttributes>
  ellipsis?: PaginationUIValue<HTMLAttributes>
  first?: HTMLAttributes
  previous?: HTMLAttributes
  next?: HTMLAttributes
  last?: HTMLAttributes
}

//
export type PaginationSlotProps = PaginationUIContext

// Slots
export type PaginationSlots = {
  preContent?(props: PaginationRootSlotProps): unknown
  postContent?(props: PaginationRootSlotProps): unknown
  item?(props: PaginationSlotProps): unknown
  ellipsis?(props: PaginationSlotProps): unknown
  first?(props: PaginationRootSlotProps): unknown
  previous?(props: PaginationRootSlotProps): unknown
  next?(props: PaginationRootSlotProps): unknown
  last?(props: PaginationRootSlotProps): unknown
} & {
  [name: `item-${number}`]: ((props: PaginationSlotProps) => unknown) | undefined
  [name: `ellipsis-${number}`]: ((props: PaginationSlotProps) => unknown) | undefined
}
