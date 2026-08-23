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
    name: 'textNoResults',
    type: 'string',
    default: 'No results.',
    description: 'Texto alternativo cuando no existen filas y no se proporciona el slot empty.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'cell-{accessorKey}',
    type: '{ row, cell, value }',
    description:
      'Personaliza el contenido de una celda según el accessorKey de la columna. Si no existe, se usa FlexRender.',
  },
  {
    name: 'empty',
    type: '{ colspan }',
    description:
      'Reemplaza el texto del estado vacío. La cabecera permanece visible aunque no haya filas.',
  },
]

const emitRows: ApiTableRow[] = []
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
      <ApiTable
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
