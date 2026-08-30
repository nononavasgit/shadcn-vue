<script setup lang="ts">
import { checkboxDefaults } from '@/components/ui/Checkbox/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'boolean | string | number | "indeterminate"',
    default: 'false',
    description: 'Valor controlado del checkbox.',
  },
  {
    name: 'trueValue',
    type: 'boolean | string | number',
    default: String(checkboxDefaults.trueValue),
    description: 'Valor emitido cuando el checkbox esta marcado.',
  },
  {
    name: 'falseValue',
    type: 'boolean | string | number',
    default: String(checkboxDefaults.falseValue),
    description: 'Valor emitido cuando el checkbox esta desmarcado.',
  },
  {
    name: 'ui',
    type: '{ indicator?: (context: CheckboxContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ indicator?: (context: ' },
      { text: 'CheckboxContext', link: '#checkbox-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: String(checkboxDefaults.ui),
    description: 'Personalizacion dinamica del indicador.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: boolean | string | number | "indeterminate"]',
    default: '-',
    description: 'Actualiza el valor controlado mediante v-model:value.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'indicator',
    type: 'CheckboxContext',
    typeLink: '#checkbox-context',
    default: '-',
    description: 'Contenido del indicador con state.',
  },
]

const exposeRows: ApiTableRow[] = []

const contextRows: ApiTableRow[] = [
  {
    name: 'state',
    type: 'boolean | "indeterminate"',
    default: '-',
    description: 'Estado derivado respecto a trueValue.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Checkbox</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Control booleano con soporte para valores personalizados y estado indeterminado.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="checkbox-context" title="CheckboxContext" :rows="contextRows" />
    </div>
  </section>
</template>
