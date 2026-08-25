<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const iconConfigRows: ApiTableRow[] = [
  {
    name: 'IconConfig',
    type: 'IconProps & HTMLAttributes',
    typeParts: [{ text: 'IconProps', link: '#icon-props' }, { text: ' & HTMLAttributes' }],
    description: 'Configuracion completa del icono y atributos HTML.',
  },
]

const propRows: ApiTableRow[] = [
  {
    name: 'name',
    type: 'keyof typeof ICONS',
    required: true,
    description: 'Nombre del icono que se va a renderizar.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Tamano visual del icono.',
  },
  {
    name: 'color',
    type: 'string',
    default: "'currentColor'",
    description: 'Color CSS aplicado al icono.',
  },
]

const emitRows: ApiTableRow[] = []
const slotRows: ApiTableRow[] = []
const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Icon</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Renderiza un icono Lucide con una API compacta y consistente.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="icon-props" title="Props" :rows="propRows" />
      <ApiTable
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable
        title="Slots"
        type-label="slotProps"
        :show-default="false"
        :rows="slotRows"
        empty-text="Este componente no define slots."
      />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="icon-config" title="IconConfig" :rows="iconConfigRows" />
    </div>
  </section>
</template>
