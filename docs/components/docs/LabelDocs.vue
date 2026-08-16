<script setup lang="ts">
import { computed, ref } from 'vue'

import { Label, type LabelProps } from '@/components/ui/Label'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const forValue = ref('email')
const text = ref('Email address')

const playgroundProps = computed<LabelProps>(() => ({
  for: forValue.value || undefined,
}))

const typeRows: ApiTableRow[] = []

const propRows: ApiTableRow[] = [
  {
    name: 'for',
    type: 'string',
    default: 'undefined',
    description: 'Id del control de formulario asociado a la etiqueta.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Contenido visible de la etiqueta.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Label</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Etiqueta accesible asociada a un control de formulario.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">
          Tipos publicos usados por la API del componente.
        </p>
      </div>
      <ApiTable
        title="Tipos"
        :rows="typeRows"
        empty-text="Este componente no define tipos adicionales."
      />
    </section>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">Cambia el texto y el control asociado.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <div class="grid w-full max-w-sm gap-2">
              <Label v-bind="playgroundProps">{{ text }}</Label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">text</span>
            <input
              v-model="text"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">for</span>
            <input
              v-model="forValue"
              type="text"
              placeholder="email"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable title="Slots" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
