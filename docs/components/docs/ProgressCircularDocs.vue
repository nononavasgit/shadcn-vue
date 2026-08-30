<script setup lang="ts">
import { progressCircularDefaults } from '@/components/ui/ProgressCircular/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'number | null',
    default: String(progressCircularDefaults.value),
    description:
      'Valor controlado mediante v-model:value; null representa un estado indeterminado.',
  },
  {
    name: 'max',
    type: 'number',
    default: String(progressCircularDefaults.max),
    description: 'Valor máximo utilizado para calcular el porcentaje.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Etiqueta visible en el centro del progreso.',
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
    name: 'size',
    type: 'number | string',
    default: String(progressCircularDefaults.size),
    description: 'Tamaño del contenedor circular; los números se convierten a píxeles.',
  },
  {
    name: 'thickness',
    type: 'number',
    default: String(progressCircularDefaults.thickness),
    description: 'Grosor del track y del indicador SVG.',
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
    type: '{ svg?: (context: ProgressCircularContext) => SVGAttributes; track?: (context: ProgressCircularContext) => SVGAttributes; indicator?: (context: ProgressCircularContext) => SVGAttributes; label?: (context: ProgressCircularContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ svg?: (context: ' },
      { text: 'ProgressCircularContext', link: '#progress-circular-context' },
      { text: ') => SVGAttributes; track?: (context: ' },
      { text: 'ProgressCircularContext', link: '#progress-circular-context' },
      { text: ') => SVGAttributes; indicator?: (context: ' },
      { text: 'ProgressCircularContext', link: '#progress-circular-context' },
      { text: ') => SVGAttributes; label?: (context: ' },
      { text: 'ProgressCircularContext', link: '#progress-circular-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Personalización dinámica de svg, track, indicator y label.',
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
    type: 'ProgressCircularContext',
    typeLink: '#progress-circular-context',
    default: 'label',
    description: 'Personaliza la etiqueta central y recibe el contexto del progreso.',
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
      <h2 class="text-2xl font-semibold">ProgressCircular</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Progreso circular accesible con valores controlados, estado indeterminado, colores y slots.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable
        id="progress-circular-context"
        title="ProgressCircularContext"
        :rows="contextRows"
      />
    </div>
  </section>
</template>
