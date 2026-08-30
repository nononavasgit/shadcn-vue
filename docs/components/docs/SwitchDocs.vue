<script setup lang="ts">
import { switchDefaults } from '@/components/ui/Switch/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'boolean | string | number',
    default: String(switchDefaults.falseValue),
    description: 'Valor controlado del switch.',
  },
  {
    name: 'trueValue',
    type: 'boolean | string | number',
    default: String(switchDefaults.trueValue),
    description: 'Valor emitido cuando el switch esta activado.',
  },
  {
    name: 'falseValue',
    type: 'boolean | string | number',
    default: String(switchDefaults.falseValue),
    description: 'Valor emitido cuando el switch esta desactivado.',
  },
  {
    name: 'ui',
    type: '{ thumb?: (context: SwitchContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ thumb?: (context: ' },
      { text: 'SwitchContext', link: '#switch-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Personalizacion dinamica del thumb.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: boolean | string | number]',
    default: '-',
    description: 'Actualiza el valor controlado mediante v-model:value.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'thumb',
    type: 'SwitchContext',
    typeLink: '#switch-context',
    default: '-',
    description: 'Contenido del thumb con state.',
  },
]

const exposeRows: ApiTableRow[] = []

const contextRows: ApiTableRow[] = [
  {
    name: 'state',
    type: 'boolean',
    default: '-',
    description: 'Estado derivado respecto a trueValue.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Switch</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Control binario con valores personalizados y contexto para su thumb.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="switch-context" title="SwitchContext" :rows="contextRows" />
    </div>
  </section>
</template>
