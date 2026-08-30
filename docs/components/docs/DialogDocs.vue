<script setup lang="ts">
import { dialogDefaults } from '@/components/ui/Dialog/default'
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'open',
    type: 'boolean',
    default: 'false',
    description: 'Estado controlado mediante v-model:open.',
  },
  {
    name: 'modal',
    type: 'boolean',
    default: String(dialogDefaults.modal),
    description: 'Bloquea la interaccion fuera del dialogo.',
  },
  {
    name: 'block',
    type: 'boolean',
    default: String(dialogDefaults.block),
    description: 'Impide cerrar el dialogo desde el exterior o el boton de cierre.',
  },
  {
    name: 'unmountOnHide',
    type: 'boolean',
    default: String(dialogDefaults.unmountOnHide),
    description: 'Desmonta el contenido cuando el dialogo se cierra.',
  },
  {
    name: 'forceMount',
    type: 'boolean',
    default: 'undefined',
    description: 'Mantiene montado el contenido para controlar animaciones.',
  },
  {
    name: 'disableOutsidePointerEvents',
    type: 'boolean',
    default: 'modal',
    description: 'Controla los eventos de puntero fuera del contenido.',
  },
  { name: 'label', type: 'string', default: 'undefined', description: 'Titulo del dialogo.' },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Descripcion accesible del dialogo.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono mostrado junto al titulo.',
  },
  {
    name: 'closeIcon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: `{ name: '${dialogDefaults.closeIcon.name}' }`,
    description: 'Icono del boton de cierre.',
  },
  {
    name: 'showCloseButton',
    type: 'boolean',
    default: String(dialogDefaults.showCloseButton),
    description: 'Muestra el boton de cierre.',
  },
  {
    name: 'ui',
    type: '{ overlay?: (context: DialogContext) => HTMLAttributes; content?: (context: DialogContext) => HTMLAttributes; header?: (context: DialogContext) => HTMLAttributes; label?: (context: DialogContext) => HTMLAttributes; description?: (context: DialogContext) => HTMLAttributes; body?: (context: DialogContext) => HTMLAttributes; footer?: (context: DialogContext) => HTMLAttributes; close?: (context: DialogContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ overlay?: (context: ' },
      { text: 'DialogContext', link: '#dialog-context' },
      { text: ') => HTMLAttributes; content?: (context: ' },
      { text: 'DialogContext', link: '#dialog-context' },
      { text: ') => HTMLAttributes; header?: (context: ' },
      { text: 'DialogContext', link: '#dialog-context' },
      { text: ') => HTMLAttributes; label?: (context: ' },
      { text: 'DialogContext', link: '#dialog-context' },
      { text: ') => HTMLAttributes; description?: (context: ' },
      { text: 'DialogContext', link: '#dialog-context' },
      { text: ') => HTMLAttributes; body?: (context: ' },
      { text: 'DialogContext', link: '#dialog-context' },
      { text: ') => HTMLAttributes; footer?: (context: ' },
      { text: 'DialogContext', link: '#dialog-context' },
      { text: ') => HTMLAttributes; close?: (context: ' },
      { text: 'DialogContext', link: '#dialog-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Personalizacion dinamica de las partes internas.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:open',
    type: '[value: boolean]',
    default: '-',
    description: 'Actualiza el estado controlado.',
  },
  { name: 'show', type: '[]', default: '-', description: 'Se emite al abrir el dialogo.' },
  { name: 'close', type: '[]', default: '-', description: 'Se emite al cerrar el dialogo.' },
  {
    name: 'openAutoFocus',
    type: '[event: Event]',
    default: '-',
    description: 'Se reemite cuando Reka prepara el autofocus al abrir.',
  },
  {
    name: 'closeAutoFocus',
    type: '[event: Event]',
    default: '-',
    description: 'Se reemite cuando Reka prepara el autofocus al cerrar.',
  },
  {
    name: 'escapeKeyDown',
    type: '[event: KeyboardEvent]',
    default: '-',
    description: 'Se reemite cuando Reka recibe la tecla Escape.',
  },
  {
    name: 'pointerDownOutside',
    type: '[event: PointerDownOutsideEvent]',
    default: '-',
    description: 'Se reemite cuando Reka detecta un puntero fuera.',
  },
  {
    name: 'focusOutside',
    type: '[event: FocusOutsideEvent]',
    default: '-',
    description: 'Se reemite cuando Reka detecta foco fuera.',
  },
  {
    name: 'interactOutside',
    type: '[event: PointerDownOutsideEvent | FocusOutsideEvent]',
    default: '-',
    description: 'Se reemite cuando Reka detecta una interaccion fuera.',
  },
]

const slotRows: ApiTableRow[] = [
  {
    name: 'default',
    type: 'DialogContext',
    typeLink: '#dialog-context',
    default: '-',
    description: 'Trigger del dialogo.',
  },
  {
    name: 'content',
    type: 'DialogContext',
    typeLink: '#dialog-context',
    default: '-',
    description: 'Contenido principal.',
  },
  {
    name: 'header',
    type: 'DialogContext',
    typeLink: '#dialog-context',
    default: '-',
    description: 'Reemplaza el encabezado.',
  },
  {
    name: 'label',
    type: 'DialogContext',
    typeLink: '#dialog-context',
    default: '-',
    description: 'Personaliza el titulo.',
  },
  {
    name: 'description',
    type: 'DialogContext',
    typeLink: '#dialog-context',
    default: '-',
    description: 'Personaliza la descripcion.',
  },
  {
    name: 'footer',
    type: 'DialogContext',
    typeLink: '#dialog-context',
    default: '-',
    description: 'Reemplaza el pie.',
  },
  {
    name: 'close',
    type: 'DialogContext',
    typeLink: '#dialog-context',
    default: '-',
    description: 'Reemplaza el boton de cierre.',
  },
  {
    name: 'closeIcon',
    type: 'DialogContext',
    typeLink: '#dialog-context',
    default: '-',
    description: 'Personaliza el icono de cierre.',
  },
]

const exposeRows: ApiTableRow[] = []

const contextRows: ApiTableRow[] = [
  {
    name: 'open',
    type: 'boolean',
    default: '-',
    description: 'Indica si el dialogo esta abierto.',
  },
  {
    name: 'close',
    type: '() => void',
    default: '-',
    description: 'Cierra el dialogo respetando la prop block.',
  },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Dialog</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Dialogos modales con una API plana, slots contextuales y personalizacion por UI.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable title="Props" :rows="propRows" />
      <ApiTable title="Emits" :rows="emitRows" />
      <ApiTable title="Slots" type-label="slotProps" :show-default="false" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" empty-text="Este componente no expone metodos." />
      <ApiTable id="dialog-context" title="DialogContext" :rows="contextRows" />
    </div>
  </section>
</template>
