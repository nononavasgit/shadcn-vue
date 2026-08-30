<script setup lang="ts">
import { inputDefaults } from '@/components/ui/Input/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'string',
    default: inputDefaults.value === '' ? "''" : String(inputDefaults.value),
    description: 'Valor controlado del campo de texto.',
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

const slotRows: ApiTableRow[] = [
  {
    name: 'leading',
    type: '-',
    default: '-',
    description: 'Contenido antes del campo de entrada.',
  },
  {
    name: 'trailing',
    type: '-',
    default: '-',
    description: 'Contenido despues del campo de entrada.',
  },
]
const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Input</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Campo de entrada controlado para texto y valores nativos del formulario.
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
