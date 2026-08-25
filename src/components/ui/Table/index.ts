import type {
  Cell,
  Column,
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  ColumnVisibilityState,
  Header,
  Row,
  RowData,
  TableFeatures,
} from '@tanstack/vue-table'

export { default as Table } from './Table.vue'

/**
 * Definición de una columna de Table.
 *
 * Propiedades principales admitidas por TanStack Table:
 * - `id`: identificador único de la columna.
 * - `accessorKey`: propiedad del objeto de datos que se muestra.
 * - `accessorFn`: función para calcular el valor de la columna.
 * - `header`: contenido o función que renderiza la cabecera.
 * - `cell`: contenido o función que renderiza las celdas.
 * - `footer`: contenido o función para el pie de columna.
 * - `columns`: columnas hijas para crear grupos de cabecera.
 * - `meta`: metadatos personalizados de la columna.
 * - `spanRows`: combina verticalmente celdas adyacentes con valores iguales.
 * - `spanColumns`: combina horizontalmente varias celdas de una fila.
 * - `size`, `minSize` y `maxSize`: configuración de tamaño.
 * - `enableSorting` y `sortFn`: configuración de ordenación.
 * - `enableColumnFilter` y `filterFn`: configuración de filtrado.
 * - `enableHiding`: permite ocultar la columna.
 * - `enablePinning`: permite fijar la columna.
 *
 * Las propiedades de ordenación, filtrado, tamaño y fijación requieren que
 * la funcionalidad correspondiente esté registrada y renderizada en la tabla.
 */
export type TableColumn<TData extends RowData> = ColumnDef<TableFeatures, TData>

export interface TableProps<TData extends RowData> {
  columns: ReadonlyArray<TableColumn<TData>>
  columnFilters?: ColumnFiltersState
  columnPinning?: ColumnPinningState
  columnVisibility?: ColumnVisibilityState
  data?: ReadonlyArray<TData>
  enableCellSpanning?: boolean
  enableColumnFilters?: boolean
  manualFiltering?: boolean
  pinnable?: boolean
  textNoResults?: string
}

export interface TableEmits {
  'update:columnFilters': [value: ColumnFiltersState]
  'update:columnPinning': [value: ColumnPinningState]
  'update:columnVisibility': [value: ColumnVisibilityState]
}

export type TableHeaderSlotProps<TData extends RowData> = {
  header: Header<TableFeatures, TData>
  column: Column<TableFeatures, TData>
  columnDef: TableColumn<TData>
}

export type TableCellSlotProps<TData extends RowData> = {
  row: Row<TableFeatures, TData>
  cell: Cell<TableFeatures, TData>
  value: unknown
}

export type TableSlots<TData extends RowData> = {
  empty?(props: { colspan: number }): unknown
  pinning?(props: { isPinned: boolean; togglePinning: () => void }): unknown
} & {
  [name: `header-${string}`]: ((props: TableHeaderSlotProps<TData>) => unknown) | undefined
  [name: `cell-${string}`]: ((props: TableCellSlotProps<TData>) => unknown) | undefined
}
