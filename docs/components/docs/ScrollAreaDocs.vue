<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  ScrollArea,
  type ScrollAreaOrientation,
  type ScrollAreaProps,
} from '@/components/ui/ScrollArea'
import { scrollAreaDefaults } from '@/components/ui/ScrollArea/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const orientation = ref<ScrollAreaOrientation>(scrollAreaDefaults.orientation)
const type = ref<NonNullable<ScrollAreaProps['type']>>(scrollAreaDefaults.type)
const scrollHideDelay = ref(scrollAreaDefaults.scrollHideDelay)
const forceMount = ref(scrollAreaDefaults.forceMount)

const playgroundProps = computed<ScrollAreaProps>(() => ({
  orientation: orientation.value,
  type: type.value,
  scrollHideDelay: scrollHideDelay.value,
  forceMount: forceMount.value,
  ui: {
    viewport: () => ({ class: 'scroll-smooth' }),
  },
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'ScrollAreaOrientation',
    type: "'vertical' | 'horizontal' | 'both'",
    description: 'Ejes en los que se muestran las barras de desplazamiento.',
  },
  {
    name: 'ScrollAreaUI',
    type: '{ viewport?; verticalScrollbar?; horizontalScrollbar?; thumbVertical?; thumbHorizontal?; corner? }',
    description: 'Resolvers para personalizar las partes internas del componente.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'type',
    type: "'scroll' | 'always' | 'hover' | 'auto' | 'glimpse'",
    default: `'${scrollAreaDefaults.type}'`,
    description: 'Momento en el que se muestran las barras de desplazamiento.',
  },
  {
    name: 'scrollHideDelay',
    type: 'number',
    default: String(scrollAreaDefaults.scrollHideDelay),
    description: 'Tiempo en milisegundos antes de ocultar la barra en modo hover.',
  },
  {
    name: 'orientation',
    type: 'ScrollAreaOrientation',
    default: `'${scrollAreaDefaults.orientation}'`,
    description: 'Eje o ejes que admiten desplazamiento.',
  },
  {
    name: 'forceMount',
    type: 'boolean',
    default: String(scrollAreaDefaults.forceMount),
    description: 'Mantiene montadas las barras aunque no estén visibles.',
  },
  {
    name: 'ui',
    type: 'ScrollAreaUI',
    default: 'undefined',
    description: 'Atributos personalizados para las partes internas.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Contenido desplazable.',
  },
]

const exposeRows: ApiTableRow[] = []

const items = Array.from({ length: 24 }, (_, index) => `Fila de contenido ${index + 1}`)
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">ScrollArea</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Contenedor de desplazamiento con barras verticales, horizontales o ambas.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">
          Tipos públicos usados por la API del componente.
        </p>
      </div>
      <ApiTable title="Tipos" :rows="typeRows" />
    </section>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Configura la orientación, el modo de aparición y el tiempo de ocultación.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <ScrollArea v-bind="playgroundProps" class="h-64 w-full max-w-md rounded-md border">
              <div class="grid gap-2 p-4">
                <div
                  v-for="item in items"
                  :key="item"
                  class="rounded-md border bg-background px-3 py-2 text-sm"
                >
                  {{ item }}
                </div>
              </div>
            </ScrollArea>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">type</span>
            <select
              v-model="type"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="auto">auto</option>
              <option value="always">always</option>
              <option value="scroll">scroll</option>
              <option value="hover">hover</option>
              <option value="glimpse">glimpse</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">orientation</span>
            <select
              v-model="orientation"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="vertical">vertical</option>
              <option value="horizontal">horizontal</option>
              <option value="both">both</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">scrollHideDelay</span>
            <input
              v-model.number="scrollHideDelay"
              type="number"
              min="0"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="forceMount" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">forceMount</span>
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
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone métodos." />
    </div>
  </section>
</template>
