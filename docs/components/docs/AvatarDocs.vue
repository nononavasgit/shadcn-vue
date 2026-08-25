<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'src',
    type: 'string',
    default: "''",
    description: 'URL de la imagen. Se envia al AvatarImage de Reka UI.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Tamano visual del avatar.',
  },
  {
    name: 'shape',
    type: "'rounded' | 'square'",
    default: "'rounded'",
    description: 'Forma del contenedor.',
  },
  {
    name: 'delayMs',
    type: 'number',
    default: 'undefined',
    description: 'Tiempo de espera antes de mostrar el fallback.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Objeto de configuracion del icono mostrado cuando no hay imagen.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Texto mostrado cuando no hay imagen ni icono.',
  },
]

const emitRows: ApiTableRow[] = []

const slotRows: ApiTableRow[] = [
  {
    name: 'fallback',
    type: 'Record<string, never>',
    default: '-',
    description: 'Personaliza el contenido mostrado cuando la imagen no esta disponible.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Avatar</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Muestra una imagen, un icono o un texto de fallback dentro de un contenedor consistente.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="avatar-props" title="Props" :rows="propRows" />
      <ApiTable
        id="avatar-emits"
        title="Emits"
        :rows="emitRows"
        empty-text="Este componente no emite eventos propios."
      />
      <ApiTable id="avatar-slots" title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
