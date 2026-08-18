<script setup lang="ts">
import { computed, ref } from 'vue'

import { Empty, type EmptyProps } from '@/components/ui/Empty'
import { emptyDefaults } from '@/components/ui/Empty/defaults'
import { Icon } from '@/components/ui/Icon'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const playgroundLabel = ref('No hay resultados')
const playgroundDescription = ref('Prueba a cambiar los filtros de búsqueda.')
const playgroundMediaVariant = ref<NonNullable<EmptyProps['mediaVariant']>>(
  emptyDefaults.mediaVariant,
)

const playgroundProps = computed<EmptyProps>(() => ({
  label: playgroundLabel.value || undefined,
  description: playgroundDescription.value || undefined,
  mediaVariant: playgroundMediaVariant.value,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'EmptyUI',
    type: '{ header?; media?; label?; description?; content? }',
    description: 'Resolvers para personalizar los atributos de las partes internas.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Título principal del estado vacío.',
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Descripción secundaria del estado vacío.',
  },
  {
    name: 'mediaVariant',
    type: "'default' | 'icon'",
    default: `'${emptyDefaults.mediaVariant}'`,
    description: 'Estilo aplicado al contenido del slot media.',
  },
  {
    name: 'ui',
    type: 'EmptyUI',
    default: 'undefined',
    description: 'Atributos personalizados para header, media, label, description y content.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Acciones o contenido adicional.',
  },
  {
    name: 'media',
    type: 'Record<string, never>',
    default: '-',
    description: 'Icono o elemento visual del estado vacío.',
  },
  {
    name: 'label',
    type: 'Record<string, never>',
    default: 'label',
    description: 'Personaliza el título.',
  },
  {
    name: 'description',
    type: 'Record<string, never>',
    default: 'description',
    description: 'Personaliza la descripción.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Empty</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Estado vacío compuesto con título, descripción, contenido y media opcionales.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">Tipos públicos usados por la API.</p>
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
        <p class="text-sm text-muted-foreground">
          Cambia el contenido y el estilo del estado vacío.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Empty v-bind="playgroundProps">
              <template #media>
                <Icon name="search" />
              </template>
              <button
                type="button"
                class="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground hover:bg-primary/90"
              >
                Limpiar filtros
              </button>
            </Empty>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">label</span>
            <input
              v-model="playgroundLabel"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">description</span>
            <input
              v-model="playgroundDescription"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">mediaVariant</span>
            <select
              v-model="playgroundMediaVariant"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="default">default</option>
              <option value="icon">icon</option>
            </select>
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
