<script setup lang="ts">
import { linkDefaults } from '@/components/ui/Link/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'to',
    type: 'RouteLocationRaw | string',
    default: String(linkDefaults.to),
    description: 'Destino interno de Vue Router o URL externa. Si falta, se renderiza un div.',
  },
  {
    name: 'replace',
    type: 'boolean',
    default: String(linkDefaults.replace),
    description: 'Reemplaza la entrada actual del historial al navegar.',
  },
]

const inheritedRows: ApiTableRow[] = [
  {
    name: 'ButtonProps',
    type: 'ButtonProps',
    typeLink: '/button#button-props',
    default: '-',
    description: 'Props visuales heredadas de Button, excepto as, asChild y loading.',
  },
]

const emitRows: ApiTableRow[] = [
  { name: 'click', type: '[event: PointerEvent]', default: '-', description: 'Click del enlace.' },
]

const slotRows: ApiTableRow[] = [
  { name: 'default', type: '-', default: '-', description: 'Contenido principal.' },
  {
    name: 'leading',
    type: '-',
    default: '-',
    description: 'Contenido antes del texto.',
  },
  {
    name: 'trailing',
    type: '-',
    default: '-',
    description: 'Contenido despues del texto.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Link</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Un enlace interno o externo que conserva la API visual de Button. Las unicas props propias
        de RouterLink son <code>to</code> y <code>replace</code>. Hereda las props, el emit
        <code>click</code> y los slots <code>default</code>, <code>leading</code> y
        <code>trailing</code> de Button, excepto <code>as</code>, <code>asChild</code>,
        <code>loading</code> y el slot <code>loading</code>.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Button API heredada" :rows="inheritedRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
