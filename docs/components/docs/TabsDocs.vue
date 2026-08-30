<script setup lang="ts">
import { tabsDefaults } from '@/components/ui/Tabs/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'string | number',
    default: 'undefined',
    description: 'Pestaña controlada mediante v-model:value.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: `'${tabsDefaults.orientation}'`,
    description: 'Orientación de la lista y el contenido.',
  },
  {
    name: 'activationMode',
    type: "'automatic' | 'manual'",
    default: `'${tabsDefaults.activationMode}'`,
    description: 'Modo de activación al desplazarse por los triggers.',
  },
  {
    name: 'unmountOnHide',
    type: 'boolean',
    default: String(tabsDefaults.unmountOnHide),
    description: 'Desmonta el contenido de las pestañas inactivas.',
  },
  {
    name: 'loop',
    type: 'boolean',
    default: String(tabsDefaults.loop),
    description: 'Permite volver al primer trigger desde el último y viceversa.',
  },
  {
    name: 'variant',
    type: "'default' | 'line'",
    default: `'${tabsDefaults.variant}'`,
    description: 'Variante visual de la lista y los triggers.',
  },
  {
    name: 'tabs',
    type: 'TabItem[]',
    typeLink: '#tab-item',
    default: '[]',
    description: 'Items que generan los triggers y sus contenidos.',
  },
  {
    name: 'ui',
    type: '{ root?: () => HTMLAttributes; list?: () => HTMLAttributes; contentWrapper?: () => HTMLAttributes; trigger?: (context: TabsItemContext) => HTMLAttributes; label?: (context: TabsItemContext) => HTMLAttributes; content?: (context: TabsItemContext) => HTMLAttributes }',
    typeParts: [
      {
        text: '{ root?: () => HTMLAttributes; list?: () => HTMLAttributes; contentWrapper?: () => HTMLAttributes; trigger?: (context: ',
      },
      { text: 'TabsItemContext', link: '#tabs-item-context' },
      { text: ') => HTMLAttributes; label?: (context: ' },
      { text: 'TabsItemContext', link: '#tabs-item-context' },
      { text: ') => HTMLAttributes; content?: (context: ' },
      { text: 'TabsItemContext', link: '#tabs-item-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Personalización dinámica de las partes internas.',
  },
]

const tabItemRows: ApiTableRow[] = [
  {
    name: 'slot',
    type: 'string',
    required: true,
    description: 'Nombre base para los slots dinámicos del item.',
  },
  {
    name: 'value',
    type: 'string | number',
    required: true,
    description: 'Valor del trigger y el contenido.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Etiqueta visible del trigger.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono anterior a la etiqueta.',
  },
  {
    name: 'trailingIcon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono posterior a la etiqueta.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Deshabilita el trigger del item.',
  },
  {
    name: 'forceMount',
    type: 'boolean',
    default: 'undefined',
    description: 'Mantiene montado el contenido del item.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: string | number | undefined]',
    default: '-',
    description: 'Actualiza la pestaña controlada.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'trigger',
    type: 'TabsContext',
    typeLink: '#tabs-context',
    description: 'Reemplaza el trigger completo.',
  },
  {
    name: 'leading',
    type: 'TabsContext',
    typeLink: '#tabs-context',
    description: 'Contenido antes del icono y la etiqueta.',
  },
  {
    name: 'label',
    type: 'TabsContext',
    typeLink: '#tabs-context',
    description: 'Reemplaza la etiqueta del trigger.',
  },
  {
    name: 'trailing',
    type: 'TabsContext',
    typeLink: '#tabs-context',
    description: 'Contenido después de la etiqueta.',
  },
  {
    name: 'content',
    type: 'TabsContext',
    typeLink: '#tabs-context',
    description: 'Reemplaza el contenido de la pestaña.',
  },
  {
    name: 'trigger-{slot}',
    type: 'TabsItemContext',
    typeLink: '#tabs-item-context',
    description: 'Personaliza un trigger concreto.',
  },
  {
    name: 'leading-{slot}',
    type: 'TabsItemContext',
    typeLink: '#tabs-item-context',
    description: 'Personaliza el contenido leading de un item.',
  },
  {
    name: 'label-{slot}',
    type: 'TabsItemContext',
    typeLink: '#tabs-item-context',
    description: 'Personaliza la etiqueta de un item.',
  },
  {
    name: 'trailing-{slot}',
    type: 'TabsItemContext',
    typeLink: '#tabs-item-context',
    description: 'Personaliza el contenido trailing de un item.',
  },
  {
    name: 'content-{slot}',
    type: 'TabsItemContext',
    typeLink: '#tabs-item-context',
    description: 'Personaliza el contenido de un item.',
  },
]

const exposeRows: ApiTableRow[] = []

const tabsContextRows: ApiTableRow[] = [
  {
    name: 'tabs',
    type: 'TabItem[]',
    typeLink: '#tab-item',
    description: 'Todos los items de pestañas.',
  },
]

const itemContextRows: ApiTableRow[] = [
  { name: 'tab', type: 'TabItem', typeLink: '#tab-item', description: 'Item de pestaña actual.' },
  { name: 'index', type: 'number', description: 'Índice del item.' },
  { name: 'active', type: 'boolean', description: 'Indica si el item está activo.' },
  { name: 'first', type: 'boolean', description: 'Indica si es el primer item.' },
  { name: 'last', type: 'boolean', description: 'Indica si es el último item.' },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Tabs</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Navegación por pestañas accesible con orientación, variantes, items y slots dinámicos.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable id="tab-item" title="TabItem" :rows="tabItemRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="tabs-context" title="TabsContext" :rows="tabsContextRows" />
      <ApiTable id="tabs-item-context" title="TabsItemContext" :rows="itemContextRows" />
    </div>
  </section>
</template>
