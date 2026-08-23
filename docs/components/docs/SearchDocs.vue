<script setup lang="ts">
import { ref } from 'vue'

import { Search } from '@/components/ui/Search'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const label = ref('Buscar componentes')

const propRows: ApiTableRow[] = []

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: '-',
    default: '-',
    description: 'Contenido del formulario de búsqueda sin slotProps.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Search</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Formulario semántico para agrupar controles y acciones de búsqueda.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          El componente conserva los eventos y atributos nativos del formulario.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Search aria-label="Buscar en la documentación" class="w-full max-w-xl gap-3">
              <div class="flex w-full items-center gap-3">
                <input
                  :value="label"
                  type="search"
                  aria-label="Texto de búsqueda"
                  class="h-9 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  class="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                >
                  Buscar
                </button>
              </div>
            </Search>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">Texto de ayuda</span>
            <input
              v-model="label"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <p class="text-sm text-muted-foreground">
            El contenido del slot puede combinar cualquier control nativo o componente de la
            librería.
          </p>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios; reenvía los eventos nativos del formulario."
      />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
