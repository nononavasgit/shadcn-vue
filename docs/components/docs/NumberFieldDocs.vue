<script setup lang="ts">
import { numberFieldDefaults } from '@/components/ui/NumberField'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'number | null',
    default: 'undefined',
    description: 'Valor controlado mediante v-model:value.',
  },
  {
    name: 'min',
    type: 'number',
    default: String(numberFieldDefaults.min),
    description: 'Valor mínimo permitido para el campo numérico.',
  },
  {
    name: 'max',
    type: 'number',
    default: 'undefined',
    description: 'Valor máximo permitido para el campo numérico.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: String(numberFieldDefaults.disabled),
    description: 'Deshabilita la interacción del campo numérico.',
  },
  {
    name: 'disableWheelChange',
    type: 'boolean',
    default: String(numberFieldDefaults.disableWheelChange),
    description: 'Impide cambiar el valor usando la rueda del ratón.',
  },
  {
    name: 'focusOnChange',
    type: 'boolean',
    default: String(numberFieldDefaults.focusOnChange),
    description: 'Enfoca el campo cuando cambia su valor.',
  },
  {
    name: 'formatOptions',
    type: 'Intl.NumberFormatOptions',
    default: 'undefined',
    description: 'Opciones de Intl.NumberFormat para formatear el valor mostrado.',
  },
  {
    name: 'locale',
    type: 'string',
    default: 'locale del navegador',
    description: 'Locale usado por Intl.NumberFormat para formatear el valor mostrado.',
  },
  {
    name: 'id',
    type: 'string',
    default: 'undefined',
    description: 'Identificador del campo numérico y asociación con elementos externos.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: number]',
    default: '-',
    description: 'Actualiza el valor controlado mediante v-model:value.',
  },
]
const slotRows: ApiTableRow[] = []
const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">NumberField</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Campo numérico accesible con controles para incrementar y decrementar su valor.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
