<script setup lang="ts">
import { computed, ref } from 'vue'

import { Loading, type LoadingProps } from '@/components/ui/Loading'
import { loadingDefaults } from '@/components/ui/Loading/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const loading = ref(true)
const icon = ref('spinner')
const content = ref('Contenido listo')

const playgroundProps = computed<LoadingProps>(() => ({
  loading: loading.value,
  icon: icon.value ? { name: icon.value } : undefined,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'LoadingContext',
    type: '{ loading: boolean }',
    description: 'Estado de carga disponible en los slots.',
  },
  {
    name: 'LoadingUI',
    type: '{ loading?; content? }',
    description: 'Resolvers para personalizar los estados de carga y contenido.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'loading',
    type: 'boolean',
    default: String(loadingDefaults.loading),
    description: 'Muestra el estado de carga cuando es true.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon',
    default: `{ name: '${loadingDefaults.icon.name}' }`,
    description: 'Icono mostrado durante la carga.',
  },
  {
    name: 'ui',
    type: 'LoadingUI',
    default: 'undefined',
    description: 'Atributos personalizados para loading y content.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'LoadingContext',
    default: '-',
    description: 'Contenido mostrado cuando loading es false.',
  },
  {
    name: 'loading',
    type: 'LoadingContext',
    default: 'Icon',
    description: 'Contenido mostrado durante la carga.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Loading</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Alterna entre un indicador de carga y el contenido final.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">Tipos publicos usados por la API.</p>
      </div>
      <ApiTable title="Tipos" :rows="typeRows" />
    </section>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">Prueba el estado de carga, el icono y el slot.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Loading v-bind="playgroundProps">
              <template #default="context">
                <span>{{ content }} · loading: {{ context.loading }}</span>
              </template>
            </Loading>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">icon</span>
            <input
              v-model="icon"
              type="text"
              placeholder="spinner"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">content</span>
            <input
              v-model="content"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="loading" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">loading</span>
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
