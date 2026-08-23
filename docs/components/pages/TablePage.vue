<script setup lang="ts">
import { Table, type TableColumn } from '@/components/ui/Table'
import DocsLayout from '../DocsLayout.vue'

type Payment = {
  id: string
  customer: string
  status: 'Completado' | 'Pendiente' | 'Fallido'
  amount: string
  date: string
}

const columns: TableColumn<Payment>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'customer', header: 'Cliente' },
  { accessorKey: 'status', header: 'Estado' },
  { accessorKey: 'amount', header: 'Importe' },
  { accessorKey: 'date', header: 'Fecha' },
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

        <section class="grid gap-4 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h2 class="text-xl font-semibold">Ejemplos</h2>
          <div class="rounded-md border">
            <Table :columns="columns" :data="data">
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
          <h2 class="text-xl font-semibold">Estado vacío</h2>
          <div class="rounded-md border">
            <Table :columns="columns" :data="emptyData">
              <template #empty>
                <span class="text-muted-foreground">No hay pagos para mostrar.</span>
              </template>
            </Table>
          </div>
        </section>
      </div>
    </main>
  </DocsLayout>
</template>
