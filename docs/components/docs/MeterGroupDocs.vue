<script setup lang="ts">
import { meterGroupDefaults } from '@/components/ui/MeterGroup/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

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
