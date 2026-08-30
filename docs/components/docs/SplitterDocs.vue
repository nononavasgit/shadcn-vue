<script setup lang="ts">
import { splitterDefaults } from '@/components/ui/Splitter/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'items',
    type: 'SplitterItem[]',
    typeLink: '#splitter-item',
    default: '[]',
    description: 'Paneles que renderiza el Splitter en el orden indicado.',
  },
  {
    name: 'direction',
    type: "'horizontal' | 'vertical'",
    default: `'${splitterDefaults.direction}'`,
    description: 'Eje sobre el que se distribuyen los paneles.',
  },
  {
    name: 'id',
    type: 'string | null',
    default: 'undefined',
    description: 'Identificador del grupo de paneles.',
  },
  {
    name: 'autoSaveId',
    type: 'string | null',
    default: 'null',
    description: 'Identificador usado para guardar y recuperar el layout.',
  },
  {
    name: 'keyboardResizeBy',
    type: 'number | null',
    default: String(splitterDefaults.keyboardResizeBy),
    description: 'Incremento aplicado al redimensionar con las flechas del teclado.',
  },
  {
    name: 'storage',
    type: 'PanelGroupStorage',
    default: 'localStorage',
    description: 'Almacenamiento personalizado usado junto con autoSaveId.',
  },
  {
    name: 'hitAreaMargins',
    type: 'PointerHitAreaMargins',
    default: 'undefined',
    description: 'Margen adicional para detectar la interacción con los handles.',
  },
  {
    name: 'tabindex',
    type: 'number',
    default: 'undefined',
    description: 'Tabindex global de los handles.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'undefined',
    description: 'Desactiva globalmente los handles.',
  },
  {
    name: 'nonce',
    type: 'string',
    default: 'undefined',
    description: 'Nonce CSP aplicado a los estilos de los handles.',
  },
  {
    name: 'ui',
    type: '{ panel?: (context: SplitterItemContext) => HTMLAttributes; resizeHandle?: (context: SplitterItemContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ panel?: (context: ' },
      { text: 'SplitterItemContext', link: '#splitter-item-context' },
      { text: ') => HTMLAttributes; resizeHandle?: (context: ' },
      { text: 'SplitterItemContext', link: '#splitter-item-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Funciones que devuelven atributos HTML para los paneles y handles internos.',
  },
]

const itemRows: ApiTableRow[] = [
  {
    name: 'slot',
    type: 'string',
    default: 'undefined',
    description: 'Sufijo usado para resolver panel-{slot} y handle-{slot}.',
  },
  {
    name: 'id',
    type: 'string',
    default: 'undefined',
    description: 'Identificador del panel.',
  },
  {
    name: 'collapsedSize',
    type: 'number',
    default: 'undefined',
    description: 'Tamaño del panel cuando está colapsado.',
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: 'undefined',
    description: 'Permite colapsar el panel al redimensionarlo.',
  },
  {
    name: 'defaultSize',
    type: 'number',
    default: 'undefined',
    description: 'Tamaño inicial del panel.',
  },
  {
    name: 'maxSize',
    type: 'number',
    default: 'undefined',
    description: 'Tamaño máximo permitido para el panel.',
  },
  {
    name: 'minSize',
    type: 'number',
    default: 'undefined',
    description: 'Tamaño mínimo permitido para el panel.',
  },
  {
    name: 'order',
    type: 'number',
    default: 'undefined',
    description: 'Orden del panel dentro del grupo.',
  },
  {
    name: 'sizeUnit',
    type: "'%' | 'px'",
    default: 'undefined',
    description: 'Unidad usada para interpretar los tamaños.',
  },
  {
    name: 'class',
    type: 'HTMLAttributes["class"]',
    default: 'undefined',
    description: 'Clases adicionales del panel.',
  },
  {
    name: 'style',
    type: 'HTMLAttributes["style"]',
    default: 'undefined',
    description: 'Estilos adicionales del panel.',
  },
]

const contextRows: ApiTableRow[] = [
  {
    name: 'layout',
    type: 'number[]',
    default: '[]',
    description: 'Distribución actual de los paneles.',
  },
  {
    name: 'item',
    type: 'SplitterItem',
    typeLink: '#splitter-item',
    default: '-',
    description: 'Item asociado al panel o handle.',
  },
  {
    name: 'index',
    type: 'number',
    default: '-',
    description: 'Índice del item dentro de items.',
  },
  {
    name: 'first',
    type: 'boolean',
    default: '-',
    description: 'Indica si es el primer item.',
  },
  {
    name: 'last',
    type: 'boolean',
    default: '-',
    description: 'Indica si es el último item.',
  },
  {
    name: 'nextItem',
    type: 'SplitterItem | undefined',
    typeLink: '#splitter-item',
    default: 'undefined',
    description: 'Siguiente item del grupo, cuando existe.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'layout',
    type: '[layout: number[]]',
    description: 'Se emite cuando cambia la distribución de los paneles.',
  },
  {
    name: 'collapse',
    type: '[]',
    description: 'Se reenvía cuando un panel se colapsa.',
  },
  {
    name: 'expand',
    type: '[]',
    description: 'Se reenvía cuando un panel se expande.',
  },
  {
    name: 'resize',
    type: '[size: number, previousSize: number | undefined]',
    description: 'Se reenvía cuando cambia el tamaño de un panel.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'SplitterItemContext',
    typeLink: '#splitter-item-context',
    default: 'Panel sin slot',
    description: 'Contenido del panel cuyo item no define slot.',
  },
  {
    name: 'handle',
    type: 'SplitterItemContext',
    typeLink: '#splitter-item-context',
    default: 'Handle sin slot',
    description: 'Contenido del handle cuyo item no define slot.',
  },
  {
    name: 'panel-{slot}',
    type: 'SplitterItemContext',
    typeLink: '#splitter-item-context',
    default: '-',
    description: 'Contenido del panel identificado por el slot del item.',
  },
  {
    name: 'handle-{slot}',
    type: 'SplitterItemContext',
    typeLink: '#splitter-item-context',
    default: '-',
    description: 'Contenido del handle asociado al slot del item.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Splitter</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Divide una zona en paneles redimensionables, con orientación horizontal o vertical y
        contenido personalizado mediante slots.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="splitter-item" title="SplitterItem" :rows="itemRows" />
      <ApiTable id="splitter-item-context" title="SplitterItemContext" :rows="contextRows" />
    </div>
  </section>
</template>
