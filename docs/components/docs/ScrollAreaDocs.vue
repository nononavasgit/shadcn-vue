<script setup lang="ts">
import { scrollAreaDefaults } from '@/components/ui/ScrollArea/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

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
    type: "'vertical' | 'horizontal' | 'both'",
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
    type: '{ viewport?: () => HTMLAttributes; verticalScrollbar?: () => HTMLAttributes; horizontalScrollbar?: () => HTMLAttributes; thumbVertical?: () => HTMLAttributes; thumbHorizontal?: () => HTMLAttributes; corner?: () => HTMLAttributes }',
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

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone métodos." />
    </div>
  </section>
</template>
