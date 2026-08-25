<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'atomic',
    type: 'boolean',
    default: 'true',
    description: 'Indica si el lector de pantalla debe anunciar el contenido completo.',
  },
  {
    name: 'message',
    type: 'string',
    default: "''",
    description: 'Mensaje anunciado cuando no se proporciona contenido en el slot.',
  },
  {
    name: 'politeness',
    type: "'assertive' | 'polite' | 'off'",
    default: "'polite'",
    description: 'Configura aria-live y el role semantico del anuncio.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: '-',
    default: '-',
    description: 'Personaliza el contenido del anuncio.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Announcer</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Expone mensajes dinamicos a tecnologias de asistencia mediante aria-live.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="announcer-props" title="Props" :rows="propRows" />
      <ApiTable
        id="announcer-emits"
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable id="announcer-slots" title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
