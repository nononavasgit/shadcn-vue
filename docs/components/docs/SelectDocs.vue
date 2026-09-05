<script setup lang="ts">
import { selectDefaults } from '@/components/ui/Select'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'string | number',
    default: 'undefined',
    description: 'Valor controlado mediante v-model:value.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: String(selectDefaults.disabled),
    description: 'Deshabilita el trigger y la interacción con las opciones.',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: String(selectDefaults.loading),
    description: 'Muestra un spinner en el value y oculta el panel mientras carga.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: String(selectDefaults.placeholder),
    description: 'Texto mostrado cuando no hay ninguna opción seleccionada.',
  },
  {
    name: 'items',
    type: 'SelectItem[]',
    typeLink: '#select-item',
    default: '[]',
    description: 'Opciones que se renderizan directamente en el viewport.',
  },
  {
    name: 'groups',
    type: 'SelectGroup[]',
    typeLink: '#select-group',
    default: '[]',
    description: 'Grupos de opciones. Cuando tiene contenido, sustituye a items.',
  },
  {
    name: 'ui',
    type: '{ root?: () => HTMLAttributes; trigger?: (context: SelectContext) => HTMLAttributes; value?: (context: SelectContext) => HTMLAttributes; icon?: (context: SelectContext) => HTMLAttributes; content?: (context: SelectContext) => HTMLAttributes; viewport?: (context: SelectContext) => HTMLAttributes; scrollUpButton?: (context: SelectContext) => HTMLAttributes; scrollDownButton?: (context: SelectContext) => HTMLAttributes; group?: (context: SelectGroupContext) => HTMLAttributes; groupLabel?: (context: SelectGroupContext) => HTMLAttributes; item?: (context: SelectItemContext) => HTMLAttributes; itemText?: (context: SelectItemContext) => HTMLAttributes; indicator?: (context: SelectItemContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ root?: () => HTMLAttributes; trigger?: (context: ' },
      { text: 'SelectContext', link: '#select-context' },
      { text: ') => HTMLAttributes; value?: (context: ' },
      { text: 'SelectContext', link: '#select-context' },
      { text: ') => HTMLAttributes; content?: (context: ' },
      { text: 'SelectContext', link: '#select-context' },
      { text: ') => HTMLAttributes; viewport?: (context: ' },
      { text: 'SelectContext', link: '#select-context' },
      { text: ') => HTMLAttributes; scrollUpButton?: (context: ' },
      { text: 'SelectContext', link: '#select-context' },
      { text: ') => HTMLAttributes; scrollDownButton?: (context: ' },
      { text: 'SelectContext', link: '#select-context' },
      { text: ') => HTMLAttributes; group?: (context: ' },
      { text: 'SelectGroupContext', link: '#select-group-context' },
      { text: ') => HTMLAttributes; groupLabel?: (context: ' },
      { text: 'SelectGroupContext', link: '#select-group-context' },
      { text: ') => HTMLAttributes; item?: (context: ' },
      { text: 'SelectItemContext', link: '#select-item-context' },
      { text: ') => HTMLAttributes; itemText?: (context: ' },
      { text: 'SelectItemContext', link: '#select-item-context' },
      { text: ') => HTMLAttributes; indicator?: (context: ' },
      { text: 'SelectItemContext', link: '#select-item-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Personalización dinámica de las partes internas.',
  },
]

const itemRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'string | number',
    required: true,
    description: 'Valor que se emite al seleccionar la opción.',
  },
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'Texto visible de la opción y del trigger seleccionado.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono anterior al texto de la opción.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Impide seleccionar la opción.',
  },
  {
    name: 'textValue',
    type: 'string',
    default: 'undefined',
    description: 'Texto alternativo usado por el typeahead de Reka.',
  },
]

const groupRows: ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'Etiqueta accesible y visible del grupo.',
  },
  {
    name: 'items',
    type: 'SelectItem[]',
    typeLink: '#select-item',
    required: true,
    description: 'Opciones que contiene el grupo.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: string | number | undefined]',
    default: '-',
    description: 'Actualiza el valor controlado.',
  },
  {
    name: 'update:open',
    type: '[open: boolean]',
    default: '-',
    description: 'Notifica cuando el panel se abre o se cierra.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'loading',
    type: 'SelectContext',
    typeLink: '#select-context',
    description: 'Personaliza el contenido mostrado mientras el Select está cargando.',
  },
  {
    name: 'value',
    type: 'SelectContext',
    typeLink: '#select-context',
    description: 'Personaliza el valor mostrado en el trigger.',
  },
  {
    name: 'icon',
    type: 'SelectContext',
    typeLink: '#select-context',
    description: 'Reemplaza el icono de apertura.',
  },
  {
    name: 'item',
    type: 'SelectItemContext',
    typeLink: '#select-item-context',
    description: 'Personaliza el texto de todas las opciones.',
  },
  {
    name: 'item-leading',
    type: 'SelectItemContext',
    typeLink: '#select-item-context',
    description: 'Añade contenido antes del texto de todas las opciones.',
  },
  {
    name: 'item-label',
    type: 'SelectItemContext',
    typeLink: '#select-item-context',
    description: 'Personaliza la etiqueta de todas las opciones.',
  },
  {
    name: 'indicator',
    type: 'SelectItemContext',
    typeLink: '#select-item-context',
    description: 'Personaliza el indicador de selección.',
  },
  {
    name: 'group-label',
    type: 'SelectGroupContext',
    typeLink: '#select-group-context',
    description: 'Personaliza las etiquetas de los grupos.',
  },
  {
    name: 'scroll-up / scroll-down',
    type: 'SelectContext',
    typeLink: '#select-context',
    description: 'Personaliza los botones de scroll del viewport.',
  },
]

const contextRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'string | number | undefined',
    description: 'Valor actualmente seleccionado.',
  },
  {
    name: 'open',
    type: 'boolean',
    description: 'Indica si el contenido está abierto.',
  },
]

const itemContextRows: ApiTableRow[] = [
  { name: 'item', type: 'SelectItem', typeLink: '#select-item', description: 'Opción actual.' },
  { name: 'index', type: 'number', description: 'Índice de la opción.' },
  { name: 'selected', type: 'boolean', description: 'Indica si la opción está seleccionada.' },
  { name: 'group', type: 'SelectGroup', typeLink: '#select-group', description: 'Grupo padre.' },
]

const groupContextRows: ApiTableRow[] = [
  { name: 'group', type: 'SelectGroup', typeLink: '#select-group', description: 'Grupo actual.' },
  { name: 'index', type: 'number', description: 'Índice del grupo.' },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Select</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Selector accesible basado en Reka UI con items, grupos, placeholder y slots contextuales.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable id="select-item" title="SelectItem" :rows="itemRows" />
      <ApiTable id="select-group" title="SelectGroup" :rows="groupRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="[]" empty-text="Este componente no expone metodos." />
      <ApiTable id="select-context" title="SelectContext" :rows="contextRows" />
      <ApiTable id="select-item-context" title="SelectItemContext" :rows="itemContextRows" />
      <ApiTable id="select-group-context" title="SelectGroupContext" :rows="groupContextRows" />
    </div>
  </section>
</template>
