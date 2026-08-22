<script setup lang="ts">
import { computed, ref } from 'vue'

import { Slider, type SliderProps } from '@/components/ui/Slider'
import { sliderDefaults } from '@/components/ui/Slider/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const playgroundValue = ref<number[] | null>([40])
const playgroundOrientation = ref<NonNullable<SliderProps['orientation']>>(
  sliderDefaults.orientation,
)
const playgroundMin = ref(sliderDefaults.min)
const playgroundMax = ref(sliderDefaults.max)
const playgroundStep = ref(sliderDefaults.step)

const playgroundProps = computed<Omit<SliderProps, 'value'>>(() => ({
  orientation: playgroundOrientation.value,
  min: playgroundMin.value,
  max: playgroundMax.value,
  step: playgroundStep.value,
}))

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'number[] | null',
    default: JSON.stringify(sliderDefaults.value),
    description: 'Valores controlados del slider mediante v-model:value.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: String(sliderDefaults.disabled),
    description: 'Impide la interacción con el slider.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: `'${sliderDefaults.orientation}'`,
    description: 'Orientación del slider.',
  },
  {
    name: 'inverted',
    type: 'boolean',
    default: String(sliderDefaults.inverted),
    description: 'Invierte visualmente la dirección del slider.',
  },
  {
    name: 'min',
    type: 'number',
    default: String(sliderDefaults.min),
    description: 'Valor mínimo permitido.',
  },
  {
    name: 'max',
    type: 'number',
    default: String(sliderDefaults.max),
    description: 'Valor máximo permitido.',
  },
  {
    name: 'step',
    type: 'number',
    default: String(sliderDefaults.step),
    description: 'Intervalo entre valores permitidos.',
  },
  {
    name: 'minStepsBetweenThumbs',
    type: 'number',
    default: String(sliderDefaults.minStepsBetweenThumbs),
    description: 'Distancia mínima entre thumbs expresada en pasos.',
  },
  {
    name: 'thumbAlignment',
    type: "'contain' | 'overflow'",
    default: `'${sliderDefaults.thumbAlignment}'`,
    description: 'Alineación de los thumbs respecto al track.',
  },
  {
    name: 'name',
    type: 'string',
    default: 'undefined',
    description: 'Nombre del control de formulario.',
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'undefined',
    description: 'Indica si el control es obligatorio en un formulario.',
  },
  {
    name: 'ui',
    type: '{ track?: (context: SliderContext) => HTMLAttributes; range?: (context: SliderContext) => HTMLAttributes; thumb?: (context: SliderThumbContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ track?: (context: ' },
      { text: 'SliderContext', link: '#slider-context' },
      { text: ') => HTMLAttributes; range?: (context: ' },
      { text: 'SliderContext', link: '#slider-context' },
      { text: ') => HTMLAttributes; thumb?: (context: ' },
      { text: 'SliderThumbContext', link: '#slider-thumb-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Atributos personalizados para track, range y thumb.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: number[] | null]',
    default: '-',
    description: 'Actualiza el valor controlado mediante v-model:value.',
  },
  {
    name: 'valueCommit',
    type: '[value: number[]]',
    default: '-',
    description: 'Se emite desde SliderRoot al finalizar una interacción.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'track',
    type: 'SliderContext',
    typeLink: '#slider-context',
    default: 'range',
    description: 'Reemplaza el track completo.',
  },
  {
    name: 'range',
    type: 'SliderContext',
    typeLink: '#slider-context',
    default: 'SliderRange',
    description: 'Personaliza el rango activo dentro del track.',
  },
  {
    name: 'thumb',
    type: 'SliderThumbContext',
    typeLink: '#slider-thumb-context',
    default: '-',
    description: 'Contenido opcional dentro de cada thumb.',
  },
]

const exposeRows: ApiTableRow[] = []

const contextRows: ApiTableRow[] = [
  {
    name: 'values',
    type: 'number[]',
    description: 'Valores actuales del slider compartidos por track y range.',
  },
]

const thumbContextRows: ApiTableRow[] = [
  {
    name: 'values',
    type: 'number[]',
    description: 'Valores actuales de todos los thumbs.',
  },
  {
    name: 'index',
    type: 'number',
    description: 'Índice del thumb dentro del array de valores.',
  },
  {
    name: 'value',
    type: 'number',
    description: 'Valor del thumb actual.',
  },
  {
    name: 'first',
    type: 'boolean',
    description: 'Indica si es el primer thumb.',
  },
  {
    name: 'last',
    type: 'boolean',
    description: 'Indica si es el último thumb.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Slider</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Control de rango con uno o varios thumbs, orientación y valores controlados.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Ajusta los límites, el paso y la orientación del slider.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <div
              :class="[
                'flex w-full max-w-md items-center gap-4',
                playgroundOrientation === 'vertical' ? 'h-48 justify-center' : 'flex-col',
              ]"
            >
              <Slider
                v-bind="playgroundProps"
                v-model:value="playgroundValue"
                :class="playgroundOrientation === 'vertical' ? 'h-full' : 'w-full'"
              />
              <output class="text-sm font-medium tabular-nums">
                {{ playgroundValue?.join(' – ') ?? 'Sin valor' }}
              </output>
            </div>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">orientation</span>
            <select
              v-model="playgroundOrientation"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">min</span>
            <input
              v-model.number="playgroundMin"
              type="number"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">max</span>
            <input
              v-model.number="playgroundMax"
              type="number"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">step</span>
            <input
              v-model.number="playgroundStep"
              type="number"
              min="0.01"
              step="0.01"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="slider-context" title="SliderContext" :rows="contextRows" />
      <ApiTable id="slider-thumb-context" title="SliderThumbContext" :rows="thumbContextRows" />
    </div>
  </section>
</template>
