<script setup lang="ts">
import { computed, ref } from 'vue'

import { MeterGroup, type MeterGroupItem, type MeterGroupProps } from '@/components/ui/MeterGroup'
import { meterGroupDefaults } from '@/components/ui/MeterGroup/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const playgroundMax = ref(meterGroupDefaults.max)
const playgroundOrientation = ref<MeterGroupProps['orientation']>('horizontal')
const playgroundSize = ref<MeterGroupProps['size']>(meterGroupDefaults.size)
const playgroundStatus = ref(meterGroupDefaults.status)

const playgroundItems: MeterGroupItem[] = [
  { label: 'System', value: 19, color: '#2563eb', icon: { name: 'file' } },
  { label: 'Apps', value: 6, color: '#7c3aed', icon: { name: 'fileText' } },
  { label: 'Documents', value: 9, color: '#db2777', icon: { name: 'fileSpreadsheet' } },
  { label: 'Multimedia', value: 33, color: '#ea580c', icon: { name: 'image' } },
]

const playgroundProps = computed<Omit<MeterGroupProps, 'items'>>(() => ({
  max: playgroundMax.value,
  orientation: playgroundOrientation.value,
  size: playgroundSize.value,
  status: playgroundStatus.value,
}))

const itemRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'number',
    required: true,
    description: 'Valor de la categoría dentro del grupo.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Texto mostrado en la leyenda de la categoría.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Color CSS usado para el segmento y su indicador visual.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono mostrado en la leyenda usando su nombre y el color del item.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'items',
    type: 'MeterGroupItem[]',
    typeLink: '#metergroup-item',
    default: '[]',
    description: 'Categorías que forman el grupo de medidores.',
  },
  {
    name: 'max',
    type: 'number',
    default: String(meterGroupDefaults.max),
    description: 'Valor máximo contra el que se calcula el total y cada porcentaje.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: meterGroupDefaults.orientation,
    description: 'Orientación global reenviada a ProgressRoot de Reka UI.',
  },
  {
    name: 'size',
    type: "'2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
    default: meterGroupDefaults.size,
    description: 'Tamaño del track y de los elementos visuales de la leyenda.',
  },
  {
    name: 'status',
    type: 'boolean',
    default: String(meterGroupDefaults.status),
    description: 'Muestra el estado porcentual total encima del medidor.',
  },
  {
    name: 'ui',
    type: '{ status?: (context: MeterGroupStatusContext) => HTMLAttributes; meter?: (context: MeterGroupStatusContext) => HTMLAttributes; list?: () => HTMLAttributes; item?: (context: MeterGroupItemContext) => HTMLAttributes; label?: (context: MeterGroupItemContext) => HTMLAttributes; leading?: (context: MeterGroupItemContext) => HTMLAttributes; trailing?: (context: MeterGroupItemContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ status?: (context: ' },
      { text: 'MeterGroupStatusContext', link: '#metergroup-status-context' },
      { text: ') => HTMLAttributes; meter?: (context: ' },
      { text: 'MeterGroupStatusContext', link: '#metergroup-status-context' },
      { text: ') => HTMLAttributes; list?: () => HTMLAttributes; item?: (context: ' },
      { text: 'MeterGroupItemContext', link: '#metergroup-item-context' },
      { text: ') => HTMLAttributes; label?: (context: ' },
      { text: 'MeterGroupItemContext', link: '#metergroup-item-context' },
      { text: ') => HTMLAttributes; leading?: (context: ' },
      { text: 'MeterGroupItemContext', link: '#metergroup-item-context' },
      { text: ') => HTMLAttributes; trailing?: (context: ' },
      { text: 'MeterGroupItemContext', link: '#metergroup-item-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Resuelve los atributos de status, meter, list, item, label, leading y trailing.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'status',
    type: 'MeterGroupStatusContext',
    typeLink: '#metergroup-status-context',
    default: 'porcentaje total',
    description: 'Personaliza el estado superior.',
  },
  {
    name: 'item',
    type: 'MeterGroupItemContext',
    typeLink: '#metergroup-item-context',
    default: 'item-leading, item-label, item-trailing',
    description: 'Personaliza el contenido completo de cada entrada de la leyenda.',
  },
  {
    name: 'item-leading',
    type: 'MeterGroupItemContext',
    typeLink: '#metergroup-item-context',
    default: 'círculo de color',
    description: 'Personaliza la parte izquierda de cada entrada.',
  },
  {
    name: 'item-label',
    type: 'MeterGroupItemContext',
    typeLink: '#metergroup-item-context',
    default: 'item.label',
    description: 'Personaliza el texto de cada entrada.',
  },
  {
    name: 'item-trailing',
    type: 'MeterGroupItemContext',
    typeLink: '#metergroup-item-context',
    default: 'porcentaje',
    description: 'Personaliza el porcentaje de cada entrada.',
  },
]

const emitRows: ApiTableRow[] = []
const exposeRows: ApiTableRow[] = []

const statusContextRows: ApiTableRow[] = [
  {
    name: 'total',
    type: 'number',
    description: 'Total mostrado, limitado por max.',
  },
  {
    name: 'percentage',
    type: 'number',
    description: 'Porcentaje total calculado respecto a max.',
  },
]

const itemContextRows: ApiTableRow[] = [
  {
    name: 'item',
    type: 'MeterGroupItem',
    typeLink: '#metergroup-item',
    description: 'Elemento original de la categoría.',
  },
  {
    name: 'index',
    type: 'number',
    description: 'Posición del elemento dentro de items.',
  },
  {
    name: 'percentage',
    type: 'number',
    description: 'Porcentaje de la categoría respecto a max.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">MeterGroup</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Medidor segmentado para representar cómo se distribuye un total entre varias categorías.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Ajusta el valor máximo, la orientación, el tamaño y si se muestra el estado total.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <div class="w-full max-w-md">
              <MeterGroup :items="playgroundItems" v-bind="playgroundProps" />
            </div>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">max</span>
            <input
              v-model.number="playgroundMax"
              type="number"
              min="1"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">orientation</span>
            <select
              v-model="playgroundOrientation"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">size</span>
            <select
              v-model="playgroundSize"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="2xs">2xs</option>
              <option value="xs">xs</option>
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
              <option value="xl">xl</option>
              <option value="2xl">2xl</option>
            </select>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="playgroundStatus" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">Mostrar status</span>
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="metergroup-item" title="MeterGroupItem" :rows="itemRows" />
      <ApiTable
        id="metergroup-status-context"
        title="MeterGroupStatusContext"
        :rows="statusContextRows"
      />
      <ApiTable
        id="metergroup-item-context"
        title="MeterGroupItemContext"
        :rows="itemContextRows"
      />
    </div>
  </section>
</template>
