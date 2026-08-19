<script setup lang="ts">
import { computed, ref } from 'vue'

import { InputTime, type InputTimeProps } from '@/components/ui/InputTime'
import { inputTimeDefaults } from '@/components/ui/InputTime/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const value = ref('09:30')
const showClock = ref(inputTimeDefaults.showClock)

const playgroundProps = computed<InputTimeProps>(() => ({
  showClock: showClock.value,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'InputTimeValue',
    type: 'string',
    description: 'Valor controlado en formato de hora HTML.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'InputTimeValue',
    default: "''",
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
    type: '[value: InputTimeValue]',
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
          Cambia la hora y alterna la visibilidad del reloj nativo.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <InputTime v-model:value="value" v-bind="playgroundProps" aria-label="Hora" />
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">value</span>
            <input
              v-model="value"
              type="time"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="showClock" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">showClock</span>
          </label>
        </div>
      </div>
    </section>

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
