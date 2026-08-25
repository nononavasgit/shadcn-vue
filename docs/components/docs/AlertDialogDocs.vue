<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controla si el dialogo esta abierto.',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Titulo del dialogo de confirmacion.',
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Descripcion de la accion que se va a confirmar.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono mostrado junto al titulo.',
  },
  {
    name: 'actionButton',
    type: 'ButtonConfig',
    typeLink: '/button#button-config',
    default: 'undefined',
    description: 'Props del boton de confirmacion.',
  },
  {
    name: 'cancelButton',
    type: 'ButtonConfig',
    typeLink: '/button#button-config',
    default: 'undefined',
    description: 'Props del boton de cancelacion.',
  },
  {
    name: 'unmountOnHide',
    type: 'boolean',
    default: 'true',
    description: 'Desmonta el contenido cuando el dialogo se cierra.',
  },
  {
    name: 'forceMount',
    type: 'boolean',
    default: 'undefined',
    description: 'Fuerza el montaje del contenido.',
  },
  {
    name: 'disableOutsidePointerEvents',
    type: 'boolean',
    default: 'true',
    description: 'Bloquea los eventos de puntero fuera del dialogo.',
  },
  {
    name: 'ui',
    type: '{ trigger?: () => HTMLAttributes; overlay?: () => HTMLAttributes; content?: () => HTMLAttributes; header?: () => HTMLAttributes; label?: () => HTMLAttributes; description?: () => HTMLAttributes; body?: () => HTMLAttributes; footer?: () => HTMLAttributes }',
    default: 'undefined',
    description: 'Atributos personalizados para las partes internas.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:open',
    type: '[open: boolean]',
    default: '-',
    description: 'Actualiza el estado controlado del dialogo.',
  },
  {
    name: 'action',
    type: '[event: PointerEvent]',
    default: '-',
    description: 'Confirma la accion.',
  },
  {
    name: 'cancel',
    type: '[event: PointerEvent]',
    default: '-',
    description: 'Cancela la accion.',
  },
]

const slotRows: ApiTableRow[] = [
  { name: 'default', type: '-', default: '-', description: 'Trigger del dialogo.' },
  { name: 'content', type: '-', default: '-', description: 'Contenido principal.' },
  { name: 'header', type: '-', default: '-', description: 'Reemplaza el encabezado.' },
  { name: 'label', type: '-', default: '-', description: 'Personaliza el titulo.' },
  { name: 'description', type: '-', default: '-', description: 'Personaliza la descripcion.' },
  {
    name: 'footer',
    type: '{ close: () => void }',
    default: '-',
    description: 'Reemplaza el pie y recibe la funcion para cerrar el dialogo.',
  },
  {
    name: 'action',
    type: '{ close: () => void }',
    default: '-',
    description: 'Personaliza la accion y recibe la funcion para cerrar el dialogo.',
  },
  {
    name: 'cancel',
    type: '{ close: () => void }',
    default: '-',
    description: 'Personaliza la cancelacion y recibe la funcion para cerrar el dialogo.',
  },
]

const exposeRows: ApiTableRow[] = [
  { name: 'close', type: '() => void', default: '-', description: 'Cierra el dialogo.' },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">AlertDialog</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Dialogo modal para confirmar acciones que requieren una decision explicita.
      </p>
    </header>

    <div class="grid gap-4">
      <ApiTable id="alert-dialog-props" title="Props" :rows="propRows" />
      <ApiTable id="alert-dialog-emits" title="Emits" :rows="emitRows" />
      <ApiTable id="alert-dialog-slots" title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable title="Expose" :rows="exposeRows" />
    </div>
  </section>
</template>
