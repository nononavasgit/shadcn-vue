<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'ratio',
    type: 'string',
    default: '1',
    description: 'Relacion de aspecto aplicada al contenedor.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Contenido renderizado dentro del contenedor proporcional.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">AspectRatio</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Mantiene una relacion de aspecto estable para el contenido que contiene.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="aspect-ratio-props" title="Props" :rows="propRows" />
      <ApiTable
        id="aspect-ratio-emits"
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable id="aspect-ratio-slots" title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
