<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'ribbons',
    type: 'RibbonItem[]',
    typeLink: '#ribbon-item',
    default: '[]',
    description:
      'Cintas que se muestran. Cada elemento admite label, severity, color, position, rotate y zIndex.',
  },
]

const itemRows: ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    required: true,
    description: 'Texto que se muestra dentro de la cinta.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    default: "'primary'",
    description: 'Color semántico de la cinta.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Color CSS personalizado. Tiene prioridad sobre severity.',
  },
  {
    name: 'position',
    type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
    default: "'top-right'",
    description: 'Esquina en la que se coloca la cinta.',
  },
  {
    name: 'rotate',
    type: 'number',
    default: 'según position',
    description: 'Rotación personalizada en grados.',
  },
  {
    name: 'zIndex',
    type: 'number',
    default: '20 + index',
    description: 'Orden de apilado de la cinta.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  { name: 'default', type: '-', description: 'Contenido que se muestra sobre las bandas.' },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Ribbon</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Cintas diagonales para destacar una tarjeta o contenido desde una de sus esquinas.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="ribbon-props" title="Props" :rows="propRows" />
      <ApiTable id="ribbon-item" title="RibbonItem" :rows="itemRows" />
      <ApiTable
        id="ribbon-emits"
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable
        id="ribbon-slots"
        title="Slots"
        :rows="slotRows"
        type-label="slotProps"
        :show-default="false"
      />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
