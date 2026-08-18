<script setup lang="ts">
import { computed, ref } from 'vue'

import { Popover, type PopoverProps } from '@/components/ui/Popover'
import { popoverDefaults } from '@/components/ui/Popover/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const open = ref(false)
const modal = ref(popoverDefaults.modal)
const showArrow = ref(popoverDefaults.showArrow)
const side = ref<NonNullable<PopoverProps['side']>>(popoverDefaults.side)
const align = ref<NonNullable<PopoverProps['align']>>(popoverDefaults.align)
const sideOffset = ref(popoverDefaults.sideOffset)

const playgroundProps = computed<PopoverProps>(() => ({
  modal: modal.value,
  showArrow: showArrow.value,
  side: side.value,
  align: align.value,
  sideOffset: sideOffset.value,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'PopoverUI',
    type: '{ content?; arrow? }',
    description: 'Resolvers para personalizar el contenido y la flecha.',
  },
  {
    name: 'PopoverContext',
    type: '{ open: boolean; close: () => void }',
    description: 'Contexto disponible en los slots y resolvers de UI.',
  },
]

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
    name: 'collisionBoundary',
    type: 'Element | null | Array<Element | null>',
    default: '[]',
    description: 'Límite utilizado para calcular colisiones.',
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
    type: 'PopoverUI',
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
  { name: 'default', type: 'PopoverContext', default: '-', description: 'Trigger del popover.' },
  { name: 'content', type: 'PopoverContext', default: '-', description: 'Contenido del popover.' },
  { name: 'arrow', type: 'PopoverContext', default: '-', description: 'Personaliza la flecha.' },
]

const exposeRows: ApiTableRow[] = []
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
        <p class="text-sm text-muted-foreground">Prueba el estado, la posición y la flecha.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Popover v-model:open="open" v-bind="playgroundProps">
              <button
                type="button"
                class="rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent"
              >
                {{ open ? 'Cerrar popover' : 'Abrir popover' }}
              </button>
              <template #content>
                <div class="grid gap-2">
                  <p class="font-medium">Contenido del popover</p>
                  <p class="text-sm text-muted-foreground">
                    Todas las props de contenido se configuran en la raíz.
                  </p>
                </div>
              </template>
            </Popover>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">side</span>
            <select v-model="side" class="h-9 rounded-md border bg-background px-3 text-sm">
              <option value="top">top</option>
              <option value="right">right</option>
              <option value="bottom">bottom</option>
              <option value="left">left</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">align</span>
            <select v-model="align" class="h-9 rounded-md border bg-background px-3 text-sm">
              <option value="start">start</option>
              <option value="center">center</option>
              <option value="end">end</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">sideOffset</span>
            <input
              v-model.number="sideOffset"
              type="number"
              class="h-9 rounded-md border bg-background px-3 text-sm"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="modal" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">modal</span>
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="showArrow" type="checkbox" class="size-4 rounded border-input" />
            <span class="font-medium">showArrow</span>
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
