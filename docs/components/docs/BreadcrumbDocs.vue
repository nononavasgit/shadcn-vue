<script setup lang="ts">
import { computed, ref } from 'vue'

import { Breadcrumb, type BreadcrumbItem, type BreadcrumbProps } from '@/components/ui/Breadcrumb'
import { breadcrumbDefaults } from '@/components/ui/Breadcrumb/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const playgroundItems = ref<BreadcrumbItem[]>([
  { value: 'home', link: { label: 'Home', to: '/' } },
  { value: 'library', link: { label: 'Library', to: '/library' } },
  { value: 'components', link: { label: 'Components', to: '/components' } },
  { value: 'breadcrumb', link: { label: 'Breadcrumb' } },
])
const playgroundEllipsis = ref(true)

const playgroundProps = computed<BreadcrumbProps>(() => ({
  items: playgroundItems.value,
  ellipsisIndex: playgroundEllipsis.value ? [1, 2] : undefined,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'BreadcrumbItem',
    type: '{ value; link: LinkProps }',
    description: 'Elemento individual con las propiedades de Link.',
  },
  {
    name: 'BreadcrumbItemContext',
    type: '{ item; index; first; last; linked; ellipsis }',
    description: 'Contexto de cada item renderizado.',
  },
  {
    name: 'BreadcrumbEllipsisContext',
    type: '{ items }',
    description: 'Contexto de los items afectados/ocultos por la elipsis.',
  },
  {
    name: 'BreadcrumbUI',
    type: '{ list?; ellipsisContainer?; separatorContainer?; item?; link?; page?; label? }',
    description: 'Resolvers para personalizar cada nodo del breadcrumb.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'items',
    type: 'BreadcrumbItem[]',
    default: '[]',
    description: 'Items que forman la ruta de navegación.',
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
    default: `{ name: '${breadcrumbDefaults.ellipsisIcon.name}' }`,
    description: 'Icono usado para representar el rango oculto.',
  },
  {
    name: 'separatorIcon',
    type: 'IconConfig',
    default: `{ name: '${breadcrumbDefaults.separatorIcon.name}' }`,
    description: 'Icono mostrado entre los items.',
  },
  {
    name: 'ui',
    type: 'BreadcrumbUI',
    default: 'undefined',
    description: 'Personalización dinámica de los nodos internos del componente.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'ellipsis',
    type: 'BreadcrumbEllipsisContext',
    default: 'ellipsisIcon',
    description: 'Personaliza la representación del rango oculto.',
  },
  {
    name: 'separator',
    type: 'void',
    default: 'separatorIcon',
    description: 'Personaliza el separador entre items.',
  },
  {
    name: 'item',
    type: 'BreadcrumbItemContext',
    default: 'item',
    description: 'Personaliza el contenido de cada item.',
  },
  {
    name: 'icon',
    type: 'BreadcrumbItemContext',
    default: 'item.link.icon',
    description: 'Personaliza el icono de cada item.',
  },
  {
    name: 'item-{value}',
    type: 'BreadcrumbItemContext',
    default: 'item',
    description: 'Slot específico para un item identificado.',
  },
  {
    name: 'icon-{value}',
    type: 'BreadcrumbItemContext',
    default: 'item.link.icon',
    description: 'Slot específico para el icono de un item.',
  },
]

const emitRows: ApiTableRow[] = []
const exposeRows: ApiTableRow[] = []
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

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">Tipos públicos usados por la API.</p>
      </div>
      <ApiTable title="Tipos" :rows="typeRows" />
    </section>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Alterna la elipsis para comprobar la navegación completa y la ruta comprimida.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-40 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Breadcrumb v-bind="playgroundProps" />
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="playgroundEllipsis"
              type="checkbox"
              class="size-4 rounded border-input"
            />
            <span class="font-medium">Mostrar elipsis</span>
          </label>

          <p class="text-xs text-muted-foreground">
            Items: {{ playgroundItems.length }} · Rango:
            {{ playgroundEllipsis ? '[1, 2]' : 'ninguno' }}
          </p>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable title="Slots" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
