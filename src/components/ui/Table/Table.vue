<script setup lang="ts" generic="TData extends RowData">
import {
  cellSpanningFeature,
  columnFilteringFeature,
  columnPinningFeature,
  columnSizingFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  filterFn_arrIncludes,
  filterFn_equals,
  filterFn_inDateRange,
  filterFn_inNumberRange,
  filterFn_includesString,
  filterFn_weakEquals,
  FlexRender,
  tableFeatures,
  useTable,
} from '@tanstack/vue-table'
import type { Column, Row, RowData, TableFeatures } from '@tanstack/vue-table'
import { Pin } from '@lucide/vue'
import { computed, toRef, useAttrs } from 'vue'
import type { CSSProperties } from 'vue'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { TableEmits, TableProps, TableSlots } from '.'
import { tableDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TableProps<TData>>(), tableDefaults)
const emit = defineEmits<TableEmits>()
defineSlots<TableSlots<TData>>()
const attrs = useAttrs()

const features = tableFeatures({
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: {
    arrIncludes: filterFn_arrIncludes,
    equals: filterFn_equals,
    inDateRange: filterFn_inDateRange,
    inNumberRange: filterFn_inNumberRange,
    includesString: filterFn_includesString,
    weakEquals: filterFn_weakEquals,
  },
  columnSizingFeature,
  columnPinningFeature,
  columnVisibilityFeature,
  cellSpanningFeature,
})
const table = useTable({
  features,
  columns: props.columns,
  data: toRef(props, 'data'),
  enableCellSpanning: toRef(props, 'enableCellSpanning'),
  enableColumnFilters: toRef(props, 'enableColumnFilters'),
  manualFiltering: toRef(props, 'manualFiltering'),
  state: {
    get columnFilters() {
      return props.columnFilters
    },
    get columnPinning() {
      return props.columnPinning
    },
    get columnVisibility() {
      return props.columnVisibility
    },
  },
  onColumnFiltersChange: (updater) => {
    const nextValue = updater instanceof Function ? updater(props.columnFilters) : updater

    emit('update:columnFilters', nextValue)
  },
  onColumnPinningChange: (updater) => {
    const nextValue = updater instanceof Function ? updater(props.columnPinning) : updater

    emit('update:columnPinning', nextValue)
  },
  onColumnVisibilityChange: (updater) => {
    const nextValue = updater instanceof Function ? updater(props.columnVisibility) : updater

    emit('update:columnVisibility', nextValue)
  },
})

function toggleColumnPin(column: Column<TableFeatures, TData>) {
  column.pin(column.getIsPinned() ? false : 'start')
}

function getColumnStyle(column: Column<TableFeatures, TData>): CSSProperties {
  const position = column.getIsPinned()

  return {
    background: position ? 'var(--background)' : undefined,
    insetInlineEnd: position === 'end' ? `${column.getAfter('end')}px` : undefined,
    insetInlineStart: position === 'start' ? `${column.getStart('start')}px` : undefined,
    maxWidth: `${column.getSize()}px`,
    minWidth: `${column.getSize()}px`,
    position: position ? 'sticky' : undefined,
    width: `${column.getSize()}px`,
    zIndex: position ? 1 : undefined,
  }
}

function getPinningClass(column: Column<TableFeatures, TData>) {
  const position = column.getIsPinned()
  const pinnedIndex = column.getPinnedIndex()

  return cn(
    position === 'start' &&
      pinnedIndex === props.columnPinning.start.length - 1 &&
      'shadow-[4px_0_4px_-4px_var(--border)]',
    position === 'end' && pinnedIndex === 0 && 'shadow-[-4px_0_4px_-4px_var(--border)]',
  )
}

function getRowCells(row: Row<TableFeatures, TData>) {
  return [
    ...row.getStartVisibleCells(),
    ...row.getCenterVisibleCells(),
    ...row.getEndVisibleCells(),
  ]
}

const rootProps = computed(() => ({
  ...attrs,
  class: cn('relative w-full overflow-auto', attrs.class),
  style: attrs.style,
}))

const tableProps = computed(() => ({
  class: 'w-full caption-bottom text-sm',
  style: { width: `max(100%, ${table.getTotalSize()}px)` },
}))

const theadProps = computed(() => ({
  class: '[&_tr]:border-b',
}))

const tbodyProps = computed(() => ({
  class: '[&_tr:last-child]:border-0',
}))

const columnCount = computed(() => Math.max(1, table.getVisibleLeafColumns().length))
</script>

<template>
  <div v-bind="rootProps" data-test-table-root>
    <table v-bind="tableProps" data-test-table-table>
      <thead v-bind="theadProps" data-test-table-thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
          class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
        >
          <template v-for="header in headerGroup.headers" :key="header.id">
            <th
              v-if="header.rowSpan > 0"
              :colspan="header.colSpan"
              :rowspan="header.rowSpan"
              :data-pinned="header.column.getIsPinned() || undefined"
              :class="getPinningClass(header.column)"
              :style="getColumnStyle(header.column)"
              class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
            >
              <div class="flex items-center gap-2">
                <template v-if="props.pinnable && header.column.getCanPin()">
                  <slot
                    name="pinning"
                    :is-pinned="Boolean(header.column.getIsPinned())"
                    :toggle-pinning="() => toggleColumnPin(header.column)"
                  >
                    <Button
                      type="button"
                      severity="secondary"
                      size="xs"
                      square
                      variant="plain"
                      :aria-label="
                        header.column.getIsPinned()
                          ? `Desfijar columna ${header.column.id}`
                          : `Fijar columna ${header.column.id}`
                      "
                      :aria-pressed="Boolean(header.column.getIsPinned())"
                      :data-column-id="header.column.id"
                      :data-pinned="header.column.getIsPinned() || undefined"
                      class="size-6 rounded-sm text-muted-foreground hover:text-foreground"
                      data-test-table-pin
                      @click="toggleColumnPin(header.column)"
                    >
                      <Pin
                        :class="cn('size-3.5', header.column.getIsPinned() && 'fill-current')"
                        aria-hidden="true"
                      />
                    </Button>
                  </slot>
                </template>

                <slot
                  :name="`header-${header.column.id}`"
                  :header="header"
                  :column="header.column"
                  :column-def="header.column.columnDef"
                >
                  <FlexRender :header="header" />
                </slot>
              </div>
            </th>
          </template>
        </tr>
      </thead>

      <tbody v-bind="tbodyProps" data-test-table-tbody>
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
        >
          <template v-for="cell in getRowCells(row)" :key="cell.id">
            <td
              v-if="!cell.getIsCovered()"
              :colspan="cell.getColSpan()"
              :rowspan="cell.getRowSpan()"
              :data-pinned="cell.column.getIsPinned() || undefined"
              :class="getPinningClass(cell.column)"
              :style="getColumnStyle(cell.column)"
              class="p-4 align-middle [&:has([role=checkbox])]:pr-0"
            >
              <slot
                :name="`cell-${cell.column.columnDef.accessorKey}`"
                :row="row"
                :cell="cell"
                :value="cell.getValue()"
              >
                <FlexRender :cell="cell" />
              </slot>
            </td>
          </template>
        </tr>

        <tr v-if="!table.getRowModel().rows.length">
          <td :colspan="columnCount" class="h-24 text-center">
            <slot name="empty" :colspan="columnCount">
              {{ props.textNoResults }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
