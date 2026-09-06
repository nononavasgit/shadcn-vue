<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import { markerDefaults } from '@/components/ui/Marker/default'

const propRows: ApiTableRow[] = [
  {
    name: 'variant',
    type: '"default" | "border" | "separator"',
    default: markerDefaults.variant,
    description: 'Diseño del marcador: inline, con borde inferior o separador etiquetado.',
  },
  {
    name: 'as',
    type: 'string',
    default: markerDefaults.as,
    description: 'Elemento HTML que renderiza Marker.',
  },
  {
    name: 'asChild',
    type: 'boolean',
    default: String(markerDefaults.asChild),
    description: 'Fusiona los atributos de Marker con el elemento del slot default.',
  },
]
const emitRows: ApiTableRow[] = []
const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Contenido del marcador.',
  },
]
const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Marker</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Contenedor base para marcadores de estado y separadores de contenido.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" empty-text="Hereda las props de Primitive." />
      <ApiTable
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone métodos." />
    </div>
  </section>
</template>
