<script setup lang="ts">
import { computed, ref } from 'vue'

import { Switch, type SwitchProps, type SwitchValue } from '@/components/ui/Switch'
import { switchDefaults } from '@/components/ui/Switch/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

type PlaygroundState = 'false' | 'true'

const playgroundState = ref<PlaygroundState>('false')

const playgroundValue = computed<SwitchValue>(() => playgroundState.value === 'true')

const playgroundProps = computed<SwitchProps>(() => ({
  value: playgroundValue.value,
}))

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

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">Cambia el estado del switch.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <Switch v-bind="playgroundProps" aria-label="Switch playground" />
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">value</span>
            <select
              v-model="playgroundState"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="false">false</option>
              <option value="true">true</option>
            </select>
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="switch-context" title="SwitchContext" :rows="contextRows" />
    </div>
  </section>
</template>
