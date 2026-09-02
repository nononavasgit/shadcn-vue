<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import { treeDefaults } from '@/components/ui/Tree/defaults'

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'string | number | (string | number)[] | undefined',
    default: 'undefined',
    description: 'IDs seleccionados, controlados mediante v-model:value.',
  },
  {
    name: 'expanded',
    type: '(string | number)[]',
    default: '[]',
    description: 'IDs de los nodos expandidos, controlados mediante v-model:expanded.',
  },
  {
    name: 'items',
    type: 'TreeItem[]',
    typeLink: '#tree-item',
    default: '[]',
    description: 'Nodos del árbol que se renderizan en el orden indicado.',
  },
  {
    name: 'multiple',
    type: 'boolean',
    default: String(treeDefaults.multiple),
    description: 'Permite seleccionar varios nodos.',
  },
  {
    name: 'selectionBehavior',
    type: "'toggle' | 'replace'",
    default: `'${treeDefaults.selectionBehavior}'`,
    description: 'Define cómo se comporta la selección múltiple.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: String(treeDefaults.disabled),
    description: 'Deshabilita la interacción de todo el árbol.',
  },
  {
    name: 'propagateSelect / bubbleSelect',
    type: 'boolean',
    default: 'false',
    description: 'Propaga la selección entre padres y descendientes.',
  },
  {
    name: 'checkbox',
    type: 'boolean',
    default: 'false',
    description: 'Muestra nuestro componente Checkbox en cada nodo.',
  },
  {
    name: 'getKey',
    type: '(item: TreeItem) => string | number',
    default: 'item => item.value',
    description: 'Obtiene la clave única de cada nodo.',
  },
  {
    name: 'getChildren',
    type: '(item: TreeItem) => TreeItem[] | undefined',
    default: 'item => item.children',
    description: 'Permite usar un esquema personalizado para los hijos.',
  },
  {
    name: 'virtual',
    type: 'boolean',
    default: String(treeDefaults.virtual),
    description: 'Activa el renderizado virtual de la lista aplanada.',
  },
  {
    name: 'virtualizer',
    type: 'TreeVirtualizerConfig',
    typeLink: '#tree-virtualizer-config',
    default: 'undefined',
    description: 'Configura overscan, tamaño estimado y typeahead de la virtualización.',
  },
  {
    name: 'ui',
    type: '{ root?: (context: TreeContext) => HTMLAttributes; item?: (context: TreeItemContext) => HTMLAttributes; content?: (context: TreeItemContext) => HTMLAttributes; chevron?: (context: TreeItemContext) => HTMLAttributes; leading?: (context: TreeItemContext) => HTMLAttributes; checkbox?: (context: TreeItemContext) => HTMLAttributes; label?: (context: TreeItemContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ root?: (context: ' },
      { text: 'TreeContext', link: '#tree-context' },
      { text: ') => HTMLAttributes; item?: (context: ' },
      { text: 'TreeItemContext', link: '#tree-item-context' },
      { text: ') => HTMLAttributes; content?: (context: ' },
      { text: 'TreeItemContext', link: '#tree-item-context' },
      { text: ') => HTMLAttributes; chevron?: (context: ' },
      { text: 'TreeItemContext', link: '#tree-item-context' },
      { text: ') => HTMLAttributes; leading?: (context: ' },
      { text: 'TreeItemContext', link: '#tree-item-context' },
      { text: ') => HTMLAttributes; checkbox?: (context: ' },
      { text: 'TreeItemContext', link: '#tree-item-context' },
      { text: ') => HTMLAttributes; label?: (context: ' },
      { text: 'TreeItemContext', link: '#tree-item-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Resolvers contextuales para personalizar root, items y sus partes.',
  },
]

const itemRows: ApiTableRow[] = [
  { name: 'value', type: 'string | number', required: true, description: 'ID único del nodo.' },
  { name: 'label', type: 'string', required: true, description: 'Texto visible del nodo.' },
  {
    name: 'slot',
    type: 'string | number',
    default: 'value',
    description: 'Clave para resolver slots dinámicos del nodo.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono mostrado junto al label.',
  },
  {
    name: 'children',
    type: 'TreeItem[]',
    typeLink: '#tree-item',
    default: 'undefined',
    description: 'Hijos del nodo.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Impide seleccionar o expandir el nodo.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: TreeModelValue]',
    description: 'Actualiza los IDs seleccionados.',
  },
  {
    name: 'update:expanded',
    type: '[value: TreeKey[]]',
    description: 'Actualiza los IDs expandidos.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'item / item-{slot}',
    type: 'TreeItemContext',
    typeLink: '#tree-item-context',
    description: 'Reemplaza el contenido completo de un nodo.',
  },
  {
    name: 'leading / leading-{slot}',
    type: 'TreeItemContext',
    typeLink: '#tree-item-context',
    description: 'Personaliza el icono del nodo.',
  },
  {
    name: 'chevron / chevron-{slot}',
    type: 'TreeItemContext',
    typeLink: '#tree-item-context',
    description: 'Personaliza el control de expansión.',
  },
  {
    name: 'checkbox / checkbox-{slot}',
    type: 'TreeItemContext',
    typeLink: '#tree-item-context',
    description: 'Personaliza o sustituye el Checkbox integrado.',
  },
  {
    name: 'label / label-{slot}',
    type: 'TreeItemContext',
    typeLink: '#tree-item-context',
    description: 'Personaliza el texto del nodo.',
  },
  {
    name: 'default',
    type: 'TreeItemContext',
    typeLink: '#tree-item-context',
    description: 'Personaliza el label por defecto.',
  },
]

const contextRows: ApiTableRow[] = [
  {
    name: 'value / expanded',
    type: 'TreeModelValue / TreeKey[]',
    description: 'Estado actual de selección y expansión.',
  },
  {
    name: 'items',
    type: 'TreeItem[]',
    typeLink: '#tree-item',
    description: 'Nodos raíz del árbol.',
  },
  { name: 'multiple / disabled', type: 'boolean', description: 'Configuración activa del árbol.' },
]

const itemContextRows: ApiTableRow[] = [
  { name: 'item', type: 'TreeItem', typeLink: '#tree-item', description: 'Nodo actual.' },
  { name: 'key', type: 'TreeKey', description: 'Clave normalizada del nodo.' },
  { name: 'index / level', type: 'number', description: 'Índice visible y profundidad del nodo.' },
  {
    name: 'parentItem',
    type: 'TreeItem | undefined',
    typeLink: '#tree-item',
    description: 'Nodo padre, si existe.',
  },
  { name: 'hasChildren', type: 'boolean', description: 'Indica si el nodo tiene hijos.' },
  {
    name: 'expanded / selected / indeterminate / disabled',
    type: 'boolean | undefined',
    description: 'Estados interactivos del nodo.',
  },
  {
    name: 'first / last',
    type: 'boolean',
    description: 'Indica si es el primer o último nodo visible.',
  },
  {
    name: 'handleSelect / handleToggle',
    type: 'Function',
    description: 'Selecciona el nodo o cambia su expansión.',
  },
]

const virtualizerRows: ApiTableRow[] = [
  {
    name: 'overscan',
    type: 'number',
    default: '12',
    description: 'Número de nodos adicionales renderizados fuera del área visible.',
  },
  {
    name: 'estimateSize',
    type: 'number | ((index: number) => number)',
    default: '28',
    description: 'Tamaño estimado en píxeles de cada nodo virtualizado.',
  },
  {
    name: 'textContent',
    type: '(item: Record<string, any>) => string',
    default: 'item.toString().toLowerCase()',
    description: 'Texto usado por la navegación typeahead.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Tree</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Árbol accesible con selección, expansión, checkboxes, esquemas personalizados y
        virtualización.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable id="tree-item" title="TreeItem" :rows="itemRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable id="tree-context" title="TreeContext" :rows="contextRows" />
      <ApiTable id="tree-item-context" title="TreeItemContext" :rows="itemContextRows" />
      <ApiTable
        id="tree-virtualizer-config"
        title="TreeVirtualizerConfig"
        :rows="virtualizerRows"
      />
      <ApiTable title="Expose" :rows="[]" empty-text="Este componente no expone métodos." />
    </div>
  </section>
</template>
