<script setup lang="ts">
import { ref } from 'vue'

import { Textarea, type TextareaValue } from '@/components/ui/Textarea'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const value = ref<TextareaValue>('Una nota editable desde el playground.')

const typeRows: ApiTableRow[] = [
  {
    name: 'TextareaValue',
    type: 'string',
    description: 'Valor controlado del textarea.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'TextareaValue',
    default: "''",
    description: 'Valor controlado del campo de texto multilínea.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: TextareaValue]',
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

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">
          Tipos publicos usados por la API del componente.
        </p>
      </div>
      <ApiTable title="Tipos" :rows="typeRows" />
    </section>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Edita el valor mediante el modelo controlado del componente.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Textarea
              v-model:value="value"
              rows="5"
              placeholder="Escribe una nota"
              aria-label="Textarea playground"
            />
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">value</span>
            <textarea
              v-model="value"
              rows="5"
              class="rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable
        title="Slots"
        :rows="slotRows"
        empty-text="Este componente no define slots propios."
      />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
