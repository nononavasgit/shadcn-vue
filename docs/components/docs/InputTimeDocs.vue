<script setup lang="ts">
import { inputTimeDefaults } from '@/components/ui/InputTime/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'string',
    default: inputTimeDefaults.value === '' ? "''" : String(inputTimeDefaults.value),
    description: 'Hora controlada mediante v-model:value.',
  },
  {
    name: 'showClock',
    type: 'boolean',
    default: String(inputTimeDefaults.showClock),
    description: 'Muestra u oculta el selector de hora nativo del navegador.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: string]',
    default: '-',
    description: 'Actualiza el valor controlado mediante v-model:value.',
  },
]

const slotRows: ApiTableRow[] = []
const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">InputTime</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Campo de hora controlado basado en el input nativo del navegador.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable
        title="Slots"
        type-label="slotProps"
        :show-default="false"
        :rows="slotRows"
        empty-text="Este componente no define slots propios."
      />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
