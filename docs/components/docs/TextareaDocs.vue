<script setup lang="ts">
import { textareaDefaults } from '@/components/ui/Textarea/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'string',
    default: textareaDefaults.value === '' ? "''" : textareaDefaults.value,
    description: 'Valor controlado del campo de texto multilínea.',
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
      <h2 class="text-2xl font-semibold">Textarea</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Campo de texto multilínea controlado para introducir contenido largo.
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
