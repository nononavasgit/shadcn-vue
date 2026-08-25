<script setup lang="ts">
import { Checkbox } from '@/components/ui/Checkbox'
import { Input } from '@/components/ui/Input'
import { Table, type TableColumn } from '@/components/ui/Table'
import type { ColumnFiltersState } from '@tanstack/vue-table'
import { ref } from 'vue'
import DocsLayout from '../DocsLayout.vue'
import TableDocs from '../docs/TableDocs.vue'

type Payment = {
  id: string
  customer: string
  status: 'Completado' | 'Pendiente' | 'Fallido'
  amount: string
  date: string
}

type RegionalSale = {
  region: string
  customer: string
  product: string
  amount: string
}

const columns: TableColumn<Payment>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'customer', header: 'Cliente' },
  { accessorKey: 'status', header: 'Estado' },
  { accessorKey: 'amount', header: 'Importe', enablePinning: false },
  { accessorKey: 'date', header: 'Fecha' },
]

const facetedColumns: TableColumn<Payment>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'customer', header: 'Cliente' },
  { accessorKey: 'status', header: 'Estado', filterFn: 'equals' },
  { accessorKey: 'amount', header: 'Importe' },
  { accessorKey: 'date', header: 'Fecha' },
]

const sizedColumns: TableColumn<Payment>[] = [
  { accessorKey: 'id', header: 'ID · 90 px', size: 90 },
  { accessorKey: 'customer', header: 'Cliente · 300 px', size: 300 },
  { accessorKey: 'status', header: 'Estado · 140 px', size: 140 },
  { accessorKey: 'amount', header: 'Importe · 130 px', size: 130 },
  { accessorKey: 'date', header: 'Fecha · 150 px', size: 150 },
]

const visibilityColumns: TableColumn<Payment>[] = [
  { accessorKey: 'id', header: 'ID', enableHiding: false },
  { accessorKey: 'customer', header: 'Cliente' },
  { accessorKey: 'status', header: 'Estado' },
  { accessorKey: 'amount', header: 'Importe' },
  { accessorKey: 'date', header: 'Fecha' },
]

const groupedColumns: TableColumn<Payment>[] = [
  {
    id: 'customer-info',
    header: 'Cliente',
    columns: [
      { accessorKey: 'id', header: 'ID' },
      { accessorKey: 'customer', header: 'Nombre' },
    ],
  },
  {
    id: 'payment-info',
    header: 'Pago',
    columns: [
      { accessorKey: 'status', header: 'Estado' },
      { accessorKey: 'amount', header: 'Importe' },
    ],
  },
  { accessorKey: 'date', header: 'Fecha' },
]

const spanningColumns: TableColumn<RegionalSale>[] = [
  { accessorKey: 'region', header: 'Región', spanRows: true },
  { accessorKey: 'customer', header: 'Cliente' },
  { accessorKey: 'product', header: 'Producto' },
  { accessorKey: 'amount', header: 'Importe' },
]

const data: Payment[] = [
  {
    id: 'P-1001',
    customer: 'Ana García',
    status: 'Completado',
    amount: '316,00 €',
    date: '23 ago 2026',
  },
  {
    id: 'P-1002',
    customer: 'Carlos Ruiz',
    status: 'Pendiente',
    amount: '242,00 €',
    date: '22 ago 2026',
  },
  {
    id: 'P-1003',
    customer: 'Lucía Martín',
    status: 'Completado',
    amount: '837,00 €',
    date: '21 ago 2026',
  },
  {
    id: 'P-1004',
    customer: 'Javier López',
    status: 'Fallido',
    amount: '721,00 €',
    date: '20 ago 2026',
  },
]

const emptyData: Payment[] = []
const pinnedColumns = ref({ start: ['id'], end: ['date'] })
const visibleColumns = ref<Record<string, boolean>>({ amount: false })
const columnFilters = ref<ColumnFiltersState>([])
const facetedFilters = ref<ColumnFiltersState>([])
const globalFilter = ref('')
const visibilityOptions = [
  { id: 'id', label: 'ID', hideable: false },
  { id: 'customer', label: 'Cliente', hideable: true },
  { id: 'status', label: 'Estado', hideable: true },
  { id: 'amount', label: 'Importe', hideable: true },
  { id: 'date', label: 'Fecha', hideable: true },
]

function setColumnVisibility(columnId: string, visible: boolean) {
  visibleColumns.value = { ...visibleColumns.value, [columnId]: visible }
}

const spanningData: RegionalSale[] = [
  { region: 'Norte', customer: 'Ana', product: 'Consultoría', amount: '450,00 €' },
  { region: 'Norte', customer: 'Carlos', product: 'Soporte', amount: '180,00 €' },
  { region: 'Sur', customer: 'Lucía', product: 'Desarrollo', amount: '720,00 €' },
  { region: 'Sur', customer: 'Javier', product: 'Diseño', amount: '310,00 €' },
]
</script>

<template>
  <DocsLayout>
    <main class="min-h-screen bg-background p-4 text-foreground sm:p-8">
      <div class="mx-auto grid max-w-5xl gap-6">
        <header class="grid gap-2">
          <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
          <h1 class="text-2xl font-semibold">Table</h1>
          <p class="max-w-2xl text-sm text-muted-foreground">Ejemplos del componente Table.</p>
        </header>

        <TableDocs />

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h2 class="text-xl font-semibold">Ejemplos</h2>
          <div class="rounded-md border">
            <Table :columns="columns" :data="data">
              <template #header-status>
                <span class="inline-flex items-center gap-2">
                  <span class="rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                    Personalizado
                  </span>
                </span>
              </template>

              <template #cell-status="{ value }">
                <span
                  class="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700"
                >
                  {{ value }}
                </span>
              </template>
            </Table>
          </div>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div class="grid gap-1">
            <h2 class="text-xl font-semibold">Buscador global</h2>
            <p class="text-sm text-muted-foreground">
              Un único valor externo busca en todas las columnas compatibles. No necesita conocer el
              identificador de ninguna columna.
            </p>
          </div>
          <Input
            v-model:value="globalFilter"
            class="max-w-sm"
            aria-label="Buscar pagos"
            placeholder="Buscar en todos los campos..."
          />
          <div class="rounded-md border">
            <Table :columns="columns" :data="data" :global-filter="globalFilter" />
          </div>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div class="grid gap-1">
            <h2 class="text-xl font-semibold">Filtrado por columna</h2>
            <p class="text-sm text-muted-foreground">
              El estado es controlado con <code>v-model:column-filters</code>. La interfaz del
              filtro vive en el slot de cabecera y usa la API de la columna de TanStack Table.
            </p>
          </div>
          <div class="rounded-md border">
            <Table v-model:column-filters="columnFilters" :columns="columns" :data="data">
              <template #header-customer="{ column }">
                <div class="grid min-w-44 gap-2 py-2">
                  <span>Cliente</span>
                  <Input
                    :value="String(column.getFilterValue() ?? '')"
                    aria-label="Filtrar por cliente"
                    placeholder="Buscar cliente..."
                    @update:value="column.setFilterValue($event)"
                  />
                </div>
              </template>
            </Table>
          </div>
          <pre
            class="overflow-auto rounded-md bg-muted p-3 text-xs"
          ><code>{{ columnFilters }}</code></pre>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div class="grid gap-1">
            <h2 class="text-xl font-semibold">Filtro con facetas</h2>
            <p class="text-sm text-muted-foreground">
              Las opciones y sus cantidades se obtienen de los datos con
              <code>getFacetedUniqueValues()</code>.
            </p>
          </div>
          <div class="rounded-md border">
            <Table v-model:column-filters="facetedFilters" :columns="facetedColumns" :data="data">
              <template #header-status="{ column }">
                <label class="grid min-w-44 gap-2 py-2">
                  <span>Estado</span>
                  <select
                    class="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground"
                    :value="String(column.getFilterValue() ?? '')"
                    aria-label="Filtrar por estado"
                    @change="
                      column.setFilterValue(($event.target as HTMLSelectElement).value || undefined)
                    "
                  >
                    <option value="">Todos</option>
                    <option
                      v-for="[value, count] in Array.from(
                        column.getFacetedUniqueValues().entries(),
                      ).sort(([a], [b]) => String(a).localeCompare(String(b)))"
                      :key="String(value)"
                      :value="String(value)"
                    >
                      {{ value }} ({{ count }})
                    </option>
                  </select>
                </label>
              </template>
            </Table>
          </div>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div class="grid gap-1">
            <h2 class="text-xl font-semibold">Tamaño de columnas</h2>
            <p class="text-sm text-muted-foreground">
              Cada definición usa <code>size</code>. La tabla suma los anchos y muestra scroll
              horizontal cuando no caben en el contenedor.
            </p>
          </div>
          <div class="max-w-2xl rounded-md border">
            <Table :columns="sizedColumns" :data="data" />
          </div>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h2 class="text-xl font-semibold">Columnas fijadas</h2>
          <p class="text-sm text-muted-foreground">
            ID permanece al inicio y Fecha al final durante el desplazamiento horizontal.
          </p>
          <div class="max-w-2xl rounded-md border">
            <Table
              v-model:column-pinning="pinnedColumns"
              :columns="columns"
              :data="data"
              pinnable
            />
          </div>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div class="grid gap-1">
            <h2 class="text-xl font-semibold">Visibilidad de columnas</h2>
            <p class="text-sm text-muted-foreground">
              Los controles viven fuera de Table y actualizan su estado controlado. Importe comienza
              oculto e ID permanece siempre visible mediante <code>enableHiding: false</code>.
            </p>
          </div>
          <div class="flex flex-wrap gap-4 rounded-md border p-3">
            <label
              v-for="option in visibilityOptions"
              :key="option.id"
              class="flex items-center gap-2 text-sm"
              :class="!option.hideable && 'cursor-not-allowed text-muted-foreground'"
            >
              <Checkbox
                :value="visibleColumns[option.id] !== false"
                :disabled="!option.hideable"
                @update:value="setColumnVisibility(option.id, Boolean($event))"
              />
              {{ option.label }}
            </label>
          </div>
          <div class="rounded-md border p-3">
            <Table
              v-model:column-visibility="visibleColumns"
              :columns="visibilityColumns"
              :data="data"
            />
          </div>
          <pre
            class="overflow-auto rounded-md bg-muted p-3 text-xs"
          ><code>{{ visibleColumns }}</code></pre>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h2 class="text-xl font-semibold">Estado vacío</h2>
          <div class="rounded-md border">
            <Table :columns="columns" :data="emptyData">
              <template #empty>
                <span class="text-muted-foreground">No hay pagos para mostrar.</span>
              </template>
            </Table>
          </div>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h2 class="text-xl font-semibold">Celdas combinadas</h2>
          <p class="text-sm text-muted-foreground">
            Las filas consecutivas con la misma región comparten una única celda vertical.
          </p>
          <div class="rounded-md border">
            <Table :columns="spanningColumns" :data="spanningData" enable-cell-spanning />
          </div>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h2 class="text-xl font-semibold">Cabeceras agrupadas</h2>
          <p class="text-sm text-muted-foreground">
            Las columnas anidadas generan varias filas de cabecera y agrupan sus columnas hijas.
          </p>
          <div class="rounded-md border">
            <Table :columns="groupedColumns" :data="data" />
          </div>
        </section>
      </div>
    </main>
  </DocsLayout>
</template>
