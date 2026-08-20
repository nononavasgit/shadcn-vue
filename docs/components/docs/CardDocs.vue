<script setup lang="ts">
import { computed, ref } from 'vue'

import { Card, type CardProps } from '@/components/ui/Card'
import { cardDefaults } from '@/components/ui/Card/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const label = ref('Account')
const description = ref('Account details and preferences')

const playgroundProps = computed<CardProps>(() => ({
  label: label.value || undefined,
  description: description.value || undefined,
}))

const propRows: ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    default: String(cardDefaults.label),
    description: 'Titulo de la tarjeta.',
  },
  {
    name: 'description',
    type: 'string',
    default: String(cardDefaults.description),
    description: 'Descripcion secundaria de la tarjeta.',
  },
  {
    name: 'ui',
    type: '{ header?: () => HTMLAttributes; label?: () => HTMLAttributes; description?: () => HTMLAttributes; action?: () => HTMLAttributes; content?: () => HTMLAttributes; footer?: () => HTMLAttributes }',
    default: String(cardDefaults.ui),
    description: 'Funciones que devuelven atributos HTML para los elementos internos.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  { name: 'default', type: '-', description: 'Contenido principal.' },
  {
    name: 'header',
    type: '-',
    description: 'Reemplaza el encabezado completo.',
  },
  { name: 'label', type: '-', description: 'Personaliza el titulo.' },
  {
    name: 'description',
    type: '-',
    description: 'Personaliza la descripcion.',
  },
  {
    name: 'action',
    type: '-',
    description: 'Accion alineada en el encabezado.',
  },
  {
    name: 'footer',
    type: '-',
    description: 'Contenido del pie de tarjeta.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Card</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Contenedor compuesto para agrupar contenido, acciones y un pie de tarjeta.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">Modifica el titulo y la descripcion.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Card v-bind="playgroundProps">
              <template #action>
                <button
                  type="button"
                  class="rounded-md border px-2 py-1 text-xs font-medium hover:bg-accent"
                >
                  Editar
                </button>
              </template>
              <p class="text-sm">Contenido principal de la tarjeta.</p>
              <template #footer>
                <span class="text-xs text-muted-foreground">Actualizado ahora</span>
              </template>
            </Card>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">label</span>
            <input
              v-model="label"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">description</span>
            <input
              v-model="description"
              type="text"
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
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
