<script setup lang="ts">
import { computed, ref } from 'vue'

import { Splitter, type SplitterItem, type SplitterProps } from '@/components/ui/Splitter'
import { splitterDefaults } from '@/components/ui/Splitter/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const playgroundDirection = ref<NonNullable<SplitterProps['direction']>>(splitterDefaults.direction)
const playgroundKeyboardResizeBy = ref(splitterDefaults.keyboardResizeBy)
const playgroundDisabled = ref(false)
const playgroundLayout = ref<number[]>([])

const playgroundItems: SplitterItem[] = [
  {
    id: 'files',
    slot: 'files',
    defaultSize: 25,
    minSize: 15,
  },
  {
    id: 'editor',
    slot: 'editor',
    defaultSize: 50,
    minSize: 30,
  },
  {
    id: 'details',
    slot: 'details',
    defaultSize: 25,
    minSize: 15,
    collapsible: true,
    collapsedSize: 5,
  },
]

const playgroundProps = computed<Omit<SplitterProps, 'items'>>(() => ({
  direction: playgroundDirection.value,
  keyboardResizeBy: playgroundKeyboardResizeBy.value,
  disabled: playgroundDisabled.value,
}))

const playgroundLayoutText = computed(() =>
  playgroundLayout.value.length
    ? playgroundLayout.value.map((size) => `${Math.round(size)}%`).join(' · ')
    : 'Calculando…',
)

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
    type: '{ panel?; resizeHandle? }',
    default: 'undefined',
    description: 'Atributos, clases y estilos para paneles y handles.',
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

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Cambia la orientación y el tamaño del paso del teclado. Para paneles anidados, renderiza
          otro Splitter dentro del slot de un panel.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-64 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <div class="grid w-full gap-3">
              <Splitter
                v-bind="playgroundProps"
                :items="playgroundItems"
                class="h-64 overflow-hidden rounded-md border bg-muted/20"
                @layout="playgroundLayout = $event"
              >
                <template #panel-files>
                  <div class="grid h-full content-start gap-2 overflow-auto p-4">
                    <span class="text-sm font-medium">Archivos</span>
                    <span class="text-xs text-muted-foreground">src/components</span>
                    <span class="text-xs text-muted-foreground">package.json</span>
                  </div>
                </template>

                <template #panel-editor>
                  <div class="grid h-full content-start gap-2 overflow-auto p-4">
                    <span class="text-sm font-medium">Editor</span>
                    <pre class="rounded-md bg-background p-3 text-xs leading-6">
&lt;Splitter /&gt;</pre>
                  </div>
                </template>

                <template #panel-details>
                  <div class="grid h-full content-start gap-2 overflow-auto p-4">
                    <span class="text-sm font-medium">Detalles</span>
                    <span class="text-xs text-muted-foreground">
                      {{ playgroundLayoutText }}
                    </span>
                  </div>
                </template>

                <template #handle>
                  <span class="grid gap-0.5 rounded-sm border bg-background p-1 shadow-sm">
                    <span class="h-0.5 w-2 rounded-full bg-muted-foreground/60" />
                    <span class="h-0.5 w-2 rounded-full bg-muted-foreground/60" />
                    <span class="h-0.5 w-2 rounded-full bg-muted-foreground/60" />
                  </span>
                </template>
              </Splitter>

              <output class="text-center text-xs text-muted-foreground">
                Layout: {{ playgroundLayoutText }}
              </output>
            </div>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">direction</span>
            <select
              v-model="playgroundDirection"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">keyboardResizeBy</span>
            <input
              v-model.number="playgroundKeyboardResizeBy"
              type="number"
              min="1"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="playgroundDisabled"
              type="checkbox"
              class="size-4 rounded border-input"
            />
            <span class="font-medium">disabled</span>
          </label>
        </div>
      </div>
    </section>

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
