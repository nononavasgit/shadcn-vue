<script setup lang="ts">
import { computed, ref } from 'vue'

import { FieldSet, type FieldSetLegendVariant, type FieldSetProps } from '@/components/ui/FieldSet'
import { fieldSetDefaults } from '@/components/ui/FieldSet/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'
import Playground from '../Playground.vue'

const legend = ref('Profile')
const description = ref('Contact details and preferences')
const legendVariant = ref<FieldSetLegendVariant>(fieldSetDefaults.legendVariant)

const playgroundProps = computed<FieldSetProps>(() => ({
  legend: legend.value || undefined,
  description: description.value || undefined,
  legendVariant: legendVariant.value,
}))

const propRows: ApiTableRow[] = [
  {
    name: 'legend',
    type: 'string',
    default: String(fieldSetDefaults.legend),
    description: 'Texto de la leyenda del fieldset.',
  },
  {
    name: 'description',
    type: 'string',
    default: String(fieldSetDefaults.description),
    description: 'Descripcion secundaria del fieldset.',
  },
  {
    name: 'legendVariant',
    type: "'legend' | 'label'",
    default: `'${fieldSetDefaults.legendVariant}'`,
    description: 'Variacion visual de la leyenda.',
  },
  {
    name: 'ui',
    type: '{ legend?: () => HTMLAttributes; description?: () => HTMLAttributes; group?: () => HTMLAttributes }',
    default: String(fieldSetDefaults.ui),
    description: 'Atributos personalizados para legend, description y group.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: '-',
    default: '-',
    description: 'Contenido del grupo.',
  },
  {
    name: 'legend',
    type: '-',
    default: '-',
    description: 'Personaliza la leyenda.',
  },
  {
    name: 'description',
    type: '-',
    default: '-',
    description: 'Personaliza la descripcion.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">FieldSet</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Agrupa campos relacionados con una leyenda y una descripcion opcionales.
      </p>
    </header>

    <section class="grid gap-4">
      <div>
        <h3 class="text-lg font-medium">Playground</h3>
        <p class="text-sm text-muted-foreground">Modifica la leyenda y su variante visual.</p>
      </div>

      <div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div class="grid min-h-52 place-items-center rounded-lg border bg-muted/20 p-8">
          <Playground>
            <FieldSet v-bind="playgroundProps">
              <div class="grid gap-3">
                <label class="grid gap-1.5 text-sm">
                  <span class="font-medium">First name</span>
                  <input
                    type="text"
                    class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label class="grid gap-1.5 text-sm">
                  <span class="font-medium">Last name</span>
                  <input
                    type="text"
                    class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
              </div>
            </FieldSet>
          </Playground>
        </div>

        <div class="grid content-start gap-4 rounded-lg border p-4">
          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">legend</span>
            <input
              v-model="legend"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">description</span>
            <input
              v-model="description"
              type="text"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label class="grid gap-1.5 text-sm">
            <span class="font-medium">legendVariant</span>
            <select
              v-model="legendVariant"
              class="h-9 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="legend">legend</option>
              <option value="label">label</option>
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
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
