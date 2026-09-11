<script setup lang="ts">
import { collapsibleDefaults } from '@/components/ui/Collapsible'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'open',
    type: 'boolean',
    default: 'false',
    description: 'Controla si el contenido esta abierto.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: String(collapsibleDefaults.disabled),
    description: 'Desactiva la apertura y el cierre.',
  },
  {
    name: 'unmountOnHide',
    type: 'boolean',
    default: String(collapsibleDefaults.unmountOnHide),
    description: 'Desmonta el contenido cuando esta cerrado.',
  },
  {
    name: 'ui',
    type: '{ trigger?: (context: CollapsibleContext) => HTMLAttributes; content?: (context: CollapsibleContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ trigger?: (context: ' },
      { text: 'CollapsibleContext', link: '#collapsible-context' },
      { text: ') => HTMLAttributes; content?: (context: ' },
      { text: 'CollapsibleContext', link: '#collapsible-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Atributos y estilos personalizados para trigger y content.',
  },
]
const emitRows: ApiTableRow[] = [
  {
    name: 'update:open',
    type: '[value: boolean]',
    default: '-',
    description: 'Actualiza el estado controlado.',
  },
]
const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'CollapsibleContext',
    typeLink: '#collapsible-context',
    default: '-',
    description: 'Contenido del trigger.',
  },
  {
    name: 'content',
    type: 'CollapsibleContext',
    typeLink: '#collapsible-context',
    default: '-',
    description: 'Contenido expandible.',
  },
]
const contextRows: ApiTableRow[] = [
  { name: 'open', type: 'boolean', description: 'Estado actual.' },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Collapsible</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Panel expandible accesible con trigger, contenido, estado controlado y personalizacion por
        UI.
      </p>
    </header>
    <div class="grid gap-4">
      <ApiTable id="collapsible-props" title="Props" :rows="propRows" />
      <ApiTable id="collapsible-emits" title="Emits" :rows="emitRows" />
      <ApiTable id="collapsible-slots" title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable title="Expose" :rows="[]" empty-text="Este componente no expone metodos." />
      <ApiTable id="collapsible-context" title="CollapsibleContext" :rows="contextRows" />
    </div>
  </section>
</template>
