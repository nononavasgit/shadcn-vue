<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'autoFocus',
    type: 'boolean',
    default: 'false',
    description: 'Enfoca automáticamente el input al montarse.',
  },
  {
    name: 'placeholder',
    type: 'string',
    default: "''",
    description: 'Texto mostrado cuando el input está vacío.',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Deshabilita el input y la interacción del Autocomplete.',
  },
  {
    name: 'value',
    type: 'string | undefined',
    default: 'undefined',
    description: 'Valor controlado mediante v-model:value y sincronizado con AutocompleteRoot.',
  },
  {
    name: 'ui',
    type: '{ root?: () => HTMLAttributes; anchor?: () => HTMLAttributes; input?: () => HTMLAttributes; trigger?: () => HTMLAttributes; content?: () => HTMLAttributes; viewport?: () => HTMLAttributes; empty?: () => HTMLAttributes; separator?: () => HTMLAttributes; item?: () => HTMLAttributes; group?: () => HTMLAttributes; label?: () => HTMLAttributes }',
    default: 'undefined',
    description:
      'Personaliza las partes internas mediante resolvers sin contexto. Cada resolver devuelve atributos HTML, clases y estilos para su parte.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Autocomplete</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Autocomplete basado directamente en las primitivas de Reka UI. La API inicial mantiene la
        composición explícita.
      </p>
    </header>
    <div class="grid gap-4">
      <p>
        No añade props, emits, slots ni métodos propios de momento. Usa las primitivas de
        <a class="underline" href="https://reka-ui.com/docs/components/autocomplete">Reka UI</a>
        dentro del componente.
      </p>
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="[]" empty-text="No tiene emits propios." />
      <ApiTable
        title="Slots"
        type-label="slotProps"
        :show-default="false"
        :rows="[]"
        empty-text="No tiene slots propios."
      />
      <ApiTable title="Expose" :rows="[]" empty-text="No expone métodos." />
    </div>
  </section>
</template>
