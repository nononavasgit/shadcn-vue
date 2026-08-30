<script setup lang="ts">
import type { TimeContext } from '@/components/ui/Time'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'datetime',
    type: 'DateValue',
    default: '-',
    description: 'Fecha que se representa y se usa para el atributo datetime.',
  },
  {
    name: 'locale',
    type: 'string | string[]',
    default: 'locale del navegador',
    description: 'Locale usado para formatear la fecha.',
  },
  {
    name: 'format',
    type: 'Intl.DateTimeFormatOptions',
    default: 'undefined',
    description: 'Opciones nativas de Intl.DateTimeFormat.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'TimeContext',
    typeLink: '#time-context',
    default: '-',
    description: 'Contenido personalizado. Recibe la fecha formateada como date.',
  },
]

const exposeRows: ApiTableRow[] = []

const contextRows: ApiTableRow[] = [
  {
    name: 'date',
    type: 'string',
    description: 'Fecha formateada según locale y format.',
  },
]

function renderSlot(context: TimeContext) {
  return `Fecha: ${context.date}`
}
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Time</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Representa una fecha semantica con formato localizado y contexto para el slot.
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
      <ApiTable id="time-context" title="TimeContext" :rows="contextRows" />
    </div>
  </section>
</template>
