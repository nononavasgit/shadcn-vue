<script setup lang="ts">
import { breadcrumbDefaults } from '@/components/ui/Breadcrumb/default'

import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'items',
    type: 'BreadcrumbItem[]',
    typeLink: '#breadcrumb-item',
    default: '[]',
    description: 'Items que forman la ruta y se convierten en elementos Link.',
  },
  {
    name: 'ellipsisIndex',
    type: '[start: number, end: number]',
    default: 'undefined',
    description: 'Rango inclusivo de items que se representa mediante una elipsis.',
  },
  {
    name: 'ellipsisIcon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: `{ name: '${breadcrumbDefaults.ellipsisIcon.name}' }`,
    description: 'Icono usado para representar el rango oculto.',
  },
  {
    name: 'separatorIcon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: `{ name: '${breadcrumbDefaults.separatorIcon.name}' }`,
    description: 'Icono mostrado entre los items.',
  },
  {
    name: 'ui',
    type: '{ list?: () => HTMLAttributes; ellipsisContainer?: () => HTMLAttributes; separatorContainer?: () => HTMLAttributes; item?: (context: BreadcrumbItemContext) => HTMLAttributes }',
    typeParts: [
      {
        text: '{ list?: () => HTMLAttributes; ellipsisContainer?: () => HTMLAttributes; separatorContainer?: () => HTMLAttributes; item?: (context: ',
      },
      { text: 'BreadcrumbItemContext', link: '#breadcrumb-item-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Personalización dinámica de los nodos internos del componente.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'ellipsis',
    type: 'BreadcrumbEllipsisContext',
    typeLink: '#breadcrumb-ellipsis-context',
    default: 'ellipsisIcon',
    description: 'Personaliza la representación del rango oculto.',
  },
  {
    name: 'separator',
    type: '-',
    default: 'separatorIcon',
    description: 'Personaliza el separador entre items.',
  },
  {
    name: 'item',
    type: 'BreadcrumbItemContext',
    typeLink: '#breadcrumb-item-context',
    default: 'item',
    description: 'Personaliza el contenido de cada item.',
  },
  {
    name: 'item-{slot}',
    type: 'BreadcrumbItemContext',
    typeLink: '#breadcrumb-item-context',
    default: 'item',
    description: 'Slot específico para un item identificado.',
  },
]

const emitRows: ApiTableRow[] = []
const exposeRows: ApiTableRow[] = []

const itemRows: ApiTableRow[] = [
  {
    name: 'slot',
    type: 'string',
    default: '-',
    description: 'Identificador usado por el slot item-{slot}.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Texto mostrado por el Link.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono que recibe el Link del item.',
  },
  {
    name: 'to',
    type: 'RouteLocationRaw | string',
    default: 'undefined',
    description: 'Destino del Link. Si no existe, el item se representa como página actual.',
  },
  {
    name: 'command',
    type: '(event: PointerEvent) => void',
    default: 'undefined',
    description: 'Callback ejecutado al hacer click en un item enlazado.',
  },
]

const itemContextRows: ApiTableRow[] = [
  {
    name: 'item',
    type: 'BreadcrumbItem',
    typeLink: '#breadcrumb-item',
    default: '-',
    description: 'Item asociado al contexto.',
  },
  { name: 'index', type: 'number', default: '-', description: 'Posición del item.' },
  { name: 'first', type: 'boolean', default: '-', description: 'Indica si es el primer item.' },
  { name: 'last', type: 'boolean', default: '-', description: 'Indica si es el último item.' },
  {
    name: 'linked',
    type: 'boolean',
    default: '-',
    description: 'Indica si el item tiene destino de navegación.',
  },
  {
    name: 'ellipsis',
    type: 'boolean',
    default: '-',
    description: 'Indica si representa el inicio del rango comprimido.',
  },
]

const ellipsisContextRows: ApiTableRow[] = [
  {
    name: 'items',
    type: 'BreadcrumbItem[]',
    typeLink: '#breadcrumb-item',
    default: '-',
    description: 'Items ocultos por la elipsis.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Breadcrumb</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Ruta de navegación accesible con enlaces, items actuales, elipsis, iconos y slots.
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
      <ApiTable id="breadcrumb-item" title="BreadcrumbItem" :rows="itemRows" />
      <ApiTable
        id="breadcrumb-item-context"
        title="BreadcrumbItemContext"
        :rows="itemContextRows"
      />
      <ApiTable
        id="breadcrumb-ellipsis-context"
        title="BreadcrumbEllipsisContext"
        :rows="ellipsisContextRows"
      />
    </div>
  </section>
</template>
