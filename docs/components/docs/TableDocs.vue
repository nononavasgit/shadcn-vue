<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'columns',
    type: 'ReadonlyArray<TableColumn<TData>>',
    default: '-',
    description: 'Definición de las columnas que TanStack Table debe renderizar.',
    required: true,
  },
  {
    name: 'data',
    type: 'ReadonlyArray<TData>',
    default: '[]',
    description: 'Filas que se muestran en la tabla.',
  },
  {
    name: 'columnFilters',
    type: 'ColumnFiltersState',
    default: '[]',
    description: 'Estado controlado de filtros por columna. Permite v-model:column-filters.',
  },
  {
    name: 'columnPinning',
    type: 'ColumnPinningState',
    default: '{ start: [], end: [] }',
    description: 'Fija columnas en los extremos lógicos start y end durante el scroll horizontal.',
  },
  {
    name: 'columnVisibility',
    type: 'ColumnVisibilityState',
    default: '{}',
    description: 'Mapa controlado de columnas visibles. Un valor false oculta la columna.',
  },
  {
    name: 'enableColumnFilters',
    type: 'boolean',
    default: 'true',
    description: 'Habilita o deshabilita el filtrado para todas las columnas.',
  },
  {
    name: 'enableGlobalFilter',
    type: 'boolean',
    default: 'true',
    description: 'Habilita o deshabilita la búsqueda global para toda la tabla.',
  },
  {
    name: 'globalFilter',
    type: 'unknown',
    default: 'undefined',
    description:
      'Valor de búsqueda global controlado externamente. Se aplica a todas las columnas compatibles.',
  },
  {
    name: 'globalFilterFn',
    type: 'FilterFn<TableFeatures, TData>',
    default: 'deepGlobalFilterFn',
    description:
      'Criterio global personalizado. Por defecto normaliza mayúsculas y acentos y recorre arrays y objetos anidados.',
  },
  {
    name: 'manualFiltering',
    type: 'boolean',
    default: 'false',
    description:
      'Omite el filtrado local cuando los datos ya llegan filtrados desde un servidor u otra fuente.',
  },
  {
    name: 'enableCellSpanning',
    type: 'boolean',
    default: 'false',
    description: 'Permite combinar celdas vertical u horizontalmente mediante las columnas.',
  },
  {
    name: 'pinnable',
    type: 'boolean',
    default: 'false',
    description: 'Muestra los botones de cabecera para fijar y liberar columnas manualmente.',
  },
  {
    name: 'textNoResults',
    type: 'string',
    default: 'No results.',
    description: 'Texto alternativo cuando no existen filas y no se proporciona el slot empty.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'pinning',
    type: '{ isPinned, togglePinning }',
    description:
      'Personaliza el botón de fijación. isPinned indica su estado y togglePinning lo alterna.',
  },
  {
    name: 'header-{columnId}',
    type: '{ header, column, columnDef }',
    description:
      'Personaliza el contenido de una cabecera según el id de la columna. Si no existe, se usa FlexRender.',
  },
  {
    name: 'cell-{columnId}',
    type: '{ row, cell, value }',
    description:
      'Personaliza el contenido de una celda según el id resuelto de la columna. Funciona con accessorKey y accessorFn.',
  },
  {
    name: 'empty',
    type: '{ colspan }',
    description:
      'Reemplaza el texto del estado vacío. La cabecera permanece visible aunque no haya filas.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:columnFilters',
    type: 'ColumnFiltersState',
    description: 'Actualiza los filtros controlados. Permite v-model:column-filters.',
  },
  {
    name: 'update:columnVisibility',
    type: 'ColumnVisibilityState',
    description: 'Actualiza la visibilidad al usar el selector. Permite v-model:column-visibility.',
  },
  {
    name: 'update:columnPinning',
    type: 'ColumnPinningState',
    description:
      'Actualiza el estado al usar los botones de las cabeceras. Permite v-model:column-pinning.',
  },
]
const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Table</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Tabla headless basada en TanStack Table con columnas, datos y slots personalizables.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
