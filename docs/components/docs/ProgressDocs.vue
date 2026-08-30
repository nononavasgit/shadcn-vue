<script setup lang="ts">
import { progressDefaults } from '@/components/ui/Progress/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

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

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="progress-context" title="ProgressContext" :rows="contextRows" />
    </div>
  </section>
</template>
