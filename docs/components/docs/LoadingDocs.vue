<script setup lang="ts">
import { loadingDefaults } from '@/components/ui/Loading/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

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
    type: '{ loading?: (context: LoadingContext) => HTMLAttributes; content?: (context: LoadingContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ loading?: (context: ' },
      { text: 'LoadingContext', link: '#loading-context' },
      { text: ') => HTMLAttributes; content?: (context: ' },
      { text: 'LoadingContext', link: '#loading-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: String(loadingDefaults.ui),
    description: 'Atributos personalizados para loading y content.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'LoadingContext',
    typeLink: '#loading-context',
    default: '-',
    description: 'Contenido mostrado cuando loading es false.',
  },
  {
    name: 'loading',
    type: 'LoadingContext',
    typeLink: '#loading-context',
    default: 'Icon',
    description: 'Contenido mostrado durante la carga.',
  },
]

const exposeRows: ApiTableRow[] = []

const contextRows: ApiTableRow[] = [
  {
    name: 'loading',
    type: 'boolean',
    default: '-',
    description: 'Indica si el componente esta mostrando el estado de carga.',
  },
]
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

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="loading-context" title="LoadingContext" :rows="contextRows" />
    </div>
  </section>
</template>
