<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const buttonConfigRows: ApiTableRow[] = [
  {
    name: 'ButtonConfig',
    type: 'ButtonProps & ButtonEmits & HTMLAttributes & HTMLEvents',
    typeParts: [
      { text: 'ButtonProps', link: '#button-props' },
      { text: ' & ' },
      { text: 'ButtonEmits', link: '#button-emits' },
      { text: ' & HTMLAttributes & HTMLEvents' },
    ],
    description: 'Configuracion completa del boton y sus atributos y eventos HTML.',
  },
]

const propRows: ApiTableRow[] = [
  { name: 'label', type: 'string', default: 'undefined', description: 'Texto del boton.' },
  {
    name: 'variant',
    type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft' | 'link'",
    default: "'solid'",
    description: 'Variante visual.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'warning' | 'success' | 'error'",
    default: "'primary'",
    description: 'Severidad semantica.',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Tamano del boton.',
  },
  { name: 'rounded', type: 'boolean', default: 'false', description: 'Usa bordes redondeados.' },
  { name: 'square', type: 'boolean', default: 'false', description: 'Usa una forma cuadrada.' },
  { name: 'raised', type: 'boolean', default: 'false', description: 'Aplica sombreado.' },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Muestra el estado de carga.',
  },
  { name: 'color', type: 'string', default: 'undefined', description: 'Color CSS personalizado.' },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono al inicio.',
  },
  {
    name: 'trailingIcon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono al final.',
  },
  {
    name: 'as',
    type: 'AsTag | Component',
    default: "'button'",
    description: 'Elemento renderizado.',
  },
  { name: 'asChild', type: 'boolean', default: 'false', description: 'Usa el elemento del slot.' },
]

const emitRows: ApiTableRow[] = [
  { name: 'click', type: '[event: PointerEvent]', default: '-', description: 'Click del boton.' },
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
    name: 'loading',
    type: '-',
    default: '-',
    description: 'Contenido del estado de carga.',
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
      <h2 class="text-2xl font-semibold">Button</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Accion interactiva con variantes visuales, iconos y estados de carga.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="button-props" title="Props" :rows="propRows" />
      <ApiTable id="button-emits" title="Emits" :rows="emitRows" />
      <ApiTable
        id="button-slots"
        title="Slots"
        type-label="slotProps"
        :show-default="false"
        :rows="slotRows"
      />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="button-config" title="ButtonConfig" :rows="buttonConfigRows" />
    </div>
  </section>
</template>
