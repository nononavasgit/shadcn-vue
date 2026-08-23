<script setup lang="ts">
import { computed, ref } from 'vue'

import { Tabs, type TabItem, type TabsProps } from '@/components/ui/Tabs'
import { tabsDefaults } from '@/components/ui/Tabs/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const playgroundValue = ref('overview')
const playgroundOrientation = ref<'horizontal' | 'vertical'>(tabsDefaults.orientation)
const playgroundActivationMode = ref<'automatic' | 'manual'>(tabsDefaults.activationMode)
const playgroundVariant = ref<'default' | 'line'>(tabsDefaults.variant)
const playgroundLoop = ref(tabsDefaults.loop)
const playgroundUnmountOnHide = ref(tabsDefaults.unmountOnHide)

const playgroundTabs: TabItem[] = [
  {
    slot: 'overview',
    value: 'overview',
    label: 'Overview',
  },
  {
    slot: 'analytics',
    value: 'analytics',
    label: 'Analytics',
  },
  {
    slot: 'settings',
    value: 'settings',
    label: 'Settings',
  },
]

const playgroundProps = computed<Omit<TabsProps, 'value'>>(() => ({
  tabs: playgroundTabs,
  orientation: playgroundOrientation.value,
  activationMode: playgroundActivationMode.value,
  variant: playgroundVariant.value,
  loop: playgroundLoop.value,
  unmountOnHide: playgroundUnmountOnHide.value,
}))

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

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Prueba la navegación y el comportamiento de las pestañas.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <div class="w-full">
              <Tabs v-model:value="playgroundValue" v-bind="playgroundProps">
                <template #content="{ tabs }">
                  <p class="text-sm">Contenido para {{ tabs.length }} pestañas.</p>
                </template>
              </Tabs>
              <output class="mt-3 block text-center text-sm text-muted-foreground">
                Pestaña activa: {{ playgroundValue }}
              </output>
            </div>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">value</span>
            <select
              v-model="playgroundValue"
              class="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option v-for="tab in playgroundTabs" :key="tab.slot" :value="tab.value">
                {{ tab.label }}
              </option>
            </select>
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">orientation</span>
            <select
              v-model="playgroundOrientation"
              class="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
            </select>
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">activationMode</span>
            <select
              v-model="playgroundActivationMode"
              class="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="automatic">automatic</option>
              <option value="manual">manual</option>
            </select>
          </label>
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">variant</span>
            <select
              v-model="playgroundVariant"
              class="h-9 rounded-md border bg-background px-3 text-sm"
            >
              <option value="default">default</option>
              <option value="line">line</option>
            </select>
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input v-model="playgroundLoop" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">loop</span>
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="playgroundUnmountOnHide"
              type="checkbox"
              class="size-4 rounded border-input"
            />
            <span class="font-medium">unmountOnHide</span>
          </label>
        </div>
      </div>
    </section>

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
