<script setup lang="ts">
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
    default: 'false',
    description: 'Deshabilita el trigger y la interacción con las opciones.',
  },
  {
    name: 'size',
    type: 'xs | sm | md | lg | xl',
    default: 'md',
    description: 'Tamaño visual del Listbox.',
  },
  {
    name: 'severity',
    type: 'primary | secondary | error | warning | success',
    default: 'primary',
    description: 'Color semántico del borde y anillo de foco.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Color personalizado del borde y anillo de foco.',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Muestra un spinner en el value y oculta el panel mientras carga.',
  },
  {
    name: 'items',
    type: 'ListboxItem[]',
    typeLink: '#listbox-item',
    default: '[]',
    description: 'Opciones que se renderizan directamente en el viewport.',
  },
  {
    name: 'groups',
    type: 'ListboxGroup[]',
    typeLink: '#listbox-group',
    default: '[]',
    description: 'Grupos de opciones. Cuando tiene contenido, sustituye a items.',
  },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Permite seleccionar varias opciones.' },
  { name: 'orientation', type: 'vertical | horizontal', default: 'vertical', description: 'Orientación de la lista.' },
  { name: 'selectionBehavior', type: 'toggle | replace', default: 'toggle', description: 'Comportamiento de la selección.' },
  { name: 'highlightOnHover', type: 'boolean', default: 'true', description: 'Resalta la opción bajo el puntero.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Muestra el estado de carga en lugar del contenido.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Indica que la selección es obligatoria.' },
  { name: 'name', type: 'string', default: 'undefined', description: 'Nombre del control para formularios.' },
  { name: 'search', type: 'string', default: "''", description: 'Texto de búsqueda controlado.' },
  { name: 'filter', type: 'boolean', default: 'false', description: 'Activa el filtro de opciones.' },
  { name: 'filterConfig', type: 'ListboxFilterConfig', typeLink: '#listbox-filter-config', default: 'undefined', description: 'Configuración del criterio de filtrado.' },
  { name: 'virtualize', type: 'boolean', default: 'false', description: 'Activa la virtualización de items con estimateSize 32 y overscan 12.' },
  { name: 'virtualizerConfig', type: 'ListboxVirtualizerConfig', typeLink: '#listbox-virtualizer-config', default: 'undefined', description: 'Personaliza la configuración de la virtualización.' },
  { name: 'ignoreFilter', type: 'boolean', default: 'false', description: 'Muestra el filtro sin aplicarlo.' },
  { name: 'inputFilter', type: 'InputConfig', typeLink: '/input#input-config', default: 'undefined', description: 'Props del Input de filtro.' },
  { name: 'emptyText', type: 'string', default: 'undefined', description: 'Texto para una lista sin opciones.' },
  { name: 'noResultsText', type: 'string', default: 'undefined', description: 'Texto cuando no hay resultados.' },
  {
    name: 'ui',
    type: '{ root?: (context: ListboxContext) => HTMLAttributes; content?: (context: ListboxContext) => HTMLAttributes; empty?: (context: ListboxContext) => HTMLAttributes; noResults?: (context: ListboxContext) => HTMLAttributes; loading?: (context: ListboxContext) => HTMLAttributes; group?: (context: ListboxGroupContext) => HTMLAttributes; groupLabel?: (context: ListboxGroupContext) => HTMLAttributes; item?: (context: ListboxItemContext) => HTMLAttributes; itemLeading?: (context: ListboxItemContext) => HTMLAttributes; itemLabel?: (context: ListboxItemContext) => HTMLAttributes; itemIndicator?: (context: ListboxItemContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ root?: (context: ' },
      { text: 'ListboxContext', link: '#listbox-context' },
      { text: ') => HTMLAttributes; content?: (context: ' },
      { text: 'ListboxContext', link: '#listbox-context' },
      { text: ') => HTMLAttributes; empty?: (context: ' },
      { text: 'ListboxContext', link: '#listbox-context' },
      { text: ') => HTMLAttributes; noResults?: (context: ' },
      { text: 'ListboxContext', link: '#listbox-context' },
      { text: ') => HTMLAttributes; loading?: (context: ' },
      { text: 'ListboxContext', link: '#listbox-context' },
      { text: ') => HTMLAttributes; group?: (context: ' },
      { text: 'ListboxGroupContext', link: '#listbox-group-context' },
      { text: ') => HTMLAttributes; groupLabel?: (context: ' },
      { text: 'ListboxGroupContext', link: '#listbox-group-context' },
      { text: ') => HTMLAttributes; item?: (context: ' },
      { text: 'ListboxItemContext', link: '#listbox-item-context' },
      { text: ') => HTMLAttributes; itemLeading?: (context: ' },
      { text: 'ListboxItemContext', link: '#listbox-item-context' },
      { text: ') => HTMLAttributes; itemLabel?: (context: ' },
      { text: 'ListboxItemContext', link: '#listbox-item-context' },
      { text: ') => HTMLAttributes; itemIndicator?: (context: ' },
      { text: 'ListboxItemContext', link: '#listbox-item-context' },
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
]

const groupRows: ApiTableRow[] = [
  {
    name: 'id',
    type: 'string | number',
    required: true,
    description: 'Identificador único del grupo usado como clave de renderizado.',
  },
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'Etiqueta accesible y visible del grupo.',
  },
  {
    name: 'items',
    type: 'ListboxItem[]',
    typeLink: '#listbox-item',
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
    name: 'update:search',
    type: '[value: string]',
    default: '-',
    description: 'Actualiza el texto de búsqueda.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'filter-leading',
    type: 'ListboxContext',
    typeLink: '#listbox-context',
    description: 'Sustituye el icono mostrado en el filtro.',
  },
  {
    name: 'loading',
    type: 'ListboxContext',
    typeLink: '#listbox-context',
    description: 'Personaliza el contenido mostrado mientras el Listbox está cargando.',
  },
  {
    name: 'item',
    type: 'ListboxItemContext',
    typeLink: '#listbox-item-context',
    description: 'Personaliza el texto de todas las opciones.',
  },
  {
    name: 'item-leading',
    type: 'ListboxItemContext',
    typeLink: '#listbox-item-context',
    description: 'Añade contenido antes del texto de todas las opciones.',
  },
  {
    name: 'item-label',
    type: 'ListboxItemContext',
    typeLink: '#listbox-item-context',
    description: 'Personaliza la etiqueta de cada opción.',
  },
  {
    name: 'item-indicator',
    type: 'ListboxItemContext',
    typeLink: '#listbox-item-context',
    description: 'Personaliza el indicador de selección.',
  },
  {
    name: 'group-label',
    type: 'ListboxGroupContext',
    typeLink: '#listbox-group-context',
    description: 'Personaliza las etiquetas de los grupos.',
  },
  {
    name: 'empty',
    type: 'ListboxContext',
    typeLink: '#listbox-context',
    description: 'Personaliza el estado sin opciones.',
  },
  {
    name: 'no-results',
    type: 'ListboxContext',
    typeLink: '#listbox-context',
    description: 'Personaliza el estado sin resultados.',
  },
]

const contextRows: ApiTableRow[] = [
  { name: 'value', type: 'string | number | (string | number)[] | undefined', description: 'Valor actualmente seleccionado.' },
  { name: 'search', type: 'string', description: 'Texto de búsqueda actual.' },
]

const filterConfigRows: ApiTableRow[] = [
  { name: 'mode', type: 'FilterMode', default: 'contains', description: 'Criterio usado para filtrar las opciones.' },
  { name: 'sensitivity', type: 'FilterSensitivity', default: 'base', description: 'Sensibilidad de la comparación.' },
]

const virtualizerConfigRows: ApiTableRow[] = [
  { name: 'overscan', type: 'number', default: '12', description: 'Número de items renderizados fuera del área visible.' },
  { name: 'estimateSize', type: 'number | ((index: number) => number)', default: '32', description: 'Tamaño estimado en píxeles de cada item.' },
]

const itemContextRows: ApiTableRow[] = [
  { name: 'item', type: 'ListboxItem', typeLink: '#listbox-item', description: 'Opción actual.' },
  { name: 'index', type: 'number', description: 'Índice de la opción.' },
  { name: 'selected', type: 'boolean', description: 'Indica si la opción está seleccionada.' },
  { name: 'group', type: 'ListboxGroup | undefined', typeLink: '#listbox-group', description: 'Grupo padre, cuando la opción pertenece a un grupo.' },
]

const groupContextRows: ApiTableRow[] = [
  { name: 'group', type: 'ListboxGroup', typeLink: '#listbox-group', description: 'Grupo actual.' },
  { name: 'index', type: 'number', description: 'Índice del grupo.' },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Listbox</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Listboxor accesible basado en Reka UI con items, grupos, placeholder y slots contextuales.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable id="listbox-item" title="ListboxItem" :rows="itemRows" />
      <ApiTable id="listbox-group" title="ListboxGroup" :rows="groupRows" />
      <ApiTable id="listbox-filter-config" title="ListboxFilterConfig" :rows="filterConfigRows" />
      <ApiTable id="listbox-virtualizer-config" title="ListboxVirtualizerConfig" :rows="virtualizerConfigRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="[]" empty-text="Este componente no expone metodos." />
      <ApiTable id="listbox-context" title="ListboxContext" :rows="contextRows" />
      <ApiTable id="listbox-item-context" title="ListboxItemContext" :rows="itemContextRows" />
      <ApiTable id="listbox-group-context" title="ListboxGroupContext" :rows="groupContextRows" />
    </div>
  </section>
</template>


