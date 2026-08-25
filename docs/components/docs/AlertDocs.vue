<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Titulo del mensaje.' },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Descripcion secundaria del mensaje.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono mostrado junto al mensaje.',
  },
  {
    name: 'closeButton',
    type: 'ButtonConfig',
    typeLink: '/button#button-config',
    default: 'undefined',
    description: 'Props del boton de cierre.',
  },
  {
    name: 'variant',
    type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'",
    default: "'soft'",
    description: 'Variante visual.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    default: "'primary'",
    description: 'Severidad semantica.',
  },
  { name: 'color', type: 'string', default: 'undefined', description: 'Color CSS personalizado.' },
  {
    name: 'closable',
    type: 'boolean',
    default: 'false',
    description: 'Muestra el boton para cerrar el alert.',
  },
  {
    name: 'decorative',
    type: 'boolean',
    default: 'false',
    description: 'Desactiva el rol semantico de alerta.',
  },
  {
    name: 'ui',
    type: '{ label?: () => HTMLAttributes; description?: () => HTMLAttributes; closeButtonContainer?: () => HTMLAttributes }',
    default: 'undefined',
    description: 'Atributos personalizados para las partes internas.',
  },
]

const emitRows: ApiTableRow[] = [
  { name: 'close', type: '[]', default: '-', description: 'Se emite cuando el alert se cierra.' },
]

const slotRows: ApiTableRow[] = [
  { name: 'icon', type: '-', default: '-', description: 'Personaliza el icono.' },
  { name: 'label', type: '-', default: '-', description: 'Personaliza el titulo.' },
  { name: 'description', type: '-', default: '-', description: 'Personaliza la descripcion.' },
  {
    name: 'close',
    type: '{ close: () => void }',
    default: '-',
    description: 'Personaliza el cierre y recibe la funcion para cerrarlo.',
  },
]

const exposeRows: ApiTableRow[] = []
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Alert</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Mensaje contextual para comunicar estados, avisos y acciones de cierre.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="alert-props" title="Props" :rows="propRows" />
      <ApiTable id="alert-emits" title="Emits" :rows="emitRows" />
      <ApiTable id="alert-slots" title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
    </div>
  </section>
</template>
