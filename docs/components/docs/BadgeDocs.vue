<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Texto del badge.' },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Tamano del badge.',
  },
  {
    name: 'variant',
    type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'",
    default: "'solid'",
    description: 'Variante visual.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    default: "'primary'",
    description: 'Severidad semantica.',
  },
  { name: 'color', type: 'string', default: 'undefined', description: 'Color CSS personalizado.' },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono al inicio.',
  },
  {
    name: 'trailingIcon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono al final.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  { name: 'default', type: '-', description: 'Contenido principal.' },
  { name: 'leading', type: '-', description: 'Contenido antes del texto.' },
  { name: 'trailing', type: '-', description: 'Contenido despues del texto.' },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Badge</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Etiqueta compacta para estados, categorias y metadatos.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="badge-props" title="Props" :rows="propRows" />
      <ApiTable
        id="badge-emits"
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable
        id="badge-slots"
        title="Slots"
        :rows="slotRows"
        type-label="slotProps"
        :show-default="false"
      />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
