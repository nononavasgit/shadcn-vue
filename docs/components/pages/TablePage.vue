<script setup lang="ts">
import { Table, type TableColumn } from '@/components/ui/Table'
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
const pinnedColumns = { start: ['id'], end: ['date'] }

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
            <h2 class="text-xl font-semibold">Tamaño de columnas</h2>
            <p class="text-sm text-muted-foreground">
              Cada definición usa <code>size</code>. La tabla suma los anchos y muestra scroll
              horizontal cuando no caben en el contenedor.
            </p>
          </div>
          <div class="max-w-2xl rounded-md border">
            <Table :columns="sizedColumns" :data="data" />
          </div>
          <pre class="overflow-x-auto rounded-md bg-muted p-4 text-xs"><code>const columns = [
  { accessorKey: 'id', size: 90 },
  { accessorKey: 'customer', size: 300 },
  { accessorKey: 'status', size: 140 },
  { accessorKey: 'amount', size: 130 },
  { accessorKey: 'date', size: 150 },
]</code></pre>
        </section>

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h2 class="text-xl font-semibold">Columnas fijadas</h2>
          <p class="text-sm text-muted-foreground">
            ID permanece al inicio y Fecha al final durante el desplazamiento horizontal.
          </p>
          <div class="max-w-2xl rounded-md border">
            <Table :columns="columns" :column-pinning="pinnedColumns" :data="data" />
          </div>
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
