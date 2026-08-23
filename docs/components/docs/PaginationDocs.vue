<script setup lang="ts">
import { computed, ref } from 'vue'

import type { ButtonSeverity, ButtonSize, ButtonVariant } from '@/components/ui/Button'
import { Pagination, type PaginationProps } from '@/components/ui/Pagination'
import { paginationDefaults } from '@/components/ui/Pagination/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const playgroundPage = ref(1)
const playgroundTotal = ref(95)
const playgroundItemsPerPage = ref(paginationDefaults.itemsPerPage)
const playgroundSiblingCount = ref(paginationDefaults.siblingCount)
const playgroundShowEdges = ref(paginationDefaults.showEdges)
const playgroundShowControls = ref(paginationDefaults.showControls)
const playgroundDisabled = ref(paginationDefaults.disabled)
const playgroundColor = ref('')
const playgroundVariant = ref<ButtonVariant>(paginationDefaults.variant)
const playgroundSize = ref<ButtonSize>(paginationDefaults.size)
const playgroundSeverity = ref<ButtonSeverity>(paginationDefaults.severity)
const playgroundActiveColor = ref('')
const playgroundActiveVariant = ref<ButtonVariant>(paginationDefaults.activeVariant)

const playgroundProps = computed<Omit<PaginationProps, 'page'>>(() => ({
  total: playgroundTotal.value,
  itemsPerPage: playgroundItemsPerPage.value,
  siblingCount: playgroundSiblingCount.value,
  showEdges: playgroundShowEdges.value,
  showControls: playgroundShowControls.value,
  disabled: playgroundDisabled.value,
  color: playgroundColor.value || undefined,
  variant: playgroundVariant.value,
  size: playgroundSize.value,
  severity: playgroundSeverity.value,
  activeColor: playgroundActiveColor.value || undefined,
  activeVariant: playgroundActiveVariant.value,
}))

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

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">Ajusta los valores y observa la paginación.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <div class="grid w-full gap-4">
              <Pagination v-model:page="playgroundPage" v-bind="playgroundProps" />
              <output class="text-center text-sm text-muted-foreground">
                Página actual: {{ playgroundPage }} /
                {{
                  playgroundItemsPerPage > 0
                    ? Math.ceil(playgroundTotal / playgroundItemsPerPage)
                    : 0
                }}
              </output>
            </div>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">total</span>
            <input
              v-model.number="playgroundTotal"
              type="number"
              min="0"
              class="h-9 rounded-md border bg-background px-3 text-sm"
            />
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">itemsPerPage</span>
            <input
              v-model.number="playgroundItemsPerPage"
              type="number"
              min="1"
              class="h-9 rounded-md border bg-background px-3 text-sm"
            />
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">siblingCount</span>
            <input
              v-model.number="playgroundSiblingCount"
              type="number"
              min="0"
              class="h-9 rounded-md border bg-background px-3 text-sm"
            />
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="playgroundShowEdges"
              type="checkbox"
              class="size-4 rounded border-input"
            />
            <span class="font-medium">showEdges</span>
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="playgroundShowControls"
              type="checkbox"
              class="size-4 rounded border-input"
            />
            <span class="font-medium">showControls</span>
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="playgroundDisabled"
              type="checkbox"
              class="size-4 rounded border-input"
            />
            <span class="font-medium">disabled</span>
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">color</span>
            <input
              v-model="playgroundColor"
              type="text"
              placeholder="#2563eb"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">variant</span>
            <select
              v-model="playgroundVariant"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="solid">solid</option>
              <option value="outline">outline</option>
              <option value="plain">plain</option>
              <option value="subtle">subtle</option>
              <option value="soft">soft</option>
              <option value="link">link</option>
            </select>
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">size</span>
            <select
              v-model="playgroundSize"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="xs">xs</option>
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">severity</span>
            <select
              v-model="playgroundSeverity"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="primary">primary</option>
              <option value="secondary">secondary</option>
              <option value="warning">warning</option>
              <option value="success">success</option>
              <option value="error">error</option>
            </select>
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">activeColor</span>
            <input
              v-model="playgroundActiveColor"
              type="text"
              placeholder="#2563eb"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">activeVariant</span>
            <select
              v-model="playgroundActiveVariant"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="solid">solid</option>
              <option value="outline">outline</option>
              <option value="plain">plain</option>
              <option value="subtle">subtle</option>
              <option value="soft">soft</option>
              <option value="link">link</option>
            </select>
          </label>
        </div>
      </div>
    </section>

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
