<script setup lang="ts">
import { computed, ref } from 'vue'

import { Switch, type SwitchProps, type SwitchValue } from '@/components/ui/Switch'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

type PlaygroundState = 'false' | 'true'

const playgroundState = ref<PlaygroundState>('false')

const playgroundValue = computed<SwitchValue>(() => playgroundState.value === 'true')

const playgroundProps = computed<SwitchProps>(() => ({
  value: playgroundValue.value,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'SwitchValue',
    type: 'boolean | number | string',
    description: 'Valores que pueden representar los estados del switch.',
  },
  {
    name: 'SwitchContext',
    type: '{ value: SwitchValue; checked: boolean; ui?: SwitchUI }',
    description: 'Contexto disponible en el slot thumb y en el resolver de UI.',
  },
  {
    name: 'SwitchUI',
    type: '{ thumb?: (context: SwitchContext) => HTMLAttributes }',
    description: 'Atributos dinamicos para el thumb.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'value',
    type: 'SwitchValue',
    default: 'false',
    description: 'Valor controlado del switch.',
  },
  {
    name: 'trueValue',
    type: 'SwitchValue',
    default: 'true',
    description: 'Valor emitido cuando el switch esta activado.',
  },
  {
    name: 'falseValue',
    type: 'SwitchValue',
    default: 'false',
    description: 'Valor emitido cuando el switch esta desactivado.',
  },
  {
    name: 'ui',
    type: 'SwitchUI',
    default: 'undefined',
    description: 'Personalizacion dinamica del thumb.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:value',
    type: '[value: SwitchValue]',
    default: '-',
    description: 'Actualiza el valor controlado mediante v-model:value.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'thumb',
    type: 'SwitchContext',
    default: '-',
    description: 'Contenido del thumb con value y checked.',
  },
]

const exposeRows: ApiTableRow[] = []
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
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">Tipos publicos usados por la API.</p>
      </div>
      <ApiTable title="Tipos" :rows="typeRows" />
    </section>

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
    </div>
  </section>
</template>
