<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Direccion del grupo de botones.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Tamano de los botones del grupo.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: '-',
    default: '-',
    description: 'Botones y contenido que forman el grupo.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">ButtonGroup</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Agrupa botones relacionados y ajusta sus bordes, espaciado y tamano de forma consistente.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="button-group-props" title="Props" :rows="propRows" />
      <ApiTable
        id="button-group-emits"
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable id="button-group-slots" title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
