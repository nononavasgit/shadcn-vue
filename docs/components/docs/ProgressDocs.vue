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

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'number | null',
    default: String(progressDefaults.value),
    description:
      'Valor controlado mediante v-model:value; null representa un estado indeterminado.',
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
    description: 'Color CSS del indicador; también admite valores hexadecimales.',
  },
  {
    name: 'trackColor',
    type: 'string',
    default: 'undefined',
    description: 'Color CSS del track; también admite valores hexadecimales.',
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
    type: '{ indicator?: (context: ProgressContext) => HTMLAttributes; label?: (context: ProgressContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ indicator?: (context: ' },
      { text: 'ProgressContext', link: '#progress-context' },
      { text: ') => HTMLAttributes; label?: (context: ' },
      { text: 'ProgressContext', link: '#progress-context' },
      { text: ') => HTMLAttributes }' },
    ],
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
    name: 'label',
    type: 'ProgressContext',
    typeLink: '#progress-context',
    default: 'label',
    description: 'Personaliza la etiqueta visible y recibe el contexto del progreso.',
  },
]

const exposeRows: ApiTableRow[] = []

const contextRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'number | null',
    description: 'Valor actual del progreso; null representa un estado indeterminado.',
  },
  {
    name: 'max',
    type: 'number',
    description: 'Valor máximo utilizado para calcular el porcentaje.',
  },
  {
    name: 'percentage',
    type: 'number',
    description: 'Porcentaje calculado y limitado entre 0 y 100.',
  },
]
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
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="progress-context" title="ProgressContext" :rows="contextRows" />
    </div>
  </section>
</template>
