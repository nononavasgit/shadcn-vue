<script setup lang="ts">
import { dropdownMenuDefaults } from '@/components/ui/DropdownMenu/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'open',
    type: 'boolean',
    default: 'false',
    description: 'Controla el estado del menú mediante v-model:open.',
  },
  {
    name: 'modal',
    type: 'boolean',
    default: String(dropdownMenuDefaults.modal),
    description: 'Controla si la interacción fuera del menú queda bloqueada.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: String(dropdownMenuDefaults.disabled),
    description: 'Deshabilita el trigger.',
  },
]
const emitRows: ApiTableRow[] = [
  {
    name: 'update:open',
    type: '[value: boolean]',
    default: '-',
    description: 'Actualiza el estado controlado.',
  },
]
const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'never',
    default: 'Icon menu',
    description: 'Contenido opcional del trigger.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">DropdownMenu</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Trigger accesible basado en Reka UI para un menú desplegable.
      </p>
    </header>
    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" /><ApiTable
        title="Emits"
        :rows="emitRows"
      /><ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
    </div>
  </section>
</template>
