<script setup lang="ts">
import { paginationDefaults } from '@/components/ui/Pagination/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'page',
    type: 'number',
    default: '1',
    description: 'Página controlada mediante v-model:page.',
  },
  {
    name: 'total',
    type: 'number',
    default: String(paginationDefaults.total),
    description: 'Número total de elementos.',
  },
  {
    name: 'itemsPerPage',
    type: 'number',
    default: String(paginationDefaults.itemsPerPage),
    description: 'Número de elementos por página.',
  },
  {
    name: 'siblingCount',
    type: 'number',
    default: String(paginationDefaults.siblingCount),
    description: 'Páginas visibles a cada lado de la página actual.',
  },
  {
    name: 'showEdges',
    type: 'boolean',
    default: String(paginationDefaults.showEdges),
    description: 'Muestra la primera y última página.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: String(paginationDefaults.disabled),
    description: 'Deshabilita la navegación.',
  },
  {
    name: 'showControls',
    type: 'boolean',
    default: String(paginationDefaults.showControls),
    description: 'Muestra los controles de navegación.',
  },
  {
    name: 'color',
    type: 'ButtonProps[color]',
    typeLink: '/button#button-props',
    default: 'undefined',
    description: 'Color de los botones.',
  },
  {
    name: 'variant',
    type: 'ButtonProps[variant]',
    typeLink: '/button#button-props',
    default: `'${paginationDefaults.variant}'`,
    description: 'Variante de los botones.',
  },
  {
    name: 'size',
    type: 'ButtonProps[size]',
    typeLink: '/button#button-props',
    default: `'${paginationDefaults.size}'`,
    description: 'Tamaño de los botones.',
  },
  {
    name: 'severity',
    type: 'ButtonProps[severity]',
    typeLink: '/button#button-props',
    default: `'${paginationDefaults.severity}'`,
    description: 'Severidad de los botones.',
  },
  {
    name: 'activeColor',
    type: 'ButtonProps[color]',
    typeLink: '/button#button-props',
    default: 'undefined',
    description: 'Color de la página activa.',
  },
  {
    name: 'activeVariant',
    type: 'ButtonProps[variant]',
    typeLink: '/button#button-props',
    default: `'${paginationDefaults.activeVariant}'`,
    description: 'Variante de la página activa.',
  },
  {
    name: 'firstIcon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: '{ name: chevronsLeft }',
    description: 'Icono del control de primera página.',
  },
  {
    name: 'previousIcon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: '{ name: chevronLeft }',
    description: 'Icono del control anterior.',
  },
  {
    name: 'nextIcon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: '{ name: chevronRight }',
    description: 'Icono del control siguiente.',
  },
  {
    name: 'lastIcon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: '{ name: chevronsRight }',
    description: 'Icono del control de última página.',
  },
  {
    name: 'ellipsisIcon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: '{ name: moreHorizontal }',
    description: 'Icono de la elipsis.',
  },
  {
    name: 'ui',
    type: '{ root?: (context: PaginationContext) => HTMLAttributes; list?: (context: PaginationContext) => HTMLAttributes; first?: (context: PaginationContext) => HTMLAttributes; previous?: (context: PaginationContext) => HTMLAttributes; next?: (context: PaginationContext) => HTMLAttributes; last?: (context: PaginationContext) => HTMLAttributes; item?: (context: PaginationItemContext) => HTMLAttributes; ellipsis?: (context: PaginationItemContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ root?: (context: ' },
      { text: 'PaginationContext', link: '#pagination-context' },
      { text: ') => HTMLAttributes; list?: (context: ' },
      { text: 'PaginationContext', link: '#pagination-context' },
      { text: ') => HTMLAttributes; first?: (context: ' },
      { text: 'PaginationContext', link: '#pagination-context' },
      { text: ') => HTMLAttributes; previous?: (context: ' },
      { text: 'PaginationContext', link: '#pagination-context' },
      { text: ') => HTMLAttributes; next?: (context: ' },
      { text: 'PaginationContext', link: '#pagination-context' },
      { text: ') => HTMLAttributes; last?: (context: ' },
      { text: 'PaginationContext', link: '#pagination-context' },
      { text: ') => HTMLAttributes; item?: (context: ' },
      { text: 'PaginationItemContext', link: '#pagination-item-context' },
      { text: ') => HTMLAttributes; ellipsis?: (context: ' },
      { text: 'PaginationItemContext', link: '#pagination-item-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Personalización dinámica de las partes internas.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:page',
    type: '[page: number]',
    default: '-',
    description: 'Actualiza la página controlada.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'PaginationContext',
    typeLink: '#pagination-context',
    description: 'Contenido adicional junto a la paginación.',
  },
  {
    name: 'preContent',
    type: 'PaginationContext',
    typeLink: '#pagination-context',
    description: 'Contenido antes de los controles.',
  },
  {
    name: 'postContent',
    type: 'PaginationContext',
    typeLink: '#pagination-context',
    description: 'Contenido después de los controles.',
  },
  {
    name: 'first',
    type: 'PaginationContext',
    typeLink: '#pagination-context',
    description: 'Control de primera página.',
  },
  {
    name: 'previous',
    type: 'PaginationContext',
    typeLink: '#pagination-context',
    description: 'Control de página anterior.',
  },
  {
    name: 'next',
    type: 'PaginationContext',
    typeLink: '#pagination-context',
    description: 'Control de página siguiente.',
  },
  {
    name: 'last',
    type: 'PaginationContext',
    typeLink: '#pagination-context',
    description: 'Control de última página.',
  },
  {
    name: 'item',
    type: 'PaginationItemContext',
    typeLink: '#pagination-item-context',
    description: 'Personaliza cualquier página.',
  },
  {
    name: 'item-{page}',
    type: 'PaginationItemContext',
    typeLink: '#pagination-item-context',
    description: 'Personaliza una página concreta.',
  },
  {
    name: 'ellipsis',
    type: 'PaginationItemContext',
    typeLink: '#pagination-item-context',
    description: 'Personaliza cualquier elipsis.',
  },
  {
    name: 'ellipsis-{index}',
    type: 'PaginationItemContext',
    typeLink: '#pagination-item-context',
    description: 'Personaliza una elipsis concreta.',
  },
]

const exposeRows: ApiTableRow[] = []

const contextRows: ApiTableRow[] = [
  { name: 'page', type: 'number', description: 'Página activa.' },
  { name: 'pageCount', type: 'number', description: 'Número total de páginas calculado.' },
]

const itemContextRows: ApiTableRow[] = [
  {
    name: 'item',
    type: "{ type: 'page'; value: number } | { type: 'ellipsis' }",
    description: 'Elemento generado por Reka UI.',
  },
  { name: 'index', type: 'number', description: 'Índice del elemento generado.' },
  { name: 'active', type: 'boolean', description: 'Indica si la página está activa.' },
  { name: 'first', type: 'boolean', description: 'Indica si es el primer elemento.' },
  { name: 'last', type: 'boolean', description: 'Indica si es el último elemento.' },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Pagination</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Navegación accesible entre páginas con controles, slots y personalización visual.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="pagination-context" title="PaginationContext" :rows="contextRows" />
      <ApiTable
        id="pagination-item-context"
        title="PaginationItemContext"
        :rows="itemContextRows"
      />
    </div>
  </section>
</template>
