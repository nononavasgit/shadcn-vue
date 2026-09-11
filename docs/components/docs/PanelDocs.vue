<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'open',
    type: 'boolean',
    default: 'false',
    description: 'Controla si el panel está abierto.',
  },
  {
    name: 'variant',
    type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'",
    default: "'solid'",
    description: 'Define el estilo visual del borde y el contenido.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'success' | 'error' | 'warning'",
    default: "'primary'",
    description: 'Define el color semántico del panel.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Color personalizado aplicado al borde.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Texto mostrado en el encabezado.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono mostrado junto a la etiqueta.',
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: 'true',
    description: 'Permite abrir y cerrar el contenido.',
  },
  {
    name: 'ui',
    type: 'PanelUI',
    typeParts: [
      { text: '{ trigger?: (context: ' },
      { text: 'PanelContext', link: '#panel-context' },
      { text: ') => HTMLAttributes; label?: (context: ' },
      { text: 'PanelContext', link: '#panel-context' },
      { text: ') => HTMLAttributes; arrows?: (context: ' },
      { text: 'PanelContext', link: '#panel-context' },
      { text: ') => HTMLAttributes; content?: (context: ' },
      { text: 'PanelContext', link: '#panel-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Resuelve atributos y estilos para cada parte del panel.',
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
    type: 'PanelContext',
    typeLink: '#panel-context',
    default: '-',
    description: 'Contenido del panel.',
  },
  {
    name: 'label',
    type: 'PanelContext',
    typeLink: '#panel-context',
    default: '-',
    description: 'Contenido personalizado de la etiqueta.',
  },
  {
    name: 'icon',
    type: 'PanelContext',
    typeLink: '#panel-context',
    default: '-',
    description: 'Icono personalizado.',
  },
  {
    name: 'arrows',
    type: 'PanelContext',
    typeLink: '#panel-context',
    default: '-',
    description: 'Indicador de apertura personalizado.',
  },
]
const contextRows: ApiTableRow[] = [
  { name: 'open', type: 'boolean', description: 'Estado actual del panel.' },
]
</script>
<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Panel</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Panel expandible accesible con estado controlado, slots y personalización por UI.
      </p>
    </header>
    <div class="grid gap-4">
      <ApiTable id="panel-props" title="Props" :rows="propRows" />
      <ApiTable id="panel-emits" title="Emits" :rows="emitRows" />
      <ApiTable id="panel-slots" title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable title="Expose" :rows="[]" empty-text="Este componente no expone métodos." />
      <ApiTable id="panel-context" title="PanelContext" :rows="contextRows" />
    </div>
  </section>
</template>
