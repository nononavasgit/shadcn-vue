<script setup lang="ts">
import ApiTable, { type ApiTableRow } from './ApiTable.vue'

const propRows: ApiTableRow[] = [
  {
    name: 'variant',
    type: "'solid' | 'outline' | 'plain' | 'subtle' | 'soft'",
    default: "'soft'",
    description: 'Variante visual que tambien hereda closeButton.',
  },
  {
    name: 'type',
    type: "'foreground' | 'background'",
    default: "'foreground'",
    description: 'Prioridad del anuncio accesible.',
  },
  {
    name: 'duration',
    type: 'number',
    default: '5000',
    description: 'Tiempo antes del cierre automatico.',
  },
  {
    name: 'open',
    type: 'boolean',
    default: 'true',
    description: 'Estado controlado mediante v-model:open.',
  },
  { name: 'label', type: 'string', default: 'undefined', description: 'Titulo del aviso.' },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Descripcion del aviso.',
  },
  {
    name: 'icon',
    type: 'IconConfig',
    typeLink: '/icon#icon-config',
    default: 'undefined',
    description: 'Icono mostrado junto al contenido.',
  },
  {
    name: 'closeButton',
    type: 'ButtonConfig',
    typeLink: '/button#button-config',
    default: 'undefined',
    description: 'Configuracion del boton de cierre.',
  },
  {
    name: 'progress',
    type: 'boolean',
    default: 'false',
    description: 'Muestra una barra sincronizada con la cuenta atras de duration.',
  },
  {
    name: 'closable',
    type: 'boolean',
    default: 'true',
    description: 'Muestra el boton de cierre.',
  },
  {
    name: 'disableSwipe',
    type: 'boolean',
    default: 'false',
    description: 'Desactiva el gesto de cierre.',
  },
  {
    name: 'swipeDirection',
    type: "'up' | 'down' | 'left' | 'right'",
    default: "'right'",
    description: 'Direccion admitida del gesto.',
  },
  {
    name: 'swipeThreshold',
    type: 'number',
    default: '50',
    description: 'Distancia minima del gesto en pixeles.',
  },
  {
    name: 'hotkey',
    type: 'string[]',
    default: "['F8']",
    description: 'Atajo que enfoca el viewport.',
  },
  {
    name: 'labelHotkey',
    type: 'string',
    default: "'Notifications ({hotkey})'",
    description: 'Etiqueta accesible del viewport; sustituye {hotkey} por el atajo.',
  },
  {
    name: 'severity',
    type: "'primary' | 'secondary' | 'success' | 'warning' | 'error'",
    default: "'primary'",
    description: 'Color semantico del aviso.',
  },
  {
    name: 'color',
    type: 'string',
    default: 'undefined',
    description: 'Color CSS que prevalece sobre severity.',
  },
  {
    name: 'position',
    type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
    default: "'bottom-right'",
    description: 'Posicion fija del viewport.',
  },
  {
    name: 'ui',
    type: '{ root?: (context: ToastContext) => HTMLAttributes; iconContainer?: (context: ToastContext) => HTMLAttributes; content?: (context: ToastContext) => HTMLAttributes; label?: (context: ToastContext) => HTMLAttributes; description?: (context: ToastContext) => HTMLAttributes; close?: (context: ToastContext) => HTMLAttributes; progress?: (context: ToastContext) => HTMLAttributes; viewport?: (context: ToastContext) => HTMLAttributes }',
    typeParts: [
      { text: '{ root?: (context: ' },
      { text: 'ToastContext', link: '#toast-context' },
      { text: ') => HTMLAttributes; iconContainer?: (context: ' },
      { text: 'ToastContext', link: '#toast-context' },
      { text: ') => HTMLAttributes; content?: (context: ' },
      { text: 'ToastContext', link: '#toast-context' },
      { text: ') => HTMLAttributes; label?: (context: ' },
      { text: 'ToastContext', link: '#toast-context' },
      { text: ') => HTMLAttributes; description?: (context: ' },
      { text: 'ToastContext', link: '#toast-context' },
      { text: ') => HTMLAttributes; close?: (context: ' },
      { text: 'ToastContext', link: '#toast-context' },
      { text: ') => HTMLAttributes; progress?: (context: ' },
      { text: 'ToastContext', link: '#toast-context' },
      { text: ') => HTMLAttributes; viewport?: (context: ' },
      { text: 'ToastContext', link: '#toast-context' },
      { text: ') => HTMLAttributes }' },
    ],
    default: 'undefined',
    description: 'Atributos dinamicos para las partes internas.',
  },
]

const emitRows: ApiTableRow[] = [
  {
    name: 'update:open',
    type: '[value: boolean]',
    default: '-',
    description: 'Solicita un cambio del estado.',
  },
  { name: 'close', type: '[]', default: '-', description: 'El toast pasa de abierto a cerrado.' },
  {
    name: 'escapeKeyDown',
    type: '[event: KeyboardEvent]',
    default: '-',
    description: 'Se pulsa Escape.',
  },
  { name: 'pause', type: '[]', default: '-', description: 'El temporizador se pausa.' },
  { name: 'resume', type: '[]', default: '-', description: 'El temporizador se reanuda.' },
  {
    name: 'swipeStart',
    type: '[event: SwipeEvent]',
    default: '-',
    description: 'Comienza el gesto.',
  },
  {
    name: 'swipeMove',
    type: '[event: SwipeEvent]',
    default: '-',
    description: 'Se mueve el gesto.',
  },
  {
    name: 'swipeCancel',
    type: '[event: SwipeEvent]',
    default: '-',
    description: 'Se cancela el gesto.',
  },
  { name: 'swipeEnd', type: '[event: SwipeEvent]', default: '-', description: 'Termina el gesto.' },
]

const slotRows: ApiTableRow[] = ['default', 'icon', 'label', 'description', 'close'].map(
  (name) => ({
    name,
    type: 'ToastContext',
    typeLink: '#toast-context',
    default: '-',
    description: `Personaliza ${name}.`,
  }),
)

const contextRows: ApiTableRow[] = [
  { name: 'open', type: 'boolean', description: 'Estado abierto actual.' },
  { name: 'close', type: '() => void', description: 'Cierra el toast.' },
]
</script>

<template>
  <section class="grid gap-8 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
    <header class="grid gap-2">
      <p class="font-mono text-xs tracking-wide text-muted-foreground uppercase">Component</p>
      <h2 class="text-2xl font-semibold">Toast</h2>
      <p class="max-w-2xl text-sm text-muted-foreground">
        Avisos temporales basados en Reka UI con estado controlable, gestos y viewport accesible.
      </p>
    </header>
    <div class="grid gap-4">
      <ApiTable id="toast-props" title="Props" :rows="propRows" />
      <ApiTable id="toast-emits" title="Emits" :rows="emitRows" />
      <ApiTable id="toast-slots" title="Slots" type-label="slotProps" :rows="slotRows" />
      <ApiTable id="toast-context" title="ToastContext" :rows="contextRows" />
    </div>
  </section>
</template>
