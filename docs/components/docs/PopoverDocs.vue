<script setup lang="ts">
import { popoverDefaults } from '@/components/ui/Popover/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'open',
    type: 'boolean',
    default: 'false',
    description: 'Estado controlado mediante v-model:open.',
  },
  {
    name: 'modal',
    type: 'boolean',
    default: String(popoverDefaults.modal),
    description: 'Controla si la interacción exterior queda bloqueada.',
  },
  {
    name: 'showArrow',
    type: 'boolean',
    default: String(popoverDefaults.showArrow),
    description: 'Muestra la flecha del popover.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: String(popoverDefaults.align),
    description: 'Alineación del contenido respecto al trigger.',
  },
  {
    name: 'alignFlip',
    type: 'boolean',
    default: String(popoverDefaults.alignFlip),
    description: 'Permite cambiar la alineación si hay una colisión.',
  },
  {
    name: 'alignOffset',
    type: 'number',
    default: String(popoverDefaults.alignOffset),
    description: 'Desplazamiento de la alineación.',
  },
  {
    name: 'arrowPadding',
    type: 'number',
    default: String(popoverDefaults.arrowPadding),
    description: 'Separación de la flecha respecto a los bordes.',
  },
  {
    name: 'avoidCollisions',
    type: 'boolean',
    default: String(popoverDefaults.avoidCollisions),
    description: 'Evita que el contenido salga del viewport.',
  },
  {
    name: 'collisionPadding',
    type: 'number | Partial<Record<Side, number>>',
    default: String(popoverDefaults.collisionPadding),
    description: 'Separación respecto al límite de colisión.',
  },
  {
    name: 'disableOutsidePointerEvents',
    type: 'boolean',
    default: 'undefined',
    description: 'Deshabilita eventos de puntero fuera del contenido.',
  },
  {
    name: 'disableUpdateOnLayoutShift',
    type: 'boolean',
    default: String(popoverDefaults.disableUpdateOnLayoutShift),
    description: 'Evita actualizar la posición ante cambios de layout.',
  },
  {
    name: 'forceMount',
    type: 'boolean',
    default: 'undefined',
    description: 'Mantiene montado el contenido aunque esté cerrado.',
  },
  {
    name: 'hideShiftedArrow',
    type: 'boolean',
    default: String(popoverDefaults.hideShiftedArrow),
    description: 'Oculta la flecha cuando se desplaza por una colisión.',
  },
  {
    name: 'hideWhenDetached',
    type: 'boolean',
    default: String(popoverDefaults.hideWhenDetached),
    description: 'Oculta el contenido cuando el trigger queda fuera de vista.',
  },
  {
    name: 'positionStrategy',
    type: "'absolute' | 'fixed'",
    default: `'${popoverDefaults.positionStrategy}'`,
    description: 'Estrategia de posicionamiento.',
  },
  {
    name: 'prioritizePosition',
    type: 'boolean',
    default: String(popoverDefaults.prioritizePosition),
    description: 'Prioriza la posición antes que la alineación.',
  },
  {
    name: 'side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: `'${popoverDefaults.side}'`,
    description: 'Lado preferido donde aparece el contenido.',
  },
  {
    name: 'sideFlip',
    type: 'boolean',
    default: String(popoverDefaults.sideFlip),
    description: 'Permite cambiar de lado si hay una colisión.',
  },
  {
    name: 'sideOffset',
    type: 'number',
    default: String(popoverDefaults.sideOffset),
    description: 'Distancia respecto al trigger.',
  },
  {
    name: 'sticky',
    type: "'partial' | 'always'",
    default: `'${popoverDefaults.sticky}'`,
    description: 'Comportamiento respecto al eje de alineación.',
  },
  {
    name: 'updatePositionStrategy',
    type: "'optimized' | 'always'",
    default: `'${popoverDefaults.updatePositionStrategy}'`,
    description: 'Estrategia para actualizar la posición.',
  },
  {
    name: 'arrowWidth',
    type: 'number',
    default: String(popoverDefaults.arrowWidth),
    description: 'Ancho de la flecha.',
  },
  {
    name: 'arrowHeight',
    type: 'number',
    default: String(popoverDefaults.arrowHeight),
    description: 'Alto de la flecha.',
  },
  {
    name: 'arrowRounded',
    type: 'boolean',
    default: String(popoverDefaults.arrowRounded),
    description: 'Redondea la flecha.',
  },
  {
    name: 'ui',
    type: '{ content?: (context: PopoverContext) => HTMLAttributes; arrow?: (context: PopoverContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ content?: (context: ' },
      { text: 'PopoverContext', link: '#popover-context' },
      { text: ') => HTMLAttributes; arrow?: (context: ' },
      { text: 'PopoverContext', link: '#popover-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Personalización dinámica de content y arrow.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:open',
    type: '[value: boolean]',
    default: '-',
    description: 'Actualiza el estado controlado.',
  },
  { name: 'show', type: '[]', default: '-', description: 'Se emite al abrir el popover.' },
  { name: 'close', type: '[]', default: '-', description: 'Se emite al cerrar el popover.' },
  {
    name: 'openAutoFocus',
    type: '[event: Event]',
    default: '-',
    description: 'Autofocus al abrir.',
  },
  {
    name: 'closeAutoFocus',
    type: '[event: Event]',
    default: '-',
    description: 'Autofocus al cerrar.',
  },
  {
    name: 'escapeKeyDown',
    type: '[event: KeyboardEvent]',
    default: '-',
    description: 'Escape dentro del contenido.',
  },
  {
    name: 'pointerDownOutside',
    type: '[event: Event]',
    default: '-',
    description: 'Puntero fuera del contenido.',
  },
  {
    name: 'focusOutside',
    type: '[event: Event]',
    default: '-',
    description: 'Foco fuera del contenido.',
  },
  {
    name: 'interactOutside',
    type: '[event: Event]',
    default: '-',
    description: 'Interacción fuera del contenido.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'PopoverContext',
    typeLink: '#popover-context',
    default: '-',
    description: 'Trigger del popover.',
  },
  {
    name: 'content',
    type: 'PopoverContext',
    typeLink: '#popover-context',
    default: '-',
    description: 'Contenido del popover.',
  },
  {
    name: 'arrow',
    type: 'PopoverContext',
    typeLink: '#popover-context',
    default: '-',
    description: 'Personaliza la flecha.',
  },
]

const exposeRows: ApiTableRow[] = []

const contextRows: ApiTableRow[] = [
  {
    name: 'open',
    type: 'boolean',
    default: '-',
    description: 'Indica si el popover esta abierto.',
  },
  {
    name: 'close',
    type: '() => void',
    default: '-',
    description: 'Cierra el popover desde un slot o resolver de UI.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Popover</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Contenido flotante contextual con props planas, posicionamiento y control accesible.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="popover-context" title="PopoverContext" :rows="contextRows" />
    </div>
  </section>
</template>
