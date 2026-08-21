<script setup lang="ts">
import { ref } from 'vue'

import { Input } from '@/components/ui/Input'
import { inputDefaults } from '@/components/ui/Input/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const value = ref('Buscar componentes')

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
            <Input
              v-model:value="value"
              type="text"
              placeholder="Buscar componentes"
              aria-label="Input playground"
            />
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">value</span>
            <input
              v-model="value"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
