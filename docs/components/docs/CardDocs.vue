<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Titulo de la tarjeta.',
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Descripcion secundaria de la tarjeta.',
  },
  {
    name: 'ui',
    type: '{ header?: () => HTMLAttributes; label?: () => HTMLAttributes; description?: () => HTMLAttributes; action?: () => HTMLAttributes; content?: () => HTMLAttributes; footer?: () => HTMLAttributes }',
    default: 'undefined',
    description: 'Funciones que devuelven atributos HTML para los elementos internos.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  { name: 'default', type: '-', description: 'Contenido principal.' },
  {
    name: 'header',
    type: '-',
    description: 'Reemplaza el encabezado completo.',
  },
  { name: 'label', type: '-', description: 'Personaliza el titulo.' },
  {
    name: 'description',
    type: '-',
    description: 'Personaliza la descripcion.',
  },
  {
    name: 'action',
    type: '-',
    description: 'Accion alineada en el encabezado.',
  },
  {
    name: 'footer',
    type: '-',
    description: 'Contenido del pie de tarjeta.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Card</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Contenedor compuesto para agrupar contenido, acciones y un pie de tarjeta.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="card-props" title="Props" :rows="propRows" />
      <ApiTable
        id="card-emits"
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable id="card-slots" title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
