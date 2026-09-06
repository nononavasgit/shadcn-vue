<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'avatar',
    type: 'AvatarConfig',
    typeLink: '/avatar#avatar-config',
    default: 'undefined',
    description: 'Configuracion del avatar que acompana al mensaje.',
  },
  {
    name: 'ui',
    type: '{ header?: () => HTMLAttributes; footer?: () => HTMLAttributes }',
    default: 'undefined',
    description: 'Resolvers de atributos para los contenedores de header y footer.',
  },
  {
    name: 'align',
    type: "'start' | 'end'",
    default: "'start'",
    description: 'Alineacion horizontal del mensaje.',
  },
  {
    name: 'bubble',
    type: 'BubbleConfig',
    typeLink: '/bubble#bubble-config',
    default: 'undefined',
    description: 'Configuracion que se reenvia a Bubble.',
  },
]

const slotRows: ApiTableRow[] = [
  { name: 'header', type: '-', description: 'Contenido situado encima de la burbuja.' },
  { name: 'avatar', type: '-', description: 'Personaliza el avatar del mensaje.' },
  { name: 'default', type: '-', description: 'Contenido principal de la burbuja.' },
  { name: 'reaction', type: '-', description: 'Contenido de las reacciones de Bubble.' },
  { name: 'footer', type: '-', description: 'Contenido situado debajo de la burbuja.' },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Message</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Composicion de una burbuja conversacional con reacciones y contenido de pie.
      </p>
    </header>
    <div class="grid gap-4">
      <ApiTable id="message-props" title="Props" :rows="propRows" />
      <ApiTable id="message-slots" title="Slots" type-label="slotProps" :rows="slotRows" />
    </div>
  </section>
</template>
