<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = []

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Teclas que forman el grupo.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">KbdGroup</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Agrupa varias teclas Kbd para representar atajos completos.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" empty-text="Este wrapper no define props propias." />
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
