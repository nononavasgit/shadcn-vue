<script setup lang="ts" generic="TData extends RowData">
import { cellSpanningFeature, FlexRender, tableFeatures, useTable } from '@tanstack/vue-table'
import type { RowData } from '@tanstack/vue-table'
import { computed, toRef, useAttrs } from 'vue'
import { cn } from '@/lib/utils'
import type { TableProps, TableSlots } from '.'
import { tableDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TableProps<TData>>(), tableDefaults)
defineSlots<TableSlots<TData>>()
const attrs = useAttrs()

const features = tableFeatures({ cellSpanningFeature })
const table = useTable({
  features,
  columns: props.columns,
  data: toRef(props, 'data'),
  enableCellSpanning: toRef(props, 'enableCellSpanning'),
})

const rootProps = computed(() => ({
  ...attrs,
  class: cn('relative w-full overflow-auto', attrs.class),
  style: attrs.style,
}))

const tableProps = computed(() => ({
  class: 'w-full caption-bottom text-sm',
}))

const theadProps = computed(() => ({
  class: '[&_tr]:border-b',
}))

const tbodyProps = computed(() => ({
  class: '[&_tr:last-child]:border-0',
}))

const columnCount = computed(() => table.getAllLeafColumns().length)
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
              class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
            >
              <slot
                :name="`header-${header.column.id}`"
                :header="header"
                :column="header.column"
                :column-def="header.column.columnDef"
              >
                <FlexRender :header="header" />
              </slot>
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
          <template v-for="cell in row.getAllCells()" :key="cell.id">
            <td
              v-if="!cell.getIsCovered()"
              :colspan="cell.getColSpan()"
              :rowspan="cell.getRowSpan()"
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
