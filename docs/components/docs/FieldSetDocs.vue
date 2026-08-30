<script setup lang="ts">
import { fieldSetDefaults } from '@/components/ui/FieldSet/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

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
