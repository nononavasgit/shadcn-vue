<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import {
  Accordion,
  type AccordionItem,
  type AccordionProps,
  type AccordionType,
  type AccordionValue,
} from '@/components/ui/Accordion'
import type { IconConfig } from '@/components/ui/Icon'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const type = ref<AccordionType>('single')
const collapsible = ref(true)
const disabled = ref(false)
const unmountOnHide = ref(true)
const value = ref<AccordionValue>('first')
const iconDropDownOpenObjectInput = ref('')
const iconDropDownCloseObjectInput = ref('')

const defaultItems: AccordionItem[] = [
  {
    value: 'first',
    slot: 'first',
    label: 'What is this component for?',
    description: 'Accordion organizes related content into expandable sections.',
    icon: { name: 'info' },
  },
  {
    value: 'second',
    slot: 'second',
    label: 'Can I open multiple sections?',
    description: 'Use the multiple type to keep more than one section open.',
    icon: { name: 'search' },
  },
  {
    value: 'third',
    slot: 'third',
    label: 'Can an item be disabled?',
    description: 'Each item can be disabled independently from the root.',
    icon: { name: 'check' },
    disabled: true,
  },
]
const itemsInput = ref(JSON.stringify(defaultItems, null, 2))

function parseItems(value: string): AccordionItem[] {
  try {
    const parsed: unknown = JSON.parse(value)

    if (Array.isArray(parsed)) return parsed as AccordionItem[]
  } catch {
    return defaultItems
  }

  return defaultItems
}

function parseIconProps(value: string): IconConfig | undefined {
  if (!value.trim()) return undefined

  try {
    const parsed: unknown = JSON.parse(value)

    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as IconConfig
    }
  } catch {
    return undefined
  }

  return undefined
}

watch(type, (nextType) => {
  value.value = nextType === 'multiple' ? ['first'] : 'first'
})

const playgroundProps = computed<AccordionProps>(() => ({
  type: type.value,
  collapsible: collapsible.value,
  disabled: disabled.value,
  unmountOnHide: unmountOnHide.value,
  items: parseItems(itemsInput.value),
  value: value.value,
  iconDropDownOpen: parseIconProps(iconDropDownOpenObjectInput.value),
  iconDropDownClose: parseIconProps(iconDropDownCloseObjectInput.value),
}))

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

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Cambia el modo de apertura, el estado y los iconos del acordeon.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Accordion v-bind="playgroundProps" v-model:value="value" class="w-full max-w-xl" />
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">type</span>
            <select
              v-model="type"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="single">single</option>
              <option value="multiple">multiple</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">items</span>
            <textarea
              v-model="itemsInput"
              rows="10"
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">iconDropDownOpen (objeto)</span>
            <textarea
              v-model="iconDropDownOpenObjectInput"
              rows="4"
              placeholder='{
  "name": "chevronUp",
  "size": "sm"
}'
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">iconDropDownClose (objeto)</span>
            <textarea
              v-model="iconDropDownCloseObjectInput"
              rows="4"
              placeholder='{
  "name": "chevronDown",
  "size": "sm"
}'
              class="rounded-md border bg-background px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="collapsible" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">collapsible</span>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="disabled" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">disabled</span>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="unmountOnHide" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">unmountOnHide</span>
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="accordion-item" title="AccordionItem" :rows="itemRows" />
      <ApiTable id="accordion-item-context" title="AccordionItemContext" :rows="contextRows" />
    </div>
  </section>
</template>
