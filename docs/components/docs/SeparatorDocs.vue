<script setup lang="ts">
import { computed, ref } from 'vue'

import { Separator, type SeparatorProps } from '@/components/ui/Separator'
import { separatorDefaults } from '@/components/ui/Separator/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const playgroundOrientation = ref<NonNullable<SeparatorProps['orientation']>>(
  separatorDefaults.orientation,
)
const playgroundDecorative = ref(separatorDefaults.decorative)

const playgroundProps = computed<SeparatorProps>(() => ({
  orientation: playgroundOrientation.value,
  decorative: playgroundDecorative.value,
}))

const typeRows: ApiTableRow[] = [
  {
    name: 'SeparatorRootProps',
    type: "{ orientation?: 'horizontal' | 'vertical'; decorative?: boolean }",
    description: 'Props heredadas del separador de Reka UI.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: `'${separatorDefaults.orientation}'`,
    description: 'Orientación visual y semántica del separador.',
  },
  {
    name: 'decorative',
    type: 'boolean',
    default: String(separatorDefaults.decorative),
    description: 'Indica si el separador es puramente decorativo.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Contenido opcional renderizado dentro del separador.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Separator</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Divide visual y semánticamente grupos de contenido relacionados.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Tipos</h3>
        <p class="text-sm text-muted-foreground">Tipos públicos usados por la API.</p>
      </div>
      <ApiTable title="Tipos" :rows="typeRows" />
    </section>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">
          Cambia la orientación y el comportamiento semántico del separador.
        </p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <div
              :class="[
                'flex w-full max-w-md items-center gap-4',
                playgroundOrientation === 'vertical' ? 'h-32 justify-center' : 'flex-col',
              ]"
            >
              <span class="text-sm font-medium">Contenido A</span>
              <Separator v-bind="playgroundProps" />
              <span class="text-sm font-medium">Contenido B</span>
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

          <label class="flex items-center gap-2 text-sm">
            <input
              v-model="playgroundDecorative"
              type="checkbox"
              class="size-4 rounded border-input"
            />
            <span class="font-medium">decorative</span>
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
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
