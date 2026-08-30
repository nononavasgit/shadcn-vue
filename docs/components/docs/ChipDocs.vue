<script setup lang="ts">
import { chipDefaults } from '@/components/ui/Chip/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Cadena CSS o valor hexadecimal.',
  },
  {
    name: 'size',
    type: "'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'",
    default: `'${chipDefaults.size}'`,
    description: 'Tamaño del indicador.',
  },
  {
    name: 'position',
    type: "'top-right' | 'bottom-right' | 'top-left' | 'bottom-left'",
    default: `'${chipDefaults.position}'`,
    description: 'Posición del chip respecto a su contenedor.',
  },
  {
    name: 'inset',
    type: 'boolean',
    default: String(chipDefaults.inset),
    description: 'Mantiene el chip dentro del borde del elemento redondeado.',
  },
  {
    name: 'standalone',
    type: 'boolean',
    default: String(chipDefaults.standalone),
    description: 'Renderiza el chip en posición relativa en lugar de absoluta.',
  },
  {
    name: 'show',
    type: 'boolean',
    default: 'true',
    description: 'Controla la visibilidad mediante v-model:show.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:show',
    type: '(value: boolean) => void',
    description: 'Se emite al actualizar el modelo de visibilidad.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Elemento o contenido sobre el que se coloca el indicador.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Chip</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Indicador compacto para mostrar estados sobre otro elemento.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
