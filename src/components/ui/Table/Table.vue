<script setup lang="ts" generic="TData extends RowData">
import { FlexRender, tableFeatures, useTable } from '@tanstack/vue-table'
import type { RowData, TableFeatures } from '@tanstack/vue-table'
import { computed, toRef, useAttrs, useSlots } from 'vue'
import { cn } from '@/lib/utils'
import type { TableProps, TableSlots } from '.'
import { tableDefaults } from './defaults'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<TableProps<TData>>(), tableDefaults)
defineSlots<TableSlots<TData>>()
const attrs = useAttrs()
const slots = useSlots()

const features: TableFeatures = tableFeatures({})
const table = useTable({
  features,
  columns: props.columns,
  data: toRef(props, 'data'),
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
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            class="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
          >
              <slot
                  :name="`header-${header.column.columnDef.accessorKey}`"
                  :columnDef="header.column?.columnDef"
                >
                  <FlexRender :header="header" />
                </slot>  
         </th>
        </tr>
      </thead>

      <tbody v-bind="tbodyProps" data-test-table-tbody>
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          class="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
        >
          <td
            v-for="cell in row.getAllCells()"
            :key="cell.id"
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
        </tr>

        <tr v-if="!table.getRowModel().rows.length">
          <td :colspan="props.columns.length" class="h-24 text-center">
            <slot name="empty" :colspan="props.columns.length">
              {{ props.textNoResults }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
