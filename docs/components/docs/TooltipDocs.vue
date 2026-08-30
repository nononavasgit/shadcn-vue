<script setup lang="ts">
import { tooltipDefaults } from '@/components/ui/Tooltip/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const typeRows: ApiTableRow[] = [
  {
    name: 'TooltipContext',
    type: '{ open: boolean; close: () => void }',
    description: 'Contexto disponible en los slots y resolvers de UI.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Contenido de texto usado cuando no se proporciona el slot content.',
  },
  {
    name: 'withArrow',
    type: 'boolean',
    default: String(tooltipDefaults.withArrow),
    description: 'Muestra la flecha del tooltip.',
  },
  {
    name: 'open',
    type: 'boolean',
    default: 'false',
    description: 'Controla el estado abierto del tooltip mediante v-model:open.',
  },
  {
    name: 'delayDuration',
    type: 'number',
    default: String(tooltipDefaults.delayDuration),
    description: 'Tiempo de espera antes de abrir el tooltip.',
  },
  {
    name: 'disableHoverableContent',
    type: 'boolean',
    default: 'undefined',
    description: 'Impide mantener abierto el contenido al pasar el cursor sobre él.',
  },
  {
    name: 'disableClosingTrigger',
    type: 'boolean',
    default: String(tooltipDefaults.disableClosingTrigger),
    description: 'Evita que hacer clic en el trigger cierre el contenido.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: String(tooltipDefaults.disabled),
    description: 'Deshabilita la interacción del tooltip.',
  },
  {
    name: 'ignoreNonKeyboardFocus',
    type: 'boolean',
    default: String(tooltipDefaults.ignoreNonKeyboardFocus),
    description: 'Evita abrir el tooltip cuando el foco no procede del teclado.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: `'${tooltipDefaults.align}'`,
    description: 'Alineación del contenido respecto al trigger.',
  },
  {
    name: 'alignOffset',
    type: 'number',
    default: String(tooltipDefaults.alignOffset),
    description: 'Desplazamiento de la alineación en píxeles.',
  },
  {
    name: 'ariaLabel',
    type: 'string',
    default: 'undefined',
    description: 'Etiqueta accesible del contenido.',
  },
  {
    name: 'arrowPadding',
    type: 'number',
    default: String(tooltipDefaults.arrowPadding),
    description: 'Separación de la flecha respecto a los bordes del contenido.',
  },
  {
    name: 'avoidCollisions',
    type: 'boolean',
    default: String(tooltipDefaults.avoidCollisions),
    description: 'Evita que el contenido desborde los límites visibles.',
  },
  {
    name: 'collisionPadding',
    type: 'number | Partial<Record<Side, number>>',
    default: String(tooltipDefaults.collisionPadding),
    description: 'Separación respecto al límite de colisión.',
  },
  {
    name: 'forceMount',
    type: 'boolean',
    default: String(tooltipDefaults.forceMount),
    description: 'Mantiene montado el contenido aunque el tooltip esté cerrado.',
  },
  {
    name: 'hideWhenDetached',
    type: 'boolean',
    default: String(tooltipDefaults.hideWhenDetached),
    description: 'Oculta el contenido cuando el trigger queda completamente oculto.',
  },
  {
    name: 'positionStrategy',
    type: "'absolute' | 'fixed'",
    default: `'${tooltipDefaults.positionStrategy}'`,
    description: 'Estrategia CSS usada para posicionar el contenido.',
  },
  {
    name: 'side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: `'${tooltipDefaults.side}'`,
    description: 'Lado preferido del trigger donde aparece el tooltip.',
  },
  {
    name: 'sideOffset',
    type: 'number',
    default: String(tooltipDefaults.sideOffset),
    description: 'Distancia del contenido respecto al trigger en píxeles.',
  },
  {
    name: 'sticky',
    type: "'partial' | 'always'",
    default: `'${tooltipDefaults.sticky}'`,
    description: 'Comportamiento del contenido respecto al eje de alineación.',
  },
  {
    name: 'updatePositionStrategy',
    type: "'optimized' | 'always'",
    default: `'${tooltipDefaults.updatePositionStrategy}'`,
    description: 'Estrategia para actualizar la posición durante el movimiento.',
  },
  {
    name: 'arrowWidth',
    type: 'number',
    default: String(tooltipDefaults.arrowWidth),
    description: 'Ancho de la flecha en píxeles.',
  },
  {
    name: 'arrowHeight',
    type: 'number',
    default: String(tooltipDefaults.arrowHeight),
    description: 'Alto de la flecha en píxeles.',
  },
  {
    name: 'ui',
    type: '{ content?: (context: TooltipContext) => HTMLAttributes; arrow?: (context: TooltipContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ content?: (context: ' },
      { text: 'TooltipContext', link: '#tooltip-context' },
      { text: ') => HTMLAttributes; arrow?: (context: ' },
      { text: 'TooltipContext', link: '#tooltip-context' },
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
    description: 'Actualiza el estado controlado mediante v-model:open.',
  },
  {
    name: 'escapeKeyDown',
    type: '[event: KeyboardEvent]',
    default: '-',
    description: 'Se emite cuando se pulsa Escape dentro del contenido.',
  },
  {
    name: 'pointerDownOutside',
    type: '[event: Event]',
    default: '-',
    description: 'Se emite cuando se pulsa fuera del contenido.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'TooltipContext',
    typeLink: '#tooltip-context',
    default: '-',
    description: 'Contenido que actúa como trigger.',
  },
  {
    name: 'content',
    type: 'TooltipContext',
    typeLink: '#tooltip-context',
    default: 'label',
    description: 'Contenido del tooltip.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Tooltip</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Mensajes contextuales con props planas, posiciones y contenido personalizable.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="tooltip-context" title="TooltipContext" :rows="typeRows" />
    </div>
  </section>
</template>
