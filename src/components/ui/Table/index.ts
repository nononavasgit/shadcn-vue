import type {
  Cell,
  Column,
  ColumnDef,
  Header,
  Row,
  RowData,
  TableFeatures,
} from '@tanstack/vue-table'

export { default as Table } from './Table.vue'

export type TableColumn<TData extends RowData> = ColumnDef<TableFeatures, TData>

export interface TableProps<TData extends RowData> {
  columns: ReadonlyArray<TableColumn<TData>>
  data?: ReadonlyArray<TData>
  textNoResults?: string
}

export type TableHeaderSlotProps<TData extends RowData> = {
  header: Header<TableFeatures, TData>
  column: Column<TableFeatures, TData>
}

export type TableCellSlotProps<TData extends RowData> = {
  row: Row<TableFeatures, TData>
  cell: Cell<TableFeatures, TData>
  value: unknown
}

export type TableSlots<TData extends RowData> = {
  empty?(props: { colspan: number }): unknown
} & {
  [name: `header-${string}`]: ((props: TableHeaderSlotProps<TData>) => unknown) | undefined
  [name: `cell-${string}`]: ((props: TableCellSlotProps<TData>) => unknown) | undefined
}
