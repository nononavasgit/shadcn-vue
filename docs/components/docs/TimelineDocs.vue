<script setup lang="ts">
import { timelineDefaults } from '@/components/ui/Timeline'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'items',
    type: 'TimelineItem[]',
    typeLink: '#timeline-item',
    required: true,
    default: '-',
    description: 'Eventos que se muestran en la línea temporal. Cada item requiere value.',
  },
  {
    name: 'value',
    type: 'string | number',
    default: 'undefined',
    description: 'Valor activo controlado mediante v-model:value.',
  },
  {
    name: 'orientation',
    type: "'vertical' | 'horizontal'",
    default: timelineDefaults.orientation,
    description: 'Orientación de la línea temporal.',
  },
  {
    name: 'align',
    type: "'left' | 'right' | 'alternate'",
    default: timelineDefaults.align,
    description: 'Lado de los contenidos en orientación vertical u horizontal.',
  },
  {
    name: 'sizeIndicator',
    type: "'sm' | 'md' | 'lg' | 'xl'",
    default: timelineDefaults.sizeIndicator,
    description: 'Tamaño de los indicadores.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Color CSS aplicado a indicadores y separadores completados.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    default: timelineDefaults.severity,
    description: 'Severidad visual usada cuando no se proporciona color.',
  },
  {
    name: 'reverse',
    type: 'boolean',
    default: String(timelineDefaults.reverse),
    description: 'Muestra los items en orden inverso y recalcula sus estados.',
  },
  {
    name: 'ui',
    type: '{ root?: (context: TimelineContext) => HTMLAttributes; item?: (context: TimelineItemContext) => HTMLAttributes; content?: (context: TimelineItemContext) => HTMLAttributes; header?: (context: TimelineItemContext) => HTMLAttributes; label?: (context: TimelineItemContext) => HTMLAttributes; description?: (context: TimelineItemContext) => HTMLAttributes; indicator?: (context: TimelineItemContext) => HTMLAttributes; separator?: (context: TimelineItemContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ root?: (context: TimelineContext) => HTMLAttributes; item?: (context: ' },
      { text: 'TimelineItemContext', link: '#timeline-item-context' },
      { text: ') => HTMLAttributes; content?: (context: ' },
      { text: 'TimelineItemContext', link: '#timeline-item-context' },
      { text: ') => HTMLAttributes; header?: (context: ' },
      { text: 'TimelineItemContext', link: '#timeline-item-context' },
      { text: ') => HTMLAttributes; label?: (context: ' },
      { text: 'TimelineItemContext', link: '#timeline-item-context' },
      { text: ') => HTMLAttributes; description?: (context: ' },
      { text: 'TimelineItemContext', link: '#timeline-item-context' },
      { text: ') => HTMLAttributes; indicator?: (context: ' },
      { text: 'TimelineItemContext', link: '#timeline-item-context' },
      { text: ') => HTMLAttributes; separator?: (context: ' },
      { text: 'TimelineItemContext', link: '#timeline-item-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description:
      'Personalización dinámica de root, item, content, header, label, description, indicator y separator.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: string | number]',
    default: '-',
    description: 'Actualiza el valor controlado mediante v-model:value.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'header',
    type: 'TimelineItemContext',
    typeLink: '#timeline-item-context',
    default: 'label',
    description: 'Personaliza el encabezado completo de cada item.',
  },
  {
    name: 'label',
    type: 'TimelineItemContext',
    typeLink: '#timeline-item-context',
    default: 'item.label',
    description: 'Personaliza la etiqueta de cada item.',
  },
  {
    name: 'description',
    type: 'TimelineItemContext',
    typeLink: '#timeline-item-context',
    default: 'item.description',
    description: 'Personaliza la descripción de cada item.',
  },
  {
    name: 'indicator',
    type: 'TimelineItemContext',
    typeLink: '#timeline-item-context',
    default: 'item.icon',
    description: 'Personaliza el indicador y sustituye su icono alternativo.',
  },
  {
    name: 'header-{slot}',
    type: 'TimelineItemContext',
    typeLink: '#timeline-item-context',
    default: 'slot header',
    description: 'Personaliza el encabezado de un único item usando su slot.',
  },
  {
    name: 'label-{slot}',
    type: 'TimelineItemContext',
    typeLink: '#timeline-item-context',
    default: 'slot label',
    description: 'Personaliza la etiqueta de un único item usando su slot.',
  },
  {
    name: 'description-{slot}',
    type: 'TimelineItemContext',
    typeLink: '#timeline-item-context',
    default: 'slot description',
    description: 'Personaliza la descripción de un único item usando su slot.',
  },
  {
    name: 'indicator-{slot}',
    type: 'TimelineItemContext',
    typeLink: '#timeline-item-context',
    default: 'slot indicator',
    description: 'Personaliza el indicador de un único item usando su slot.',
  },
]

const contextRows: ApiTableRow[] = [
  {
    name: 'item',
    type: 'TimelineItem',
    typeLink: '#timeline-item',
    description: 'Item actual.',
  },
  { name: 'index', type: 'number', description: 'Índice del item renderizado.' },
  { name: 'active', type: 'boolean', description: 'Indica si el item es el valor activo.' },
  { name: 'completed', type: 'boolean', description: 'Indica si el item está completado.' },
  { name: 'first', type: 'boolean', description: 'Indica si es el primer item.' },
  { name: 'last', type: 'boolean', description: 'Indica si es el último item.' },
  {
    name: 'itemAlign',
    type: "'left' | 'right'",
    description: 'Lado final calculado para el item.',
  },
]

const itemRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'string | number',
    required: true,
    description: 'Identificador del item.',
  },
  {
    name: 'slot',
    type: 'string',
    default: 'value',
    description: 'Clave usada para construir los slots dinámicos del item.',
  },
  { name: 'label', type: 'string', default: 'undefined', description: 'Etiqueta visible.' },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Descripción visible debajo de la etiqueta.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    default: 'undefined',
    description: 'Icono opcional que se muestra dentro del indicador.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Timeline</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Secuencia de eventos con estados completados, orientación, alineación y slots contextuales.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="[]" empty-text="Este componente no expone metodos." />
      <ApiTable id="timeline-item" title="TimelineItem[]" :rows="itemRows" />
      <ApiTable id="timeline-item-context" title="TimelineItemContext" :rows="contextRows" />
    </div>
  </section>
</template>
