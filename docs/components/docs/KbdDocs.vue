<script setup lang="ts">
import { kbdDefaults } from '@/components/ui/Kbd/defaults'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Texto de la tecla o atajo.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    default: kbdDefaults.severity,
    description: 'Severidad semántica usada para colorear la tecla.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: kbdDefaults.size,
    description: 'Tamaño visual de la tecla.',
  },
  {
    name: 'variant',
    type: "'solid' | 'outline' | 'soft' | 'subtle'",
    default: kbdDefaults.variant,
    description: 'Estilo visual de la tecla.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Color personalizado de la tecla.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'Record<string, never>',
    default: '-',
    description: 'Contenido personalizado de la tecla.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Kbd</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Representa una tecla o un atajo de teclado con un estilo compacto.
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
