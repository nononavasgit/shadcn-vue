<script setup lang="ts">
import { emptyDefaults } from '@/components/ui/Empty/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Título principal del estado vacío.',
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Descripción secundaria del estado vacío.',
  },
  {
    name: 'mediaVariant',
    type: "'default' | 'icon'",
    default: `'${emptyDefaults.mediaVariant}'`,
    description: 'Estilo aplicado al contenido del slot media.',
  },
  {
    name: 'ui',
    type: '{ header?: () => HTMLAttributes; media?: () => HTMLAttributes; label?: () => HTMLAttributes; description?: () => HTMLAttributes; content?: () => HTMLAttributes }',
    default: 'undefined',
    description: 'Atributos personalizados para header, media, label, description y content.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Acciones o contenido adicional.',
  },
  {
    name: 'media',
    type: 'Record<string, never>',
    default: '-',
    description: 'Icono o elemento visual del estado vacío.',
  },
  {
    name: 'label',
    type: 'Record<string, never>',
    default: 'label',
    description: 'Personaliza el título.',
  },
  {
    name: 'description',
    type: 'Record<string, never>',
    default: 'description',
    description: 'Personaliza la descripción.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Empty</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Estado vacío compuesto con título, descripción, contenido y media opcionales.
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
