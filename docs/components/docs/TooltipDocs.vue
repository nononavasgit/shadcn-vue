<script setup lang="ts">
import { computed, ref } from 'vue'

import { Tooltip, type TooltipProps } from '@/components/ui/Tooltip'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const playgroundLabel = ref('Información adicional')
const playgroundSide = ref<TooltipProps['side']>('top')
const playgroundAlign = ref<TooltipProps['align']>('center')
const playgroundOpen = ref(false)
const playgroundWithArrow = ref(true)

const playgroundProps = computed<TooltipProps>(() => ({
  label: playgroundLabel.value,
  side: playgroundSide.value,
  align: playgroundAlign.value,
  open: playgroundOpen.value,
  withArrow: playgroundWithArrow.value,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'TooltipContext',
    type: '{ open: boolean; close: () => void }',
    description: 'Contexto disponible en los slots y resolvers de UI.',
  },
  {
    name: 'TooltipUI',
    type: '{ root; trigger; content; arrow }',
    description: 'Resolvers para personalizar cada parte del tooltip.',
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
    default: 'true',
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
    default: '0',
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
    default: 'false',
    description: 'Evita que hacer clic en el trigger cierre el contenido.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Deshabilita la interacción del tooltip.',
  },
  {
    name: 'ignoreNonKeyboardFocus',
    type: 'boolean',
    default: 'false',
    description: 'Evita abrir el tooltip cuando el foco no procede del teclado.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description: 'Alineación del contenido respecto al trigger.',
  },
  {
    name: 'alignOffset',
    type: 'number',
    default: '0',
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
    default: '0',
    description: 'Separación de la flecha respecto a los bordes del contenido.',
  },
  {
    name: 'avoidCollisions',
    type: 'boolean',
    default: 'true',
    description: 'Evita que el contenido desborde los límites visibles.',
  },
  {
    name: 'collisionBoundary',
    type: 'Element | null | Array<Element | null>',
    default: '[]',
    description: 'Elemento o elementos usados como límite de colisión.',
  },
  {
    name: 'collisionPadding',
    type: 'number | Partial<Record<Side, number>>',
    default: '0',
    description: 'Separación respecto al límite de colisión.',
  },
  {
    name: 'forceMount',
    type: 'boolean',
    default: 'false',
    description: 'Mantiene montado el contenido aunque el tooltip esté cerrado.',
  },
  {
    name: 'hideWhenDetached',
    type: 'boolean',
    default: 'false',
    description: 'Oculta el contenido cuando el trigger queda completamente oculto.',
  },
  {
    name: 'positionStrategy',
    type: "'absolute' | 'fixed'",
    default: "'fixed'",
    description: 'Estrategia CSS usada para posicionar el contenido.',
  },
  {
    name: 'side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'top'",
    description: 'Lado preferido del trigger donde aparece el tooltip.',
  },
  {
    name: 'sideOffset',
    type: 'number',
    default: '2',
    description: 'Distancia del contenido respecto al trigger en píxeles.',
  },
  {
    name: 'sticky',
    type: "'partial' | 'always'",
    default: "'partial'",
    description: 'Comportamiento del contenido respecto al eje de alineación.',
  },
  {
    name: 'updatePositionStrategy',
    type: "'optimized' | 'always'",
    default: "'optimized'",
    description: 'Estrategia para actualizar la posición durante el movimiento.',
  },
  {
    name: 'onEscapeKeyDown',
    type: '(event: KeyboardEvent) => void',
    default: 'undefined',
    description: 'Callback cuando se pulsa Escape dentro del contenido.',
  },
  {
    name: 'onPointerDownOutside',
    type: '(event: Event) => void',
    default: 'undefined',
    description: 'Callback cuando se pulsa fuera del contenido.',
  },
  {
    name: 'arrowWidth',
    type: 'number',
    default: '10',
    description: 'Ancho de la flecha en píxeles.',
  },
  {
    name: 'arrowHeight',
    type: 'number',
    default: '5',
    description: 'Alto de la flecha en píxeles.',
  },
  {
    name: 'ui',
    type: 'TooltipUI',
    default: 'undefined',
    description: 'Personalización dinámica de root, trigger, content y arrow.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:open',
    type: '[value: boolean]',
    default: '-',
    description: 'Actualiza el estado controlado mediante v-model:open.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'TooltipContext',
    default: '-',
    description: 'Contenido que actúa como trigger.',
  },
  {
    name: 'content',
    type: 'TooltipContext',
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

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">Tipos públicos usados por la API.</p>
      </div>
      <ApiTable title="Tipos" :rows="typeRows" />
    </section>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">Prueba el contenido y el posicionamiento.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Tooltip v-bind="playgroundProps" v-model:open="playgroundOpen">
              <button
                type="button"
                class="rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
              >
                Pasa el cursor por aquí
              </button>
            </Tooltip>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">label</span>
            <input
              v-model="playgroundLabel"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">side</span>
            <select
              v-model="playgroundSide"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="top">top</option>
              <option value="right">right</option>
              <option value="bottom">bottom</option>
              <option value="left">left</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">align</span>
            <select
              v-model="playgroundAlign"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="start">start</option>
              <option value="center">center</option>
              <option value="end">end</option>
            </select>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="playgroundOpen" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">open</span>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="playgroundWithArrow"
              type="checkbox"
              class="size-4 rounded border-input"
            />
            <span class="font-medium">withArrow</span>
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
