<script setup lang="ts">
import { computed, ref } from 'vue'

import { Button } from '@/components/ui/Button'
import {
  ButtonGroup,
  type ButtonGroupOrientation,
  type ButtonGroupProps,
  type ButtonGroupSize,
} from '@/components/ui/ButtonGroup'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const orientation = ref<ButtonGroupOrientation>('horizontal')
const size = ref<ButtonGroupSize>('md')

const playgroundProps = computed<ButtonGroupProps>(() => ({
  orientation: orientation.value,
  size: size.value,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'ButtonGroupOrientation',
    type: "'horizontal' | 'vertical'",
    description: 'Direccion en la que se organizan los botones.',
  },
  {
    name: 'ButtonGroupSize',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    description: 'Tamano aplicado a los botones del grupo.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'orientation',
    type: 'ButtonGroupOrientation',
    default: "'horizontal'",
    description: 'Direccion del grupo de botones.',
  },
  {
    name: 'size',
    type: 'ButtonGroupSize',
    default: "'md'",
    description: 'Tamano de los botones del grupo.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Botones y contenido que forman el grupo.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">ButtonGroup</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Agrupa botones relacionados y ajusta sus bordes, espaciado y tamano de forma consistente.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">
          Tipos publicos usados por la API del componente.
        </p>
      </div>
      <ApiTable title="Tipos" :rows="typeRows" />
    </section>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">Cambia la orientacion y el tamano del grupo.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <ButtonGroup v-bind="playgroundProps">
              <Button>Back</Button>
              <Button>Next</Button>
              <Button>Finish</Button>
            </ButtonGroup>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">orientation</span>
            <select
              v-model="orientation"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
            </select>
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">size</span>
            <select
              v-model="size"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="xs">xs</option>
              <option value="sm">sm</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
            </select>
          </label>
        </div>
      </div>
    </section>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable title="Slots" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
