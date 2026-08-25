<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const itemRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'string',
    default: '-',
    description: 'Identificador unico del item.',
  },
  {
    name: 'slot',
    type: 'string',
    default: 'undefined',
    description: 'Clave para resolver los slots especificos del item.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Texto del trigger.',
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Contenido mostrado al abrir el item.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono mostrado junto al label.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'undefined',
    description: 'Desactiva el item individualmente.',
  },
  {
    name: 'unmountOnHide',
    type: 'boolean',
    default: 'undefined',
    description: 'Controla si desmonta el contenido cerrado.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'type',
    type: "'single' | 'multiple'",
    default: "'single'",
    description: 'Modo de apertura del acordeon.',
  },
  {
    name: 'value',
    type: 'string | string[] | undefined',
    default: 'undefined',
    description: 'Item o items abiertos actualmente.',
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: 'false',
    description: 'Permite cerrar el item abierto en modo single.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Desactiva todos los items.',
  },
  {
    name: 'unmountOnHide',
    type: 'boolean',
    default: 'true',
    description: 'Desmonta el contenido de los items cerrados.',
  },
  {
    name: 'items',
    type: 'AccordionItem[]',
    typeLink: '#accordion-item',
    default: '[]',
    description: 'Items que renderiza el acordeon.',
  },
  {
    name: 'iconDropDownOpen',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: "'chevronUp'",
    description: 'Icono del item abierto.',
  },
  {
    name: 'iconDropDownClose',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: "'chevronDown'",
    description: 'Icono del item cerrado.',
  },
  {
    name: 'ui',
    type: '{ item?: (context: AccordionItemContext) => HTMLAttributes; trigger?: (context: AccordionItemContext) => HTMLAttributes; content?: (context: AccordionItemContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ item?: (context: ' },
      { text: 'AccordionItemContext', link: '#accordion-item-context' },
      { text: ') => HTMLAttributes; trigger?: (context: ' },
      { text: 'AccordionItemContext', link: '#accordion-item-context' },
      { text: ') => HTMLAttributes; content?: (context: ' },
      { text: 'AccordionItemContext', link: '#accordion-item-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Atributos personalizados para item, trigger y content.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: AccordionValue]',
    default: '-',
    description: 'Actualiza el valor de los items abiertos.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'trigger',
    type: 'AccordionItemContext',
    typeLink: '#accordion-item-context',
    default: '-',
    description: 'Trigger global.',
  },
  {
    name: 'leading',
    type: 'AccordionItemContext',
    typeLink: '#accordion-item-context',
    default: '-',
    description: 'Icono del item.',
  },
  {
    name: 'label',
    type: 'AccordionItemContext',
    typeLink: '#accordion-item-context',
    default: '-',
    description: 'Label del item.',
  },
  {
    name: 'iconDropdown',
    type: 'AccordionItemContext',
    typeLink: '#accordion-item-context',
    default: '-',
    description: 'Icono que indica el estado del item.',
  },
  {
    name: 'content',
    type: 'AccordionItemContext',
    typeLink: '#accordion-item-context',
    default: '-',
    description: 'Contenido global.',
  },
  {
    name: 'trigger-{slot}',
    type: 'AccordionItemContext',
    typeLink: '#accordion-item-context',
    default: '-',
    description: 'Trigger especifico de un item.',
  },
  {
    name: 'label-{slot}',
    type: 'AccordionItemContext',
    typeLink: '#accordion-item-context',
    default: '-',
    description: 'Label especifico de un item.',
  },
  {
    name: 'leading-{slot}',
    type: 'AccordionItemContext',
    typeLink: '#accordion-item-context',
    default: '-',
    description: 'Icono especifico de un item.',
  },
  {
    name: 'content-{slot}',
    type: 'AccordionItemContext',
    typeLink: '#accordion-item-context',
    default: '-',
    description: 'Contenido especifico de un item.',
  },
]

const exposeRows: ApiTableRow[] = []

const contextRows: ApiTableRow[] = [
  {
    name: 'item',
    type: 'AccordionItem',
    typeLink: '#accordion-item',
    description: 'Configuracion del item actual.',
  },
  { name: 'index', type: 'number', description: 'Posicion del item.' },
  { name: 'open', type: 'boolean', description: 'Indica si el item esta abierto.' },
  { name: 'first', type: 'boolean', description: 'Indica si es el primer item.' },
  { name: 'last', type: 'boolean', description: 'Indica si es el ultimo item.' },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Accordion</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Organiza contenido relacionado en secciones expandibles con soporte single y multiple.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="accordion-props" title="Props" :rows="propRows" />
      <ApiTable id="accordion-emits" title="Emits" :rows="emitRows" />
      <ApiTable id="accordion-slots" title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="accordion-item" title="AccordionItem" :rows="itemRows" />
      <ApiTable id="accordion-item-context" title="AccordionItemContext" :rows="contextRows" />
    </div>
  </section>
</template>
