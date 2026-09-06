<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'as',
    type: 'string | Component',
    default: "'div'",
    description: 'Elemento o componente que renderiza la burbuja.',
  },
  {
    name: 'asChild',
    type: 'boolean',
    default: 'false',
    description: 'Fusiona los atributos y estilos de Bubble en el único hijo del slot default.',
  },
  {
    name: 'align',
    type: "'start' | 'end'",
    default: "'start'",
    description: 'Alineacion de la burbuja en la conversacion.',
  },
  {
    name: 'variant',
    type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'muted'",
    default: "'solid'",
    description: 'Tratamiento visual de la burbuja.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    default: "'primary'",
    description: 'Significado semantico y color de la burbuja.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Color CSS personalizado que sustituye el color de severity.',
  },
  {
    name: 'sideReaction',
    type: "'top' | 'bottom'",
    default: "'bottom'",
    description: 'Lado de la burbuja al que se anclan las reacciones.',
  },
  {
    name: 'alignReaction',
    type: "'start' | 'end'",
    default: "'end'",
    description: 'Alineacion horizontal de las reacciones.',
  },
  {
    name: 'ui',
    type: '{ root?: () => HTMLAttributes; reactions?: () => HTMLAttributes }',
    default: 'undefined',
    description: 'Resolvers de atributos para root y reactions.',
  },
]
const emitRows: ApiTableRow[] = []
const slotRows: ApiTableRow[] = [
  { name: 'default', type: '-', description: 'Contenido conversacional de la burbuja.' },
  {
    name: 'reactions',
    type: '-',
    description: 'Reacciones o acciones posicionadas sobre el borde inferior.',
  },
]
const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Bubble</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Muestra contenido conversacional dentro de una burbuja alineable y con variantes visuales.
      </p>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Configura la posicion de <code>reactions</code> mediante <code>sideReaction</code> y
        <code>alignReaction</code>.
      </p>
    </header>
    <div class="grid gap-4">
      <ApiTable id="bubble-props" title="Props" :rows="propRows" />
      <ApiTable
        id="bubble-emits"
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable
        id="bubble-slots"
        title="Slots"
        :rows="slotRows"
        type-label="slotProps"
        :show-default="false"
      />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
