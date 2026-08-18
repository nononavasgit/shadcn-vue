<script setup lang="ts">
import { computed, ref } from 'vue'

import { Progress, type ProgressProps } from '@/components/ui/Progress'
import { progressDefaults } from '@/components/ui/Progress/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const playgroundValue = ref<number | null>(40)
const playgroundMax = ref(progressDefaults.max)
const playgroundLabel = ref('')
const playgroundColor = ref('#3b82f6')
const playgroundTrackColor = ref('')
const playgroundIndeterminate = ref(false)

const playgroundProps = computed<Omit<ProgressProps, 'value'>>(() => ({
  max: playgroundMax.value,
  label: playgroundLabel.value || undefined,
  color: playgroundColor.value || undefined,
  trackColor: playgroundTrackColor.value || undefined,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'ProgressContext',
    type: '{ value; max; percentage }',
    description: 'Contexto disponible en los slots y resolvers de UI.',
  },
  {
    name: 'ProgressUI',
    type: '{ indicator?; label? }',
    description: 'Resolvers para personalizar el indicador y la etiqueta.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'number | null',
    default: '0',
    description: 'Valor controlado mediante v-model:value.',
  },
  {
    name: 'max',
    type: 'number',
    default: String(progressDefaults.max),
    description: 'Valor máximo utilizado para calcular el porcentaje.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Etiqueta visible sobre la barra y valor alternativo para aria-valuetext.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Color del indicador mediante una variable CSS.',
  },
  {
    name: 'trackColor',
    type: 'string',
    default: 'undefined',
    description: 'Color del track mediante una variable CSS.',
  },
  {
    name: 'getValueLabel',
    type: '(value, max) => string',
    default: 'Reka UI',
    description: 'Resolver de la etiqueta accesible del progreso.',
  },
  {
    name: 'getValueText',
    type: '(value, max) => string',
    default: 'undefined',
    description: 'Resolver del texto accesible del valor.',
  },
  {
    name: 'ui',
    type: 'ProgressUI',
    default: 'undefined',
    description: 'Personalización dinámica de indicator y label.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: number | null]',
    default: '-',
    description: 'Actualiza el valor controlado mediante v-model:value.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'indicator',
    type: 'ProgressContext',
    default: 'ProgressIndicator',
    description: 'Reemplaza el indicador interno y recibe el contexto del progreso.',
  },
  {
    name: 'label',
    type: 'ProgressContext',
    default: 'label',
    description: 'Personaliza la etiqueta visible y recibe el contexto del progreso.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Progress</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Barra de progreso accesible con valores controlados, estado indeterminado, colores y slots.
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
        <p class="text-sm text-muted-foreground">
          Ajusta el valor, el máximo, la etiqueta y los colores del progreso.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <div class="grid w-full max-w-md gap-4">
              <Progress
                :value="playgroundIndeterminate ? null : playgroundValue"
                v-bind="playgroundProps"
              />
              <output class="text-center text-sm font-medium tabular-nums">
                {{
                  playgroundIndeterminate
                    ? 'Indeterminado'
                    : `${playgroundValue} / ${playgroundMax}`
                }}
              </output>
            </div>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">value</span>
            <input
              v-model.number="playgroundValue"
              type="number"
              min="0"
              :max="playgroundMax"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">max</span>
            <input
              v-model.number="playgroundMax"
              type="number"
              min="1"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">label</span>
            <input
              v-model="playgroundLabel"
              type="text"
              placeholder="Opcional"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">color</span>
            <input
              v-model="playgroundColor"
              type="text"
              placeholder="#3b82f6"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">trackColor</span>
            <input
              v-model="playgroundTrackColor"
              type="text"
              placeholder="Opcional"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="playgroundIndeterminate"
              type="checkbox"
              class="size-4 rounded border-input"
            />
            <span class="font-medium">value = null</span>
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
