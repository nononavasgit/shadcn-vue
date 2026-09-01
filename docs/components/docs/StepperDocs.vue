<script setup lang="ts">
import { stepperDefaults } from '@/components/ui/Stepper/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'number | undefined',
    description: 'Paso activo controlado mediante v-model:value.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: `'${stepperDefaults.orientation}'`,
    description: 'Orientación de la lista de pasos y la navegación por teclado.',
  },
  {
    name: 'linear',
    type: 'boolean',
    default: String(stepperDefaults.linear),
    description: 'Limita el avance a pasos ya alcanzados y al siguiente paso.',
  },
  {
    name: 'steps',
    type: 'StepperStep[]',
    typeLink: '#stepper-step',
    default: '[]',
    description: 'Pasos que genera el componente en el orden indicado.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Color personalizado aplicado a indicadores, separadores y foco.',
  },
  {
    name: 'ui',
    type: '{ root?: (context: StepperContext) => HTMLAttributes; list?: (context: StepperContext) => HTMLAttributes; item?: (context: StepperItemContext) => HTMLAttributes; trigger?: (context: StepperItemContext) => HTMLAttributes; indicator?: (context: StepperItemContext) => HTMLAttributes; wrapper?: (context: StepperItemContext) => HTMLAttributes; label?: (context: StepperItemContext) => HTMLAttributes; description?: (context: StepperItemContext) => HTMLAttributes; separator?: (context: StepperItemContext) => HTMLAttributes; content?: (context: StepperItemContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ root?: (context: ' },
      { text: 'StepperContext', link: '#stepper-context' },
      { text: ') => HTMLAttributes; list?: (context: ' },
      { text: 'StepperContext', link: '#stepper-context' },
      { text: ') => HTMLAttributes; item?: (context: ' },
      { text: 'StepperItemContext', link: '#stepper-item-context' },
      { text: ') => HTMLAttributes; trigger?: (context: ' },
      { text: 'StepperItemContext', link: '#stepper-item-context' },
      { text: ') => HTMLAttributes; indicator?: (context: ' },
      { text: 'StepperItemContext', link: '#stepper-item-context' },
      { text: ') => HTMLAttributes; wrapper?: (context: ' },
      { text: 'StepperItemContext', link: '#stepper-item-context' },
      { text: ') => HTMLAttributes; label?: (context: ' },
      { text: 'StepperItemContext', link: '#stepper-item-context' },
      { text: ') => HTMLAttributes; description?: (context: ' },
      { text: 'StepperItemContext', link: '#stepper-item-context' },
      { text: ') => HTMLAttributes; separator?: (context: ' },
      { text: 'StepperItemContext', link: '#stepper-item-context' },
      { text: ') => HTMLAttributes; content?: (context: ' },
      { text: 'StepperItemContext', link: '#stepper-item-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Resolvers contextuales para personalizar las partes internas.',
  },
]

const stepRows: ApiTableRow[] = [
  {
    name: 'slot',
    type: 'string | number',
    default: 'step',
    description: 'Clave usada para resolver los slots dinámicos individuales.',
  },
  { name: 'step', type: 'number', required: true, description: 'Valor único del paso.' },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Etiqueta visible del paso.',
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Descripción secundaria del paso.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono mostrado en el indicador del paso.',
  },
  {
    name: 'content',
    type: 'string',
    default: 'undefined',
    description: 'Contenido por defecto del paso.',
  },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita el paso.' },
  {
    name: 'completed',
    type: 'boolean',
    default: 'false',
    description: 'Fuerza el estado completado del paso.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: number | undefined]',
    description: 'Actualiza el paso activo controlado.',
  },
]

const slotRows: ApiTableRow[] = [
  { name: 'default', type: 'StepperItemContext', description: 'Contenido del paso activo.' },
  { name: 'indicator', type: 'StepperItemContext', description: 'Reemplaza el indicador.' },
  {
    name: 'indicator-{slot}',
    type: 'StepperItemContext',
    description: 'Personaliza el indicador de un paso concreto.',
  },
  { name: 'label', type: 'StepperItemContext', description: 'Reemplaza la etiqueta.' },
  {
    name: 'label-{slot}',
    type: 'StepperItemContext',
    description: 'Personaliza la etiqueta de un paso concreto.',
  },
  { name: 'description', type: 'StepperItemContext', description: 'Reemplaza la descripción.' },
  {
    name: 'description-{slot}',
    type: 'StepperItemContext',
    description: 'Personaliza la descripción de un paso concreto.',
  },
  {
    name: 'content',
    type: 'StepperItemContext',
    description: 'Reemplaza el contenido del paso activo.',
  },
  {
    name: 'content-{slot}',
    type: 'StepperItemContext',
    description: 'Personaliza el contenido de un paso concreto.',
  },
]

const stepperContextRows: ApiTableRow[] = [
  { name: 'value', type: 'number | undefined', description: 'Valor del paso activo.' },
  { name: 'totalSteps', type: 'number', description: 'Número total de pasos.' },
  {
    name: 'isNextDisabled / isPrevDisabled',
    type: 'boolean',
    description: 'Indica si la navegación adyacente está deshabilitada.',
  },
  {
    name: 'isFirstStep / isLastStep',
    type: 'boolean',
    description: 'Indica si el paso activo está en un extremo.',
  },
  {
    name: 'goToStep / nextStep / prevStep',
    type: 'Function',
    description: 'Métodos para cambiar el paso activo.',
  },
  {
    name: 'hasNext / hasPrev',
    type: '() => boolean',
    description: 'Indica si existe navegación disponible.',
  },
]

const stepperItemContextRows: ApiTableRow[] = [
  {
    name: 'item',
    type: 'StepperStep',
    typeLink: '#stepper-step',
    description: 'Paso asociado al contexto del item.',
  },
  { name: 'index', type: 'number', description: 'Índice del paso.' },
  { name: 'completed', type: 'boolean', description: 'Indica si el paso está completado.' },
  {
    name: 'active / first / last',
    type: 'boolean',
    description: 'Estado del paso respecto a la lista.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Stepper</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Flujo de pasos accesible con navegación lineal, orientación vertical, contenido y slots
        contextuales.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable id="stepper-step" title="StepperStep" :rows="stepRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="stepper-context" title="StepperContext" :rows="stepperContextRows" />
      <ApiTable
        id="stepper-item-context"
        title="StepperItemContext"
        :rows="stepperItemContextRows"
      />
    </div>
  </section>
</template>
