import type { ColumnDef, RowData, TableFeatures } from '@tanstack/vue-table'

export { default as Table } from './Table.vue'

export type TableColumn<TData extends RowData> = ColumnDef<TableFeatures, TData>

export interface TableProps<TData extends RowData> {
  columns: ReadonlyArray<TableColumn<TData>>
  data?: ReadonlyArray<TData>
  textNoResults?: string
}
